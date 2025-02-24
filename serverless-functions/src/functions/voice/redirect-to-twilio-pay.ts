// Imports global types
import "@twilio-labs/serverless-runtime-types";
import * as LanguageConfig from "../common/language.helper.private";

// Fetches specific types
import {
  Context,
  ServerlessCallback,
  ServerlessEventObject,
  ServerlessFunctionSignature,
} from "@twilio-labs/serverless-runtime-types/types";

const { getTwilioPayLanguageConfig } = <typeof LanguageConfig>(
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
};

type RequestEvent = {
  chargeAmount: string;
  languageCode: string;
};

export const handler: ServerlessFunctionSignature<
  RequestContext,
  ServerlessEventObject<RequestEvent>
> = async function (
  context: Context<RequestContext>,
  event: ServerlessEventObject<RequestEvent>,
  callback: ServerlessCallback
) {
  console.log("[redirect-to-twilio-pay] Event Received", event);
  console.log(JSON.stringify(event.request.headers));
  const response = new Twilio.Response();

  // Set the CORS headers to allow Flex to make an error-free HTTP request
  // to this Function
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  response.appendHeader("Content-Type", "application/json");

  // Check Required Parameters
  if (!event.chargeAmount || event.chargeAmount == "") {
    console.log("[redirect-to-twilio-pay] Invalid chargeAmount");
    response.setStatusCode(400);
    response.setBody({ status: "invalid chargeAmount" });
    return callback(null, response);
  }

  // Core Logic
  try {
    const client = context.getTwilioClient();

    // Step 1: Get Call SID
    const headers: Record<string, any> = event.request.headers;
    const sessionId = headers["x-session-id"];
    const sessionAry = sessionId.split("/")[0].split(":");
    const sessionType = sessionAry[0];
    const callSid = sessionAry[1];

    if (sessionType !== "voice") {
      console.log("[redirect-to-twilio-pay] Session Type is not Voice");
      response.setStatusCode(400);
      response.setBody({ status: "invalid chargeAmount" });
      return callback(null, response);
    }

    // Step 2: Determine Language
    const languageConfig = getTwilioPayLanguageConfig();
    const selectedConfig = languageConfig[event.languageCode ?? "en-US"];

    // Step 3: Formulate TwiML
    const actionUrl = `https://${
      context.DOMAIN_NAME
    }/voice/twilio-pay-action?callSid=${callSid}&amp;language=${
      selectedConfig.impliedLocale
    }&amp;session=${sessionId.replace("voice:", "")}`;

    const result = await client.calls(callSid).update({
      twiml: `<Response>
        <Say language="${selectedConfig.impliedLocale}" voice="${selectedConfig.transferVoice}">${selectedConfig.transferGreeting}</Say>
          <Pay paymentConnector="Stripe_Connector" action="${actionUrl}" chargeAmount="${event.chargeAmount}"/>
      </Response>`,
    });

    response.setBody(result);
    return callback(null, response);
  } catch (err) {
    console.log("[redirect-to-twilio-pay]  error", err);
    response.setBody({ status: "error" });
    response.setStatusCode(500);
    return callback(null, response);
  }
};
