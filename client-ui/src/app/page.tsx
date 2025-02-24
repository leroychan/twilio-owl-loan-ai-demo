"use client";
import React, { useState } from "react";
import { Journey } from "@/types/Journey";
import { Action } from "@/types/Action";
import { User } from "@/types/User";
import { CustomizationProvider } from "@twilio-paste/core/customization";
import { Box } from "@twilio-paste/core";
import Header from "@/components/Header";
import IdentifyUser from "@/components/IdentifyUser";
import DemoLookup from "@/components/DemoLookup";
import DemoOutboundCall from "@/components/DemoOutboundCall";
import DemoOutboundCallDetails from "@/components/DemoOutboundCallDetails";

export default function Index() {
  const [journey, setJourney] = useState<Journey>(Journey.IdentifyUser);
  const [user, setUser] = useState<User>({
    name: "John Tan",
    phone: "+6591234567",
    language: "en-US",
  });
  const [callSid, setCallSid] = useState<string>("");

  const performActions = (
    actions: Action[],
    properties?: { [key: string]: any }
  ) => {
    actions.forEach((action) => {
      switch (action) {
        case Action.User:
          setUser({
            name: properties?.user.name,
            phone: properties?.user.phone,
            language: properties?.user.language,
          });
          return;
        case Action.OutboundCall:
          fetch(`/voice/make-outbound-call`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              toNumber: user.phone,
              customerName: user.name,
              language: user.language,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              setCallSid(data.sid ?? "");
            });
          return;
        case Action.Display:
          setJourney(properties?.displayNext);
          return;
      }
    });
  };
  const getComponentForJourney = () => {
    switch (journey) {
      case Journey.Welcome:
      case Journey.IdentifyUser:
        return <IdentifyUser performActions={performActions} />;
      case Journey.DemoLookup:
        return <DemoLookup performActions={performActions} user={user} />;
      case Journey.DemoOutboundCall:
        return <DemoOutboundCall performActions={performActions} user={user} />;
      case Journey.DemoOutboundCallDetails:
        return <DemoOutboundCallDetails callSid={callSid} user={user} />;
      case Journey.Dev:
        return (
          <DemoOutboundCallDetails
            callSid="123123"
            user={{ name: "Hehe", phone: "+6590100209" }}
          />
        );
      default:
        return <IdentifyUser performActions={performActions} />;
    }
  };

  return (
    <CustomizationProvider baseTheme="dark">
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          rowGap="space40"
          width="100%"
          padding="space90"
        >
          <Header />
          {getComponentForJourney()}
        </Box>
      </Box>
    </CustomizationProvider>
  );
}
