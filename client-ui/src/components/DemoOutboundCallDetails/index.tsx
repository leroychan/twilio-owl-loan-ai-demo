"use client";
import { SyncClient } from "twilio-sync";
import {
  Heading,
  Box,
  Paragraph,
  Card,
  ChatLogger,
  useChatLogger,
  ChatMessage,
  ChatBubble,
  ChatMessageMeta,
  ChatMessageMetaItem,
  SkeletonLoader,
  Stack,
  DetailText,
  Separator,
  Avatar,
  Badge,
} from "@twilio-paste/core";
import React, { FC, useEffect, useState, useRef } from "react";
import { ProductVoiceIntelligenceIcon } from "@twilio-paste/icons/esm/ProductVoiceIntelligenceIcon";
import { ProductAIAssistantsIcon } from "@twilio-paste/icons/esm/ProductAIAssistantsIcon";
import { CallIcon } from "@twilio-paste/icons/esm/CallIcon";

export type DemoOutboundCallDetailsProps = {
  user: {
    name: string;
    phone: string;
    email?: string;
  };
  callSid: string;
};

const DemoOutboundCallDetails: FC<DemoOutboundCallDetailsProps> = (props) => {
  const [isLoadingSyncClient, setIsLoadingSyncClient] = useState<boolean>(true);
  const [currentCallStatus, setCurrentCallStatus] = useState<string>("queued");
  const [currentCallStatusVariant, setCurrentCallStatusVariant] =
    useState<string>("neutral");
  const loggerRef = useRef<any>(null);
  const { chats, push } = useChatLogger();

  // -- Start: Auto Scrolling

  const scrollToChatEnd = () => {
    loggerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // -- End: Auto Scrolling

  useEffect(() => {
    if (!props.callSid || !props.user.phone) return;
    // Get Sync Token
    const setupSyncClient = async () => {
      try {
        const result = await fetch(`/sync/token`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identity: props.user.phone,
          }),
        });
        const resultJson = await result.json();
        const token = await resultJson.token;
        console.log("token", token);
        if (!token) {
          console.warn(`Twilio Token unavailable`);
          return;
        }
        // Setup Client
        let client = new SyncClient(token);
        if (!client) {
          console.warn(`Twilio Client unavailable`);
          return;
        }
        setIsLoadingSyncClient(false);
        // Listen to Stream
        client
          .stream({
            id: `STREAM-${props.callSid}`,
            mode: "open_or_create",
            ttl: 60 * 60 * 3,
          })
          .then((stream) => {
            stream.on("messagePublished", (data) => {
              console.log(`New stream STREAM-${props.callSid} data`, data);
              const track = (data.message.data as any).track.replace(
                "_track",
                ""
              );
              const reverseTrack = track === "inbound" ? "outbound" : "inbound";
              const transcript = (data.message.data as any).transcription;
              if (reverseTrack === "inbound") {
                push({
                  variant: reverseTrack,
                  content: (
                    <ChatMessage variant={reverseTrack}>
                      <ChatBubble>{transcript}</ChatBubble>
                      <ChatMessageMeta aria-label="said by AI Assistant">
                        <ChatMessageMetaItem>
                          <Avatar
                            name="AI Assistant"
                            size="sizeIcon20"
                            icon={ProductAIAssistantsIcon}
                          />
                          Twilio AI Assistant
                        </ChatMessageMetaItem>
                      </ChatMessageMeta>
                    </ChatMessage>
                  ),
                });
              } else {
                push({
                  variant: reverseTrack,
                  content: (
                    <ChatMessage variant={reverseTrack}>
                      <ChatBubble>{transcript}</ChatBubble>
                      <ChatMessageMeta aria-label="said by user">
                        <ChatMessageMetaItem>
                          <Avatar name={props.user.name} size="sizeIcon20" />
                          {props.user.name}
                        </ChatMessageMetaItem>
                      </ChatMessageMeta>
                    </ChatMessage>
                  ),
                });
              }
              scrollToChatEnd();
            });
          });

        // Listen to Doc
        client.document(`DOC-${props.user.phone}`).then((doc) => {
          console.log("Initial Doc Data", doc.data);
          doc.on("updated", (docEvent) => {
            console.log("Updated Doc Data", docEvent);
            setCurrentCallStatus(docEvent.data.currentCallStatus);
            switch (docEvent.data.currentCallStatus) {
              case "queued":
                setCurrentCallStatusVariant("new");
                return;
              case "ringing":
                setCurrentCallStatusVariant("warning");
                return;
              case "answered":
                setCurrentCallStatusVariant("decorative20");
                return;
              case "in-progress":
                setCurrentCallStatusVariant("subaccount");
                return;
              case "completed":
                setCurrentCallStatusVariant("success");
                return;
              default:
                setCurrentCallStatusVariant("neutral");
                return;
            }
          });
        });
      } catch (err) {
        console.log("Error in Fetching Sync Token", err);
      }
    };
    try {
      // Step 1: Setup Sync Client
      setupSyncClient().catch(console.error);
    } catch (err) {
      console.log("Error in initializing Sync Client");
      console.log(err);
    }
  }, [props.user.phone, props.callSid]);

  return (
    <Box
      as="article"
      padding="space80"
      borderWidth="borderWidth10"
      borderColor="colorBorderWeaker"
      borderStyle="solid"
      borderRadius="borderRadius30"
      backgroundColor="colorBackgroundBodyInverse"
      width="90%"
      alignItems="center"
    >
      <Heading as="h1" variant="heading30">
        Hello {props.user.name},
      </Heading>
      <Box marginBottom="space30">
        <Badge as="span" variant={currentCallStatusVariant as any}>
          <CallIcon decorative />
          {currentCallStatus.replace(/^./, currentCallStatus[0].toUpperCase())}
        </Badge>
      </Box>
      <Paragraph>
        You will receive a call for a $2,000 debt collection. To pay securely
        over the call, say "I am ready to make the payment now" and provide the
        sample credit card details: 4242 4242 4242 4242, Expiry: 12/26, Postal
        Code: Any integer, CVV: Any 3 digits.
      </Paragraph>
      {isLoadingSyncClient ? (
        <Card>
          <Box>
            <Stack orientation="vertical" spacing="space20">
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </Stack>
          </Box>
        </Card>
      ) : (
        <Card>
          <Box
            display="flex"
            flexDirection="column"
            rowGap="space50"
            alignItems="center"
            element="INSIDE_OF_WHITE_CARD"
          >
            <Box
              display="flex"
              width="100%"
              columnGap="space40"
              element="TOP_ROW"
            >
              <Avatar
                variant="entity"
                icon={ProductVoiceIntelligenceIcon}
                size="sizeIcon20"
                name="entity-avatar"
              />
              <Box
                display="flex"
                justifyContent="space-between"
                width="size30"
                element="TWO_TEXTS"
              >
                <Paragraph marginBottom="space0">
                  Real-time Transcription
                  <DetailText>Powered by Twilio Voice Intelligence</DetailText>
                </Paragraph>
              </Box>
            </Box>
            <Box width="100%" element="SEPARATOR">
              <Separator orientation="horizontal" verticalSpacing="space0" />
            </Box>
            <Box width="100%">
              <ChatLogger chats={chats} />
              <Box ref={loggerRef}></Box>
            </Box>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default DemoOutboundCallDetails;
