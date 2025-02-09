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
  TWILIO_MESSAGING_SERVICE_SID: string;
  TWILIO_CONTENT_PAYMENT_CONFIRMATION_SID: string;
  TWILIO_CONTENT_CALL_SUMMARY_SID: string;
};

type RequestEvent = {
  transcript_sid: string;
  event_type: string;
  service_sid: string;
};

export const handler: ServerlessFunctionSignature<
  RequestContext,
  ServerlessEventObject<RequestEvent>
> = async function (
  context: Context<RequestContext>,
  event: ServerlessEventObject<RequestEvent>,
  callback: ServerlessCallback
) {
  console.log("[voice-intelligence-webhook] Event Received", event);

  const response = new Twilio.Response();

  // Set the CORS headers to allow Flex to make an error-free HTTP request
  // to this Function
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  response.appendHeader("Content-Type", "text/xml; charset=utf8");

  try {
    // Parameters Check
    if (event.event_type !== "voice_intelligence_transcript_available") {
      response.setBody({ success: true });
      return callback(null, response);
    }

    const client = context.getTwilioClient();

    // Step 1: Get Operator Result
    const operatorResults = await client.intelligence.v2
      .transcripts(event.transcript_sid)
      .operatorResults.list({ limit: 20 });
    let callSummary = "";
    let callSentiment = "";
    operatorResults.forEach((o) => {
      if (o.name === "Conversation Summary") {
        callSummary = o.textGenerationResults.result;
      }
      if (o.name === "Sentiment Analysis") {
        callSentiment = o.predictedLabel;
      }
    });

    // Step 2: Get Phone Number
    const transcriptDetails = await client.intelligence.v2
      .transcripts(event.transcript_sid)
      .fetch();
    const callSid = transcriptDetails.channel.media_properties.source_sid;
    const call = await client.calls(callSid).fetch();

    // Step 2: Send Message
    if (
      context.TWILIO_MESSAGING_SERVICE_SID !== "" &&
      context.TWILIO_CONTENT_CALL_SUMMARY_SID !== ""
    ) {
      await client.messages.create({
        contentSid: context.TWILIO_CONTENT_CALL_SUMMARY_SID,
        contentVariables: JSON.stringify({
          call_summary: callSummary,
          call_sentiment: callSentiment,
        }),
        messagingServiceSid: context.TWILIO_MESSAGING_SERVICE_SID,
        to: `whatsapp:${call.to}`,
      });
    }
  } catch (err) {
    console.log("[voice-intelligence-webhook] Error", err);
  }
  response.setBody({ success: true });
  return callback(null, response);
};
