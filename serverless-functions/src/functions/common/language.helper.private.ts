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
    "es-ES": {
      voiceIntelligenceSid: "GAa7a0ab07cf571d9b3891d0c69a12159b",
      realtimeTranscriptionLanguage: "es-ES",
      realtimeTranscriptionModel: "telephony",
      transcriptionProvider: "deepgram",
      language: "es-ES",
      ttsProvider: "ElevenLabs",
      aiAssistanceVoice: "57D8YIbQSuE3REDPO6Vm",
      greetingWithoutName:
        "¡Hola! Soy un asistente de inteligencia artificial de Owl Loan. ¿Cómo estás?",
      greetingPrefix: "¡Hola",
      greetingSuffix: "! Soy el Asistente de IA de Owl Loan. ¿Cómo estás?",
      paymentSuccess:
        "Has completado correctamente tu pago a través de Twilio Pay. La confirmación de tu pago con Stripe finaliza con ",
      paymentGatewayError:
        "Tu pago no se realizó correctamente debido a un error en la pasarela de pago. ¿Quieres volver a pagar?",
      paymentGenericError:
        "Tu pago no se realizó correctamente. ¿Quieres realizar un nuevo pago?",
    },
    "hi-IN": {
      realtimeTranscriptionLanguage: "hi-IN",
      realtimeTranscriptionModel: "telephony",
      transcriptionProvider: "deepgram",
      language: "hi-IN",
      ttsProvider: "ElevenLabs",
      aiAssistanceVoice: "8FsOrsZSELg9otqX9nPu",
      greetingWithoutName:
        "नमस्ते! मैं आउल लोन से एक एआई सहायक हूं। आप कैसे हैं?",
      greetingPrefix: "नमस्ते",
      greetingSuffix: "! मैं आउल लोन का एआई सहायक हूं। आप कैसे हैं?",
      paymentSuccess:
        "आपने ट्विलियो पे के माध्यम से अपना भुगतान सफलतापूर्वक पूरा कर लिया है। स्ट्राइप के साथ आपका भुगतान पुष्टिकरण समाप्त हो जाता है ",
      paymentGatewayError:
        "भुगतान गेटवे में त्रुटि के कारण आपका भुगतान सफल नहीं हुआ। क्या आप पुनः भुगतान करना चाहते हैं?",
      paymentGenericError:
        "आपका भुगतान सफल नहीं हुआ. क्या आप नया भुगतान करना चाहते हैं?",
    },
    "id-ID": {
      realtimeTranscriptionLanguage: "id-ID",
      realtimeTranscriptionModel: "short",
      transcriptionProvider: "deepgram",
      language: "id-ID",
      ttsProvider: "ElevenLabs",
      aiAssistanceVoice: "RWiGLY9uXI70QL540WNd",
      greetingWithoutName: "Hai! Saya Asisten AI Owl Loan. Apa kabar?",
      greetingPrefix: "Hai",
      greetingSuffix: "! Saya Asisten AI Owl Loan. Apa kabar?",
      paymentSuccess:
        "Anda telah berhasil menyelesaikan pembayaran Anda melalui Twilio Pay. Konfirmasi pembayaran Stripe Anda berakhir dengan",
      paymentGatewayError:
        "Pembayaran Anda tidak berhasil karena kesalahan gateway pembayaran. Apakah Anda ingin melakukan pembayaran lagi?",
      paymentGenericError:
        "Pembayaran Anda gagal. Apakah Anda ingin melakukan pembayaran lagi?",
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
        "Twilio Pay 経由で支払いが完了しました。Stripe の支払い確認番号の末尾は ",
      paymentGatewayError:
        "支払いゲートウェイのエラーにより、お支払いが失敗しました。再度お支払いを行ってください",
      paymentGenericError:
        "お支払いに失敗しました。再度お支払いをご希望ですか?",
    },
    "ko-KR": {
      realtimeTranscriptionLanguage: "ko-KR",
      realtimeTranscriptionModel: "telephony",
      transcriptionProvider: "deepgram",
      language: "ko-KR",
      ttsProvider: "ElevenLabs",
      aiAssistanceVoice: "H8ObVvroE5JXeeUSJakg",
      greetingWithoutName:
        "안녕하세요! 저는 Owl Loan의 AI 비서입니다. 어떻게 지내세요?",
      greetingPrefix: "안녕하세요",
      greetingSuffix: "! 저는 Owl Loan의 AI 비서입니다. 어떻게 지내세요?",
      paymentSuccess:
        "Twilio Pay를 통해 성공적으로 결제를 완료했습니다. Stripe에서의 결제 확인은 다음으로 종료됩니다.",
      paymentGatewayError:
        "결제 게이트웨이의 오류로 인해 결제가 성공하지 못했습니다. 다시 결제하시겠습니까?",
      paymentGenericError:
        "결제가 성공적이지 않았습니다. 새로 결제를 하시겠습니까?",
    },
    "pt-BR": {
      voiceIntelligenceSid: "GA05afd64edab9f030b4fb48ee041d5db6",
      realtimeTranscriptionLanguage: "pt-BR",
      realtimeTranscriptionModel: "telephony",
      transcriptionProvider: "deepgram",
      language: "pt-BR",
      ttsProvider: "ElevenLabs",
      aiAssistanceVoice: "Eyspt3SYhZzXd1Jd3J8O",
      greetingWithoutName: "Olá! Sou o Assistente de IA da Owl Loan. Como vai?",
      greetingPrefix: "Olá",
      greetingSuffix: "! Sou o Assistente de IA da Owl Loan. Como vai?",
      paymentSuccess:
        "Você concluiu com sucesso seu pagamento via Twilio Pay. Sua confirmação de pagamento Stripe termina com",
      paymentGatewayError:
        "Seu pagamento não foi bem-sucedido devido a um erro de gateway de pagamento. Você gostaria de fazer um pagamento novamente?",
      paymentGenericError:
        "Seu pagamento não foi bem-sucedido. Você gostaria de fazer um pagamento novamente?",
    },
    "pt-PT": {
      voiceIntelligenceSid: "GA92716b470665fd569e4f938e3e52c336",
      realtimeTranscriptionLanguage: "pt-PT",
      realtimeTranscriptionModel: "telephony",
      transcriptionProvider: "deepgram",
      language: "pt-PT",
      ttsProvider: "ElevenLabs",
      aiAssistanceVoice: "Eyspt3SYhZzXd1Jd3J8O",
      greetingWithoutName: "Olá! Sou assistente de IA na Owl Loan. Como estás?",
      greetingPrefix: "Olá",
      greetingSuffix: "! Sou assistente de IA na Owl Loan. Como estás?",
      paymentSuccess:
        "Concluiu o seu pagamento com sucesso via Twilio Pay. A confirmação do seu pagamento Stripe termina com",
      paymentGatewayError:
        "O seu pagamento não foi bem-sucedido devido a um erro no gateway de pagamento. Gostaria de fazer um pagamento novamente?",
      paymentGenericError:
        "O seu pagamento não foi bem-sucedido. Gostaria de efetuar novamente um pagamento?",
    },
    "th-TH": {
      realtimeTranscriptionLanguage: "th-TH",
      realtimeTranscriptionModel: "short",
      transcriptionProvider: "deepgram",
      language: "th-TH",
      ttsProvider: "Google",
      aiAssistanceVoice: "th-TH-Chirp3-HD-Aoede",
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
    "zh-HK": {
      realtimeTranscriptionLanguage: "yue-Hant-HK",
      realtimeTranscriptionModel: "chirp",
      transcriptionProvider: "deepgram",
      language: "zh-HK",
      ttsProvider: "Google",
      ttsLanguage: "yue-HK",
      aiAssistanceVoice: "yue-HK-Standard-D",
      greetingWithoutName: "你好！我係貓頭鷹貸款 AI 助理。你好嗎？",
      greetingPrefix: "你好",
      greetingSuffix: "! 我係貓頭鷹貸款 AI 助理。你好嗎？",
      paymentSuccess:
        "你已經成功透過 Twilio Pay 完成付款。你嘅 Stripe 付款確認以以下內容結束：",
      paymentGatewayError: "由於支付網關錯誤，你嘅付款失敗。你想唔想再畀錢？",
      paymentGenericError: "你嘅付款失敗。你想唔想再畀錢？",
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
    hi: {
      impliedLocale: "hi-IN",
      transferGreeting:
        "कृपया कुछ क्षण प्रतीक्षा करें, जब तक हम आपको PCI अनुरूप भुगतान समाधान पर स्थानांतरित नहीं कर देते। ट्विलियो पे द्वारा संचालित",
      transferVoice: "Google.hi-IN-Wavenet-F",
    },
    id: {
      impliedLocale: "id-ID",
      transferGreeting:
        "Harap tunggu beberapa saat sementara kami mengalihkan Anda ke solusi pembayaran yang sesuai dengan PCI. Didukung oleh Twilio Pay",
      transferVoice: "Google.id-ID-Wavenet-C",
    },
    ja: {
      impliedLocale: "ja-JP",
      transferGreeting:
        "PCI準拠の支払いソリューションに転送するまでしばらくお待ちください。Twilio Payによって提供されています",
      transferVoice: "Google.ja-JP-Wavenet-C",
    },
    ko: {
      impliedLocale: "ko-KR",
      transferGreeting:
        "PCI 준수 결제 솔루션으로 이전할 때까지 잠시 기다리십시오. Twilio Pay가 제공합니다.",
      transferVoice: "Google.ko-KR-Neural2-C",
    },
    es: {
      impliedLocale: "es-ES",
      transferGreeting:
        "Espere un momento mientras lo transferimos a una solución de pago compatible con PCI. Desarrollado por Twilio Pay.",
      transferVoice: "Google.es-ES-Wavenet-E",
    },
    pt: {
      impliedLocale: "pt-BR",
      transferGreeting:
        "Aguarde um momento enquanto transferimos você para uma solução de pagamento compatível com PCI. Desenvolvido por Twilio Pay",
      transferVoice: "Google.pt-BR-Neural2-C",
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
