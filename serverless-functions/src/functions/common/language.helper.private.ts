export const getLanguageConfig = () => {
  const languageConfig: any = {
    "en-US": {
      voiceIntelligenceSid: "GA2e234b8616aa531ff182af08f7f8ce25",
      realtimeTranscriptionLanguage: "en-US",
      realtimeTranscriptionModel: "telephony",
      transcriptionProvider: "deepgram",
      language: "en-US",
      ttsProvider: "Elevenlabs",
      aiAssistanceVoice: "i4CzbCVWoqvD0P1QJCUL",
      greetingWithoutName: "Hi! I'm Owl Loan AI Assistant. How are you?",
      greetingPrefix: "Hi",
      greetingSuffix: "! I'm Owl Loan AI Assistant. How are you?",
      paymentSuccess:
        "You have successfully completed your payment via Twilio Pay. Your Stripe payment confirmation ends with ",
      paymentGatewayError:
        "Your payment was unsuccessful due to a payment gateway error. Would you like to make a payment again?",
      paymentGenericError:
        "Your payment was unsuccessful. Would you like to make a payment again?",
    },
    "en-AU": {
      voiceIntelligenceSid: "GA8e06ef55d3bc30a431eb18cbf9c2e8a0",
      realtimeTranscriptionLanguage: "en-AU",
      realtimeTranscriptionModel: "telephony",
      transcriptionProvider: "deepgram",
      language: "en-AU",
      ttsProvider: "Elevenlabs",
      aiAssistanceVoice: "nBoLwpO4PAjQaQwVKPI1",
      greetingWithoutName: "Hi! I'm Owl Loan AI Assistant. How are you?",
      greetingPrefix: "Hi",
      greetingSuffix: "! I'm Owl Loan AI Assistant. How are you?",
      paymentSuccess:
        "You have successfully completed your payment via Twilio Pay. Your Stripe payment confirmation ends with ",
      paymentGatewayError:
        "Your payment was unsuccessful due to a payment gateway error. Would you like to make a payment again?",
      paymentGenericError:
        "Your payment was unsuccessful. Would you like to make a payment again?",
    },
    "zh-CN": {
      realtimeTranscriptionLanguage: "cmn-Hans-CN",
      realtimeTranscriptionModel: "telephony",
      transcriptionProvider: "deepgram",
      language: "zh",
      ttsProvider: "Elevenlabs",
      aiAssistanceVoice: "4VZIsMPtgggwNg7OXbPY",
      greetingWithoutName: "你好! 我是猫头鹰贷款AI助理。你好吗?",
      greetingPrefix: "你好",
      greetingSuffix: "! 我是猫头鹰贷款AI助理。你好吗?",
      paymentSuccess:
        "您已成功通过 Twilio Pay 完成付款。您的 Stripe 付款确认以以下内容结束：",
      paymentGatewayError: "由于支付网关错误，您的付款失败。您想再次付款吗？",
      paymentGenericError: "您的付款失败。您想再次付款吗？",
    },
    "ja-JP": {
      realtimeTranscriptionLanguage: "ja-JP",
      realtimeTranscriptionModel: "telephony",
      transcriptionProvider: "deepgram",
      language: "ja-JP",
      ttsProvider: "ElevenLabs",
      aiAssistanceVoice: "Mv8AjrYZCBkdsmDHNwcB",
      greetingWithoutName:
        "こんにちは！私はOwl Loan AIアシスタントです。お元気ですか？",
      greetingPrefix: "こんにちは",
      greetingSuffix: "! 私はOwl Loan AIアシスタントです。お元気ですか？",
      paymentSuccess:
        "Twilio Pay 経由で支払いが完了しました。Stripe の支払い確認は ",
      paymentGatewayError:
        "支払いゲートウェイのエラーにより、お支払いが失敗しました。再度お支払いを行ってください",
      paymentGenericError:
        "お支払いに失敗しました。再度お支払いをご希望ですか?",
    },
    "th-TH": {
      realtimeTranscriptionLanguage: "th-TH",
      realtimeTranscriptionModel: "short",
      transcriptionProvider: "deepgram",
      language: "th-TH",
      ttsProvider: "Google",
      aiAssistanceVoice: "Google.th-TH-Standard-A",
      greetingWithoutName: "สวัสดี ฉันคือผู้ช่วย Owl Loan AI สบายดีไหม?",
      greetingPrefix: "สวัสดี",
      greetingSuffix: "! ฉันคือผู้ช่วย AI ของ Owl Loan คุณสบายดีไหม?",
      paymentSuccess:
        "คุณชำระเงินผ่าน Twilio Pay สำเร็จแล้ว การยืนยันการชำระเงิน Stripe ของคุณสิ้นสุดด้วย ",
      paymentGatewayError:
        "การชำระเงินของคุณไม่สำเร็จเนื่องจากข้อผิดพลาดของเกตเวย์การชำระเงิน คุณต้องการชำระเงินอีกครั้งหรือไม่",
      paymentGenericError:
        "การชำระเงินของคุณไม่สำเร็จ คุณต้องการชำระเงินอีกครั้งหรือไม่",
    },
  };
  return languageConfig;
};

export const getTwilioPayLanguageConfig = () => {
  const languageConfig: any = {
    en: {
      impliedLocale: "en-AU",
      transferGreeting:
        "Please wait a moment while we transfer you to a PCI-compliant payment solution. Powered by Twilio Pay",
      transferVoice: "Google.en-US-Wavenet-C",
    },
    zh: {
      impliedLocale: "zh-CN",
      transferGreeting:
        "请稍等片刻，我们正在将您转至符合 PCI 标准的支付解决方案。由 Twilio Pay 提供支持",
      transferVoice: "Google.cmn-CN-Wavenet-B",
    },
    ja: {
      impliedLocale: "ja-JP",
      transferGreeting:
        "PCI準拠の支払いソリューションに転送するまでしばらくお待ちください。Twilio Payによって提供されています",
      transferVoice: "Google.ja-JP-Wavenet-C",
    },
    th: {
      impliedLocale: "th-TH",
      transferGreeting:
        "กรุณารอสักครู่ขณะที่เรากำลังโอนคุณไปยังโซลูชันการชำระเงินที่สอดคล้องกับ PCI ขับเคลื่อนโดย Twilio Pay",
      transferVoice: "Google.th-TH-Standard-A",
    },
  };
  return languageConfig;
};
