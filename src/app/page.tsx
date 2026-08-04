import { SiteAtmosphere } from "@/components/background/site-atmosphere";
import { Hero } from "@/components/hero/hero";
import { Navbar } from "@/components/layout/navbar";
import { Philosophy } from "@/components/philosophy/philosophy";

export default function Home() {
  return (
    <>
      <SiteAtmosphere />
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
      </main>
    </>
  );
}
