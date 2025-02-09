"use client";

import { Heading, Box, Paragraph, Button } from "@twilio-paste/core";
import { CallIcon } from "@twilio-paste/icons/esm/CallIcon";
import { Action } from "@/types/Action";
import { Journey } from "@/types/Journey";
import React, { FC } from "react";

export type DemoOutboundCallProps = {
  user: {
    name: string;
    phone: string;
    email?: string;
  };
  performActions: (
    actions: Action[],
    properties?: { [key: string]: any }
  ) => void;
};

const DemoOutboundCall: FC<DemoOutboundCallProps> = (props) => {
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
      <Paragraph>
        Get ready for an automated outbound call to {props.user.phone}!
      </Paragraph>
      <Button
        variant="primary"
        fullWidth
        onClick={() => {
          props.performActions([Action.OutboundCall, Action.Display], {
            displayNext: Journey.DemoOutboundCallDetails,
          });
        }}
      >
        <CallIcon decorative={false} size="sizeIcon100" title="Call" />
        Tap Here!
      </Button>
    </Box>
  );
};

export default DemoOutboundCall;
