import type { Metadata } from "next";
import RegistrationStep from "@/components/steps/RegistrationStep";

export const metadata: Metadata = {
  title: "Register - Daily Newsletter",
  description:
    "Create your personalized daily newsletter by selecting your interests and preferences. Get daily updates on topics that matter to you.",
  robots: "noindex, nofollow", // Kayıt sayfasının indexlenmesini engelleyelim
};

export default function Register() {
  return <RegistrationStep />;
}
