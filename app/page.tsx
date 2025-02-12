"use client";

import { useState } from "react";
import LandingStep from "@/components/steps/LandingStep";
import RegistrationStep from "@/components/steps/RegistrationStep";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Newsletter - Start Your Personalized Journey",
  description:
    "Subscribe to our daily newsletter and receive personalized content based on your interests. Choose from various topics including history, facts, quotes, and more.",
  alternates: {
    canonical: "https://daily-newsletter.com",
  },
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState<"landing" | "registration">(
    "landing"
  );

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#1e293b] rounded-2xl shadow-xl p-8 border border-[#2d3748]">
        {currentStep === "landing" ? (
          <LandingStep onStart={() => setCurrentStep("registration")} />
        ) : (
          <RegistrationStep />
        )}
      </div>
    </main>
  );
}
