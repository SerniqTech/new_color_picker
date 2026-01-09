import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import ColorPickerEditor from "./color-picker-editor";
import { GradientEditor } from "./gradient-editor";

export default function Hero() {
  return (
    <Card className="w-full p-2 sm:p-4 mt-12" style={{ boxShadow: "unset" }}>
      <Tabs defaultValue="create-gradient" className="gap-6">
        <TabsList>
          <TabsTrigger className="data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:font-semibold" value="create-gradient">Create Gradient</TabsTrigger>
          <TabsTrigger className="data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:font-semibold" value="pick-color">Pick Color</TabsTrigger>
        </TabsList>
        <TabsContent value="create-gradient">
          <GradientEditor />
        </TabsContent>
        <TabsContent value="pick-color">
          <ColorPickerEditor />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
