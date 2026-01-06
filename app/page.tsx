import { Card } from "@/components/ui/card";
import WhytoChoose from "@/components/WhytoChoose";
import Features from "@/components/Features";
import UseCasesAndGettingStarted from "@/components/UseCasesAndGettingStarted";

export default function Home() {
  return (
    <div className="flex gap-8 flex-col items-center justify-center">
      <Card className="w-full h-96 p-6 mt-12" style={{ boxShadow: "unset" }}>
        
      </Card>
      <WhytoChoose />
      <Features />
      <UseCasesAndGettingStarted />
    </div>
  );
}
