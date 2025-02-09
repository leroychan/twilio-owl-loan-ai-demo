import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Twilio Owl Loan AI",
  description: "Automated outbound debt collection with Twilio AI Assistant",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  userScalable: false,
  maximumScale: 1,
  height: "100vh",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <meta property="og:url" content="https://twilio.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Twilio - Owl Loan AI" />
        <meta
          property="og:description"
          content="Automated outbound debt collection with Twilio AI Assistant"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
