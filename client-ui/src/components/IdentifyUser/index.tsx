"use client";

import {
  Heading,
  Box,
  Input,
  Button,
  HelpText,
  Label,
} from "@twilio-paste/core";
import { Journey } from "@/types/Journey";
import { Action } from "@/types/Action";
import React, { FC, useEffect, useState } from "react";
import validator from "validator";
import { CallIcon } from "@twilio-paste/icons/esm/CallIcon";
import { UserIcon } from "@twilio-paste/icons/esm/UserIcon";

export type IdentifyUserProps = {
  performActions: (
    actions: Action[],
    properties?: { [key: string]: any }
  ) => void;
};

const IdentifyUser: FC<IdentifyUserProps> = (props) => {
  const [isValidName, setIsValidName] = useState<boolean>(false);
  const [isValidPhone, setIsValidPhone] = useState<boolean>(false);
  const [hasErrorPhone, setHasErrorPhone] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    if ((!phone || phone === "") && (!name || name === "")) {
      return;
    }
    const checkPhoneStatus = validator.isMobilePhone(phone);
    setIsValidPhone(checkPhoneStatus);
    setHasErrorPhone(!checkPhoneStatus);
    if (!phone.startsWith("+")) {
      setIsValidPhone(false);
      setHasErrorPhone(true);
    }
  }, [phone]);

  useEffect(() => {
    if (name !== null && name.length > 0) {
      setIsValidName(true);
    } else {
      setIsValidName(false);
    }
  }, [name]);

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
        Before we begin, tell us more about yourself
      </Heading>
      <Box marginBottom="space80">
        <Label htmlFor="name" required>
          Name
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="John Tan"
          insertBefore={
            <Button variant="link">
              <UserIcon decorative={false} size="sizeIcon20" title="Name" />
            </Button>
          }
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Box>
      <Box marginBottom="space80">
        <Label htmlFor="phone_number" required>
          Phone Number
        </Label>
        <Input
          aria-describedby="display_phone_number_help_text"
          type="tel"
          id="phone_number"
          name="phone_number"
          placeholder="Enter your phone number"
          insertBefore={
            <Button variant="link">
              <CallIcon
                decorative={false}
                size="sizeIcon20"
                title="Phone Number"
              />
            </Button>
          }
          onChange={(e) => setPhone(e.target.value)}
          hasError={hasErrorPhone}
          required
        />
        <HelpText
          id="display_phone_number_help_text"
          variant={!hasErrorPhone ? "default" : "error"}
        >
          {!hasErrorPhone
            ? `Use the following format: +#########`
            : "Invalid phone number format. Please use E.164 (e.g. +651234567)"}
        </HelpText>
      </Box>
      <Button
        variant="primary"
        fullWidth
        disabled={!isValidPhone || !isValidName}
        onClick={() => {
          props.performActions([Action.User, Action.Display], {
            displayNext: Journey.DemoLookup,
            user: {
              name,
              phone,
            },
          });
        }}
      >
        Lets go!
      </Button>
    </Box>
  );
};

export default IdentifyUser;
