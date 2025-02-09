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
  TranscriptionEvent: string;
  TranscriptionData: string;
  Track: string;
};

export const handler: ServerlessFunctionSignature<
  RequestContext,
  ServerlessEventObject<RequestEvent>
> = async function (
  context: Context<RequestContext>,
  event: ServerlessEventObject<RequestEvent>,
  callback: ServerlessCallback
) {
  console.log("[real-time-transcription] Event Received", event);

  const response = new Twilio.Response();

  // Set the CORS headers to allow Flex to make an error-free HTTP request
  // to this Function
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  response.appendHeader("Content-Type", "text/xml; charset=utf8");

  // Step 1: Update Sync
  try {
    if (event.TranscriptionEvent === "transcription-content") {
      const client = context.getTwilioClient();
      const transcriptionData = JSON.parse(event.TranscriptionData);
      console.log(
        `[real-time-transciption] Raw Transcription Data`,
        transcriptionData
      );
      const transcript = transcriptionData.transcript;
      console.log(
        `[real-time-transciption] ${event.CallSid} | ${event.Track} | ${transcript}`
      );
      await client.sync.v1
        .services(context.TWILIO_SYNC_SERVICE_SID)
        .syncStreams(`STREAM-${event.CallSid}`)
        .streamMessages.create({
          data: {
            transcription: transcript,
            track: event.Track,
          },
        });
    }
  } catch (err) {
    console.log("[real-time-transcription] Error", err);
  }
  response.setBody({ success: true });
  return callback(null, response);
};
