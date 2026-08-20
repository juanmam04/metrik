"use client";

import { NarrativeExperience } from "@/components/premium/narrative/narrative-experience";
import { CapabilitiesSection } from "@/components/premium/capabilities/capabilities-section";
import { PrinciplesSection } from "@/components/premium/principles/principles-section";
import { ContactSection } from "@/components/premium/contact/contact-section";

export function PremiumExperience() {
  return (
    <>
      <NarrativeExperience />
      <CapabilitiesSection />
      <PrinciplesSection />
      <ContactSection />
    </>
  );
}
