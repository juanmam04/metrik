import { PremiumExperience } from "@/components/premium/experience/premium-experience";
import { PremiumFooter } from "@/components/premium/layout/premium-footer";
import { PremiumNav } from "@/components/premium/layout/premium-nav";
import { SubtleCursor } from "@/components/premium/cursor/subtle-cursor";
import { SiteAtmosphere } from "@/components/background/site-atmosphere";

export default function Home() {
  return (
    <>
      <SiteAtmosphere />
      <SubtleCursor />
      <PremiumNav />
      <main>
        <PremiumExperience />
      </main>
      <PremiumFooter />
    </>
  );
}
