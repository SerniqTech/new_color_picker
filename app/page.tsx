import WhytoChoose from "@/components/WhytoChoose";
import Features from "@/components/Features";
import UseCasesAndGettingStarted from "@/components/UseCasesAndGettingStarted";
import MainColorSelectionSection from "@/components/MainColorSelectionSection";

export default function Home() {
  return (
    <div className="flex gap-8 flex-col items-center justify-center">
      <MainColorSelectionSection/>
      <WhytoChoose />
      <Features />
      <UseCasesAndGettingStarted />
    </div>
  );
}
