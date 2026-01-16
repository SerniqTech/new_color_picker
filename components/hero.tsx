import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import ColorEditor from "./color-editor";
import GradientEditor from "./gradient-editor";

enum HeroTab {
  createGradient = "create-gradient",
  pickColor = "pick-color",
}

export default function Hero() {
  return (
    <Card className="w-full p-2 sm:p-4 mt-12" style={{ boxShadow: "unset" }}>
      <Tabs defaultValue={HeroTab.createGradient} className="gap-6">
        <TabsList>
          <TabsTrigger
            className="data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:font-semibold"
            value={HeroTab.createGradient}
          >
            Create Gradient
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:font-semibold"
            value={HeroTab.pickColor}
          >
            Pick Color
          </TabsTrigger>
        </TabsList>
        <TabsContent value={HeroTab.createGradient}>
          <GradientEditor />
        </TabsContent>
        <TabsContent value={HeroTab.pickColor}>
          <ColorEditor />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
