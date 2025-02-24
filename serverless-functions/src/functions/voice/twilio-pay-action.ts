import {
  Context,
  ServerlessCallback,
  ServerlessEventObject,
  ServerlessFunctionSignature,
} from "@twilio-labs/serverless-runtime-types/types";
import * as LanguageConfig from "../common/language.helper.private";

const { getLanguageConfig } = <typeof LanguageConfig>(
  require(Runtime.getFunctions()["common/language.helper"].path)
);

// Type(s)
type RequestContext = {
  SEGMENT_PROFILES_API_BASE_URL: string;
  SEGMENT_API_ACCESS_TOKEN: string;
  SEGMENT_SPACE_ID: string;
  SEGMENT_WRITE_KEY: string;
  DEMO_DEFAULT_NAME: string;
  DEMO_DEFAULT_OWING_AMOUNT: string;
  DEMO_DEFAULT_ALLOWED_NUMBER_COUNTRIES: string;
  SEGMENT_DEFAULT_IDENTITY: string;
  TWILIO_AI_ASSISTANT_DEFAULT_SID: string;
  DOMAIN_NAME: string;
  TWILIO_MESSAGING_SERVICE_SID: string;
  TWILIO_CONTENT_PAYMENT_CONFIRMATION_SID: string;
};

type RequestEvent = {
  PaymentCardNumber: string;
  PaymentConfirmationCode: string;
  Result: string;
  Called: string;
  PaymentError?: string;
  callSid: string;
  aiAssistantSid: string;
  session: string;
  language: string;
};

export const handler: ServerlessFunctionSignature<
  RequestContext,
  ServerlessEventObject<RequestEvent>
> = async function (
  context: Context<RequestContext>,
  event: ServerlessEventObject<RequestEvent>,
  callback: ServerlessCallback
) {
  console.log("[twilio-pay-action] Event Received", event);

  const response = new Twilio.Response();

  // Set the CORS headers to allow Flex to make an error-free HTTP request
  // to this Function
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  response.appendHeader("Content-Type", "text/xml; charset=utf8");

  // Check Required Parameters
  if (!event.Result || event.Result == "") {
    console.log("[twilio-pay-action] Invalid Result");
    response.setStatusCode(400);
    response.setBody({ status: "invalid Result" });
    return callback(null, response);
  }

  // Step 1: Get AI Assistant SID
  const aiAssistantSid =
    event.aiAssistantSid ?? context.TWILIO_AI_ASSISTANT_DEFAULT_SID;

  // Step 2: Formulate Payload
  const languageConfig = getLanguageConfig();
  const selectedConfig = languageConfig[event.language ?? "en-US"];

  let sayText = "";

  if (event.Result === "success") {
    const last4ConfirmationCode = event.PaymentConfirmationCode.slice(-3);
    sayText = `${selectedConfig.paymentSuccess}${last4ConfirmationCode}`;
  } else if (event.Result === "payment-connector-error") {
    sayText = `${selectedConfig.paymentGatewayError}`;
  } else {
    sayText = `${selectedConfig.paymentGenericError}`;
  }

  const twiMlPayload = `
    <Response>
      <Connect>
          <Assistant id="${aiAssistantSid}" welcomeGreeting="${sayText}" transcriptionProvider="${selectedConfig.transcriptionProvider}" language="${selectedConfig.language}" ttsProvider="${selectedConfig.ttsProvider}" voice="${selectedConfig.aiAssistanceVoice}">
               <Parameter name="identity" value="phone:${event.Called}"/>
               <Parameter name="sessionId" value="${event.session}" />
          </Assistant>
      </Connect>
    </Response>
    `;
  response.setBody(twiMlPayload);

  // Step 3: Send WhatsApp Payment Confirmation
  if (
    context.TWILIO_MESSAGING_SERVICE_SID !== "" &&
    context.TWILIO_CONTENT_PAYMENT_CONFIRMATION_SID !== "" &&
    event.Result === "success"
  ) {
    const client = context.getTwilioClient();
    await client.messages.create({
      contentSid: context.TWILIO_CONTENT_PAYMENT_CONFIRMATION_SID,
      contentVariables: JSON.stringify({
        stripe_confirmation: event.PaymentConfirmationCode,
      }),
      messagingServiceSid: context.TWILIO_MESSAGING_SERVICE_SID,
      to: `whatsapp:${event.Called}`,
    });
  }

  return callback(null, response);
};
