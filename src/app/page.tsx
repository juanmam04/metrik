import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Philosophy } from "@/components/sections/philosophy";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
      </main>
    </>
  );
}
