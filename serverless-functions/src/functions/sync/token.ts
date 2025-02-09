// Imports global types
import "@twilio-labs/serverless-runtime-types";

// Fetches specific types
import {
  Context,
  ServerlessCallback,
  ServerlessEventObject,
  ServerlessFunctionSignature,
} from "@twilio-labs/serverless-runtime-types/types";

// Type(s)
type RequestContext = {
  ACCOUNT_SID: string;
  TWILIO_API_KEY: string;
  TWILIO_API_SECRET: string;
  TWILIO_SYNC_SERVICE_SID: string;
};

type RequestEvent = {
  identity: string;
};

export const handler: ServerlessFunctionSignature<
  RequestContext,
  ServerlessEventObject<RequestEvent>
> = async function (
  context: Context<RequestContext>,
  event: ServerlessEventObject<RequestEvent>,
  callback: ServerlessCallback
) {
  console.log("[token] Event Received", event);

  const response = new Twilio.Response();

  // Set the CORS headers to allow Flex to make an error-free HTTP request
  // to this Function
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  response.appendHeader("Content-Type", "application/json");

  // Check Required Parameters
  if (!event.identity || event.identity == "") {
    console.log("[token] Invalid identity");
    response.setStatusCode(400);
    response.setBody({ status: "invalid indentity" });
    return callback(null, response);
  }
  // Core Logic
  try {
    const AccessToken = Twilio.jwt.AccessToken;
    const SyncGrant = AccessToken.SyncGrant;
    const syncGrant = new SyncGrant({
      serviceSid: context.TWILIO_SYNC_SERVICE_SID,
    });
    const accessToken = new AccessToken(
      context.ACCOUNT_SID,
      context.TWILIO_API_KEY,
      context.TWILIO_API_SECRET,
      {
        identity: event.identity,
        ttl: 60 * 60 * 3,
      }
    );
    accessToken.addGrant(syncGrant);
    response.setBody({ token: accessToken.toJwt() });
    return callback(null, response);
  } catch (err) {
    console.log("[token]  error", err);
    response.setBody({ status: "error" });
    response.setStatusCode(500);
    return callback(null, response);
  }
};
