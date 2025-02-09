// Imports global types
import "@twilio-labs/serverless-runtime-types";

// Fetches specific types
import {
  Context,
  ServerlessCallback,
  ServerlessEventObject,
  ServerlessFunctionSignature,
} from "@twilio-labs/serverless-runtime-types/types";

type RequestContext = {
  SEGMENT_PROFILES_API_BASE_URL: string;
  SEGMENT_API_ACCESS_TOKEN: string;
  SEGMENT_SPACE_ID: string;
  SEGMENT_WRITE_KEY: string;
  DEMO_DEFAULT_NAME: string;
  DEMO_DEFAULT_OWING_AMOUNT: string;
  SEGMENT_DEFAULT_IDENTITY: string;
};

type RequestEvent = {
  number: string;
};

export const handler: ServerlessFunctionSignature<
  RequestContext,
  ServerlessEventObject<RequestEvent>
> = async function (
  context: Context<RequestContext>,
  event: ServerlessEventObject<RequestEvent>,
  callback: ServerlessCallback
) {
  console.log("[check-number] Event Received", event);

  const response = new Twilio.Response();

  // Set the CORS headers to allow Flex to make an error-free HTTP request
  // to this Function
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  response.appendHeader("Content-Type", "application/json");

  // Check Required Parameters
  if (!event.number || event.number == "") {
    console.log("[check-number] Invalid number");
    response.setStatusCode(400);
    response.setBody({ status: "invalid number" });
    return callback(null, response);
  }

  // Core Logic
  try {
    const client = context.getTwilioClient();
    const numberData = await client.lookups.v2
      .phoneNumbers(event.number)
      .fetch({
        fields: "line_type_intelligence,sms_pumping_risk,line_status",
      });
    response.setBody(numberData);
    console.log("[check-number] Return Payload", numberData);
    return callback(null, response);
  } catch (err) {
    console.log("[make-outbound-call] error", err);
    response.setBody({ status: "error" });
    response.setStatusCode(500);
    return callback(null, response);
  }
};
