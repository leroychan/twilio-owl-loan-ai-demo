"use client";

import {
  Heading,
  Avatar,
  Card,
  Box,
  Button,
  Text,
  Paragraph,
  Stack,
  SkeletonLoader,
  Separator,
  DetailText,
} from "@twilio-paste/core";
import { Action } from "@/types/Action";
import { Journey } from "@/types/Journey";
import { ProcessSuccessIcon } from "@twilio-paste/icons/esm/ProcessSuccessIcon";
import { ProcessErrorIcon } from "@twilio-paste/icons/esm/ProcessErrorIcon";
import { ProductLookupIcon } from "@twilio-paste/icons/esm/ProductLookupIcon";
import React, { FC, useEffect, useState } from "react";

export type DemoLookupProps = {
  user: {
    name: string;
    phone: string;
    language?: string;
    email?: string;
  };
  performActions: (
    actions: Action[],
    properties?: { [key: string]: any }
  ) => void;
};

const DemoLookup: FC<DemoLookupProps> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [phone, setPhone] = useState<string>("");
  const [phoneValid, setPhoneValid] = useState<boolean>(false);
  const [carrier, setCarrier] = useState<string>("");
  const [lineType, setLineType] = useState<string>("");
  const [smsPumpingRisk, setSmsPumpingRisk] = useState<string>("");
  const [smsPumpingRiskScore, setSmsPumpingRiskScore] = useState<string>("");

  useEffect(() => {
    fetch(
      `/lookup/check-number?number=${props.user.phone.replace(/\+/g, "%2B")}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPhone(data.phone_number);
        setPhoneValid(data.valid);
        setCarrier(data.lineTypeIntelligence.carrier_name);
        setLineType(data.lineTypeIntelligence.type);
        setSmsPumpingRisk(data.smsPumpingRisk.carrier_risk_category);
        setSmsPumpingRiskScore(data.smsPumpingRisk.sms_pumping_risk_score);
        setIsLoading(false);
      });
  }, [phone]);
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
    >
      <Heading as="h1" variant="heading30">
        Hello {props.user.name},
      </Heading>
      <Paragraph>
        Now, let's verify that the phone number we've collected is accurate.
      </Paragraph>
      <Box maxWidth="size50" marginBottom="space100">
        {isLoading ? (
          <Card padding="space60">
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
          <Card padding="space60" element="STYLED_COMPONENTS_CARD">
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
                  icon={ProductLookupIcon}
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
                    Phone Number Details
                    <DetailText>Powered by Twilio Lookup</DetailText>
                  </Paragraph>
                </Box>
              </Box>
              <Box width="100%" element="SEPARATOR">
                <Separator orientation="horizontal" verticalSpacing="space0" />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                width="100%"
                justifyContent="space-between"
              >
                <Box display="flex" columnGap="space30" alignItems="center">
                  Phone Number
                </Box>
                {phone}
              </Box>
              <Box
                display="flex"
                alignItems="center"
                width="100%"
                justifyContent="space-between"
              >
                <Box display="flex" columnGap="space30" alignItems="center">
                  Is it valid?
                </Box>

                {phoneValid ? (
                  <Box display="flex">
                    <ProcessSuccessIcon
                      color="colorTextIconSuccess"
                      decorative={false}
                      title="valid"
                    />
                    <Text as="span" marginLeft="space20">
                      Valid
                    </Text>
                  </Box>
                ) : (
                  <Box display="flex">
                    <ProcessErrorIcon
                      color="colorTextIconError"
                      decorative={false}
                      title="invalid"
                    />
                    <Text as="span" marginLeft="space20">
                      Invalid
                    </Text>
                  </Box>
                )}
              </Box>
              <Box
                display="flex"
                alignItems="center"
                width="100%"
                justifyContent="space-between"
              >
                <Box display="flex" columnGap="space30" alignItems="center">
                  Carrier
                </Box>
                {carrier}
              </Box>
              <Box
                display="flex"
                alignItems="center"
                width="100%"
                justifyContent="space-between"
              >
                <Box display="flex" columnGap="space30" alignItems="center">
                  Line Type
                </Box>
                {lineType}
              </Box>
              <Box
                display="flex"
                alignItems="center"
                width="100%"
                justifyContent="space-between"
              >
                <Box display="flex" columnGap="space30" alignItems="center">
                  SMS Pumping Risk
                </Box>
                {smsPumpingRisk}
              </Box>
              <Box
                display="flex"
                alignItems="center"
                width="100%"
                justifyContent="space-between"
              >
                <Box display="flex" columnGap="space30" alignItems="center">
                  SMS Pumping Risk Score
                </Box>
                {smsPumpingRiskScore}
              </Box>
            </Box>
          </Card>
        )}
      </Box>
      <Button
        variant="primary"
        fullWidth
        disabled={isLoading}
        onClick={() => {
          props.performActions([Action.Display], {
            displayNext: Journey.DemoOutboundCall,
          });
        }}
      >
        Ready!
      </Button>
    </Box>
  );
};

export default DemoLookup;
