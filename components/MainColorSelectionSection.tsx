import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import CreateGradient from "./CreateGradient";
import PickColor from "./PickColor";

export default function MainColorSelectionSection() {
  return (
    <Card className="w-full p-3 sm:p-6 mt-12" style={{ boxShadow: "unset" }}>
      <Tabs defaultValue="create-gradient" className="gap-6">
        <TabsList>
          <TabsTrigger value="create-gradient">Create Gradient</TabsTrigger>
          <TabsTrigger value="pick-color">Pick Color</TabsTrigger>
        </TabsList>
        <TabsContent value="create-gradient">
          <CreateGradient />
        </TabsContent>
        <TabsContent value="pick-color">
          <PickColor />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
