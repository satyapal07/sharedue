"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = "landing" | "phone" | "email";

function Logo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="10" fill="#DF5830" />
      <path d="M10 18h16M18 10l8 8-8 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("landing");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  function formatPhone(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  const phoneReady = phone.replace(/\D/g, "").length >= 10;
  const emailReady = email.includes("@") && email.includes(".");
  const otpReady = otp.replace(/\D/g, "").length === 6;

  if (step === "phone") {
    return (
      <div className="flex flex-col min-h-screen bg-[#F5F0EB] px-6 pt-14 pb-10">
        <button
          onClick={() => { setStep("landing"); setPhone(""); setOtp(""); setOtpSent(false); }}
          className="w-9 h-9 rounded-full bg-[#E8E2DB] flex items-center justify-center mb-10"
        >
          <svg className="w-4 h-4 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <p className="text-2xl font-black text-[#1A1510] tracking-tight mb-1">
          {otpSent ? "Enter your code" : "What's your number?"}
        </p>
        <p className="text-sm text-[#9B8F86] mb-8">
          {otpSent
            ? `We texted a 6-digit code to +1 ${phone}`
            : "We'll text you a code to verify your number."}
        </p>

        {!otpSent ? (
          <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-4 mb-5">
            <span className="text-[15px] font-semibold text-[#9B8F86] flex-shrink-0">+1</span>
            <div className="w-px h-5 bg-[#E8E2DB] flex-shrink-0" />
            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              placeholder="(555) 000-0000"
              autoFocus
              className="flex-1 bg-transparent text-[15px] text-[#1A1510] placeholder:text-[#C4BCB5] outline-none"
            />
          </div>
        ) : (
          <input
            type="tel"
            inputMode="numeric"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="000000"
            autoFocus
            className="w-full bg-white rounded-2xl px-4 py-4 text-[24px] font-bold text-[#1A1510] tracking-[0.3em] placeholder:text-[#C4BCB5] outline-none mb-5 text-center"
          />
        )}

        <button
          disabled={otpSent ? !otpReady : !phoneReady}
          onClick={() => {
            if (!otpSent) { setOtpSent(true); }
            else { router.push("/"); }
          }}
          className={`w-full py-4 rounded-3xl text-[14px] font-bold tracking-wide transition-all duration-200 ${
            (otpSent ? otpReady : phoneReady)
              ? "bg-[#1A1510] text-white active:scale-95"
              : "bg-[#E8E2DB] text-[#9B8F86]"
          }`}
        >
          {otpSent ? "Verify & continue" : "Send code"}
        </button>

        {otpSent && (
          <button
            onClick={() => setOtpSent(false)}
            className="mt-4 text-center text-[13px] text-[#9B8F86] font-medium"
          >
            Wrong number? Go back
          </button>
        )}
      </div>
    );
  }

  if (step === "email") {
    return (
      <div className="flex flex-col min-h-screen bg-[#F5F0EB] px-6 pt-14 pb-10">
        <button
          onClick={() => { setStep("landing"); setEmail(""); }}
          className="w-9 h-9 rounded-full bg-[#E8E2DB] flex items-center justify-center mb-10"
        >
          <svg className="w-4 h-4 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <p className="text-2xl font-black text-[#1A1510] tracking-tight mb-1">What's your email?</p>
        <p className="text-sm text-[#9B8F86] mb-8">We'll send you a magic link to sign in. No password needed.</p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          autoFocus
          className="w-full bg-white rounded-2xl px-4 py-4 text-[15px] text-[#1A1510] placeholder:text-[#C4BCB5] outline-none mb-5"
        />

        <button
          disabled={!emailReady}
          onClick={() => router.push("/")}
          className={`w-full py-4 rounded-3xl text-[14px] font-bold tracking-wide transition-all duration-200 ${
            emailReady
              ? "bg-[#1A1510] text-white active:scale-95"
              : "bg-[#E8E2DB] text-[#9B8F86]"
          }`}
        >
          Send magic link
        </button>
      </div>
    );
  }

  // Landing
  return (
    <div className="flex flex-col min-h-screen bg-[#1A1510]">
      {/* Top illustration area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16 pb-10">
        <Logo />
        <h1 className="mt-6 text-[38px] font-black text-white tracking-tight text-center leading-[1.1]">
          Split expenses,<br />not friendships.
        </h1>
        <p className="mt-4 text-[15px] text-[#9B8F86] text-center leading-relaxed max-w-[260px]">
          Track what you owe and what you're owed, with the people who matter.
        </p>
      </div>

      {/* Auth sheet */}
      <div className="bg-[#F5F0EB] rounded-t-[32px] px-6 pt-8 pb-12">
        <div className="flex flex-col gap-3">
          {/* Apple */}
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#1A1510] text-white text-[14px] font-semibold active:scale-95 transition-transform"
          >
            <AppleIcon />
            Continue with Apple
          </button>

          {/* Google */}
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white text-[#1A1510] text-[14px] font-semibold border border-[#E8E2DB] active:scale-95 transition-transform"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-[#E8E2DB]" />
            <span className="text-[11px] font-semibold text-[#C4BCB5] uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-[#E8E2DB]" />
          </div>

          {/* Phone */}
          <button
            onClick={() => setStep("phone")}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#E8E2DB] text-[#1A1510] text-[14px] font-semibold active:scale-95 transition-transform"
          >
            <svg className="w-5 h-5 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            Continue with phone
          </button>

          {/* Email */}
          <button
            onClick={() => setStep("email")}
            className="w-full text-center text-[13px] font-semibold text-[#9B8F86] py-2"
          >
            Use email instead
          </button>
        </div>

        <p className="mt-6 text-center text-[11px] text-[#C4BCB5] leading-relaxed">
          By continuing, you agree to our{" "}
          <span className="underline">Terms</span> and{" "}
          <span className="underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
