import fetch from "node-fetch";
import { Analytics } from "@segment/analytics-node";

// Type(s)
export type SegmentContext = {
  SEGMENT_PROFILES_API_BASE_URL: string;
  SEGMENT_API_ACCESS_TOKEN: string;
  SEGMENT_SPACE_ID: string;
  SEGMENT_WRITE_KEY: string;
  SEGMENT_DEFAULT_IDENTITY: string;
};

// Default Segment Settings
const SEGMENT_DEFAULT_IDENTITY = "phone";
const SEGMENT_PROFILES_API_BASE_URL = "https://profiles.segment.com/v1";

/*
 Segment - Get Name By ID
*/
export const segmentGetNameById = async (
  context: SegmentContext,
  id: string
) => {
  type SegmentResponse = {
    traits?: {
      name?: string;
      first_name?: string;
      last_name?: string;
    };
    cursor?: {};
    error?: {};
  };
  try {
    // Build Credentials with Segment
    let auth =
      "Basic " +
      Buffer.from(`${context.SEGMENT_API_ACCESS_TOKEN}:`, "utf8").toString(
        "base64"
      );
    console.log(
      `[segment.helper][segmentGetUserById] Looking for ${
        context.SEGMENT_DEFAULT_IDENTITY
      }:${id.replace(/\+/g, "%2B")} in Segment...`
    );
    // Invoke API
    const response = await fetch(
      `${context.SEGMENT_PROFILES_API_BASE_URL}/spaces/${
        context.SEGMENT_SPACE_ID
      }/collections/users/profiles/${
        context.SEGMENT_DEFAULT_IDENTITY
      }:${id.replace(/\+/g, "%2B")}/traits?limit=100`,
      {
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: auth },
      }
    );

    const segmentPayload = <SegmentResponse>await response.json();
    console.log(
      `[segment.helper][segmentGetUserById]`,
      JSON.stringify(segmentPayload, null, 2)
    );

    // Parse
    if (segmentPayload.traits?.name) {
      return segmentPayload.traits?.name;
    } else if (segmentPayload.traits?.first_name) {
      return segmentPayload.traits?.first_name;
    } else {
      return false;
    }
  } catch (err) {
    console.log(`[segment.helper][segmentGetUserById]`, err);
    return false;
  }
};

/*
 Segment - Identify Call
*/
export const segmentIdentify = async (
  context: SegmentContext,
  id: string,
  attributes: {}
) => {
  try {
    const analytics = new Analytics({
      writeKey: context.SEGMENT_WRITE_KEY,
    });
    analytics.identify({
      userId: id,
      traits: {
        phone: id,
        ...attributes,
      },
    });
    await analytics.flush();
    return true;
  } catch (err) {
    console.log(`[segment.helper][segmentIdentify]`, err);
    return false;
  }
};

/*
 Segment - Identify Call
*/
export const segmentTrack = async (
  context: SegmentContext,
  id: string,
  event: string,
  properties: {}
) => {
  try {
    const analytics = new Analytics({
      writeKey: context.SEGMENT_WRITE_KEY,
    });
    analytics.track({
      userId: id,
      event,
      properties: {
        ...properties,
      },
    });
    await analytics.flush();
    return true;
  } catch (err) {
    console.log(`[segment.helper][segmentTrack]`, err);
    return false;
  }
};
