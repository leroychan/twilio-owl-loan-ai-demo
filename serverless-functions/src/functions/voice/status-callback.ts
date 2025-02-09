import {
  Context,
  ServerlessCallback,
  ServerlessEventObject,
  ServerlessFunctionSignature,
} from "@twilio-labs/serverless-runtime-types/types";

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
  TWILIO_SYNC_SERVICE_SID: string;
};

type RequestEvent = {
  CallSid: string;
  To: string;
  From: string;
  CallStatus: string;
  aiAssistantSid: string;
};

export const handler: ServerlessFunctionSignature<
  RequestContext,
  ServerlessEventObject<RequestEvent>
> = async function (
  context: Context<RequestContext>,
  event: ServerlessEventObject<RequestEvent>,
  callback: ServerlessCallback
) {
  console.log("[status-callback] Event Received", event);

  const response = new Twilio.Response();

  // Set the CORS headers to allow Flex to make an error-free HTTP request
  // to this Function
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  response.appendHeader("Content-Type", "text/xml; charset=utf8");

  // Check Required Parameters
  if (!event.CallSid || event.CallSid == "") {
    console.log("[status-callback] Invalid CallSid");
    response.setStatusCode(400);
    response.setBody({ status: "invalid CallSid" });
    return callback(null, response);
  }

  // Step 1: Update Sync
  try {
    const client = context.getTwilioClient();

    await client.sync.v1
      .services(context.TWILIO_SYNC_SERVICE_SID)
      .documents(`DOC-${event.To}`)
      .update({
        data: {
          currentCallSid: event.CallSid,
          currentCallStatus: event.CallStatus,
        },
      });
    console.log(
      `[status-callback] ${event.To} | ${event.CallSid} | Status: ${event.CallStatus}`
    );
  } catch (err) {
    console.log("[status-callback] Error", err);
  }
  response.setBody({ success: true });
  return callback(null, response);
};
