"use client";

import { useState } from "react";
import LandingStep from "@/components/steps/LandingStep";
import RegistrationStep from "@/components/steps/RegistrationStep";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<"landing" | "registration">(
    "landing"
  );

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl bg-[#1e293b] rounded-lg sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-[#2d3748]">
        {currentStep === "landing" ? (
          <LandingStep onStart={() => setCurrentStep("registration")} />
        ) : (
          <RegistrationStep />
        )}
      </div>
    </main>
  );
}
