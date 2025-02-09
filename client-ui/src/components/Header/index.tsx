"use client";
import Image from "next/image";

import { Flex, Box, Heading, DisplayHeading } from "@twilio-paste/core";
import { FC } from "react";

import owlLoan from "@/icons/OwlLoan.png";

const Header: FC = () => {
  return (
    <Flex hAlignContent="center" vertical>
      <Box paddingBottom={"space10"}>
        <Image src={owlLoan} alt={"Owl Loan Logo"} width={200} height={200} />
      </Box>
      <DisplayHeading as="div" variant="displayHeading20" marginBottom="space0">
        Owl Loan
      </DisplayHeading>
      <Box display="flex" columnGap="space30" marginBottom={"space40"}>
        <Heading as={"span"} variant={"heading40"}>
          Powered by
        </Heading>
        <span
          style={{
            background:
              "linear-gradient(135deg, #FF726D 5%, #FF4DA9 45%, #CD42D7 85%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "transparent",
            WebkitTextFillColor: "transparent",
            fontSize: "1.6em",
            fontWeight: "bold",
            lineHeight: "1em",
          }}
        >
          Twilio AI Assistant
        </span>
      </Box>
    </Flex>
  );
};

export default Header;
