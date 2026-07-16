// Головна — повний скрол-наратив 01–10.
import { ConnectedBodyHero } from "@/components/hero/ConnectedBodyHero";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { JourneySection } from "@/components/home/JourneySection";
import { ChainSection } from "@/components/home/ChainSection";
import { ConditionsNavigator } from "@/components/home/ConditionsNavigator";
import { SessionSection } from "@/components/home/SessionSection";
import { SpecialistTeaser } from "@/components/home/SpecialistTeaser";
import { ScenariosSection } from "@/components/home/ScenariosSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export default function HomePage() {
  return (
    <main id="main">
      <ConnectedBodyHero />
      <ManifestoSection />
      <JourneySection />
      <ChainSection />
      <ConditionsNavigator />
      <SessionSection />
      <SpecialistTeaser />
      <ScenariosSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
}
