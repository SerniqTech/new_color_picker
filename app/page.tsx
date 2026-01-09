import WhytoChoose from "@/components/why-to-choose";
import Features from "@/components/features";
import UseCasesAndGettingStarted from "@/components/use-cases-and-getting-started";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="flex gap-8 flex-col items-center justify-center">
      <Hero />
      <WhytoChoose />
      <Features />
      <UseCasesAndGettingStarted />
    </div>
  );
}
