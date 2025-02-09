// Imports global types
import "@twilio-labs/serverless-runtime-types";
import * as SegmentUtil from "../common/segment.helper.private";

// Fetches specific types
import {
  Context,
  ServerlessCallback,
  ServerlessEventObject,
  ServerlessFunctionSignature,
} from "@twilio-labs/serverless-runtime-types/types";

// Load Libraries
const { segmentGetNameById, segmentIdentify, segmentTrack } = <
  typeof SegmentUtil
>require(Runtime.getFunctions()["common/segment.helper"].path);

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
  TWILIO_INTELLIGENCE_SERVICE_SID: string;
  TWILIO_SYNC_SERVICE_SID: string;
  DOMAIN_NAME: string;
};

type RequestEvent = {
  toNumber: string;
  fromNumber: string;
  aiAssistantSid: string;
  twimlUrl?: string;
  customerName?: string;
  amountOwing?: number;
};

type CreateCallType = {
  to: string;
  from: string;
  url?: string;
  twiml?: string;
  statusCallback: string;
  statusCallbackEvent: string[];
};

// Global Variable(s)
let fromNumbers: any = [];

export const handler: ServerlessFunctionSignature<
  RequestContext,
  ServerlessEventObject<RequestEvent>
> = async function (
  context: Context<RequestContext>,
  event: ServerlessEventObject<RequestEvent>,
  callback: ServerlessCallback
) {
  console.log("[make-outbound-call] Event Received", event);

  const response = new Twilio.Response();

  // Set the CORS headers to allow Flex to make an error-free HTTP request
  // to this Function
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  response.appendHeader("Content-Type", "application/json");

  // Check Required Parameters
  if (!event.toNumber || event.toNumber == "") {
    console.log("[make-outbound-call] Invalid toNumber");
    response.setStatusCode(400);
    response.setBody({ status: "invalid toNumber" });
    return callback(null, response);
  }
  if (
    (!event.aiAssistantSid || event.aiAssistantSid == "") &&
    (!context.TWILIO_AI_ASSISTANT_DEFAULT_SID ||
      context.TWILIO_AI_ASSISTANT_DEFAULT_SID == "")
  ) {
    console.log(
      "[make-outbound-call] Invalid AI Assistant SID - Either empty or invalid"
    );
    response.setStatusCode(400);
    response.setBody({ status: "invalid AI Assistatnt SID" });
    return callback(null, response);
  }

  // Core Outbound Call Logic
  try {
    const client = context.getTwilioClient();

    /*
     * Step 1: Seed Segment Profile for AI Assistant's Personalisation
     */
    const profileName = event.customerName ?? context.DEMO_DEFAULT_NAME;
    const aiAssistantSid =
      event.aiAssistantSid ?? context.TWILIO_AI_ASSISTANT_DEFAULT_SID;

    const amountOwing =
      event.amountOwing ?? parseInt(context.DEMO_DEFAULT_OWING_AMOUNT);

    await segmentIdentify(context, event.toNumber, {
      name: profileName,
      amountOwing: amountOwing,
    });

    /*
     * Step 2: Dynamically Determine "from" Number
     */

    // Hydrate Global Variable
    if (fromNumbers.length === 0) {
      console.log("[make-outbound-call] Re-hydrating fromNumbers");
      const currentNumbers = await client.incomingPhoneNumbers.list({
        limit: 20,
      });
      context.DEMO_DEFAULT_ALLOWED_NUMBER_COUNTRIES.split(",").forEach(
        (countryCode) => {
          const normalisedCountryCode = countryCode.trim();
          fromNumbers[normalisedCountryCode] = [];
          currentNumbers.forEach((number) => {
            if (
              number.status === "in-use" &&
              number.capabilities.voice &&
              number.phoneNumber.startsWith(normalisedCountryCode)
            ) {
              fromNumbers[normalisedCountryCode].push(number.phoneNumber);
            }
          });
        }
      );
    }

    // Find First Number to Use
    let finalFromNumber =
      fromNumbers[
        Object.keys(fromNumbers).find((countryCode: string) =>
          event.toNumber.startsWith(countryCode)
        ) ?? "+1"
      ][0];

    /*
     * Step 3: Formulate TwiML
     */
    const createCallPayload: CreateCallType = {
      from: finalFromNumber,
      to: event.toNumber,
      statusCallback: `https://${context.DOMAIN_NAME}/voice/status-callback`,
      statusCallbackEvent: ["initiated", "ringing", "answered", "completed"],
    };
    if (event.twimlUrl && event.twimlUrl !== "") {
      createCallPayload["url"] = event.twimlUrl;
    } else if (!profileName) {
      createCallPayload["twiml"] = `
      <Response>
        <Start>
          <Transcription intelligenceService="${context.TWILIO_INTELLIGENCE_SERVICE_SID}" statusCallbackUrl="https://${context.DOMAIN_NAME}/voice/real-time-transcription" />
        </Start>
        <Connect>
          <Assistant id="${aiAssistantSid}" welcomeGreeting="Hi! I'm Owl Loan AI Assistant. How are you?" voice="en-US-Journey-O">
             <Parameter name="identity" value="phone:${event.toNumber}"/>
          </Assistant>
        </Connect>
      </Response>`;
    } else {
      createCallPayload["twiml"] = `
      <Response>
        <Start>
          <Transcription intelligenceService="${context.TWILIO_INTELLIGENCE_SERVICE_SID}" statusCallbackUrl="https://${context.DOMAIN_NAME}/voice/real-time-transcription" />
        </Start>
        <Connect>
          <Assistant id="${aiAssistantSid}" welcomeGreeting="Hi ${profileName}! I'm Owl Loan AI Assistant. How are you?" voice="en-US-Journey-O">
             <Parameter name="identity" value="phone:${event.toNumber}"/>
          </Assistant>
        </Connect>
      </Response>`;
    }

    /*
     * Step 5: Make Phone Call
     */
    const result = await client.calls.create(createCallPayload);

    /*
     * Step 6: Update Twilio Sync
     */

    // Create Doc if doesn't exist
    try {
      await client.sync.v1
        .services(context.TWILIO_SYNC_SERVICE_SID)
        .documents.create({
          uniqueName: `DOC-${event.toNumber}`,
        });
    } catch (err) {
      console.log("Twilio Sync Document already exist");
    }
    // Update Doc
    client.sync.v1
      .services(context.TWILIO_SYNC_SERVICE_SID)
      .documents(`DOC-${event.toNumber}`)
      .update({
        data: {
          currentCallSid: result.sid,
          currentCallStatus: result.status,
        },
      });

    response.setBody(result);
    return callback(null, response);
  } catch (err) {
    console.log("[make-outbound-call] error", err);
    response.setBody({ status: "error" });
    response.setStatusCode(500);
    return callback(null, response);
  }
};
