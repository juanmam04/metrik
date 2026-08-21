"use client";

import { NarrativeExperience } from "@/components/premium/narrative/narrative-experience";
import { WorkSection } from "@/components/premium/work/work-section";
import { CapabilitiesSection } from "@/components/premium/capabilities/capabilities-section";
import { ProcessSection } from "@/components/premium/process/process-section";
import { TeamSection } from "@/components/premium/team/team-section";
import { ContactSection } from "@/components/premium/contact/contact-section";

export function PremiumExperience() {
  return (
    <>
      <NarrativeExperience />
      <WorkSection />
      <CapabilitiesSection />
      <ProcessSection />
      <TeamSection />
      <ContactSection />
    </>
  );
}
