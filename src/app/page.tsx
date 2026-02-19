import HeroSanctuary from "@/components/sections/HeroSanctuary";
import PhilosophyStrip from "@/components/sections/PhilosophyStrip";
import LabSpecimens from "@/components/sections/LabSpecimens";
import Colophon from "@/components/sections/Colophon";

export default function Home() {
  return (
    <main>
      <HeroSanctuary />
      <PhilosophyStrip />
      <LabSpecimens />
      <Colophon />
    </main>
  );
}
