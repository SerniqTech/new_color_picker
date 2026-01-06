import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function UseCasesAndGettingStarted() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* What it’s good for */}
      <Card>
        <CardHeader>
          <CardTitle>What it’s good for</CardTitle>
          <CardDescription>
            Different people use Color Picker in different ways, depending on
            what they’re building or exploring.
          </CardDescription>
        </CardHeader>

        <div className="px-6 pb-6 space-y-4">
          <div>
            <CardTitle className="text-base">
              Designers & product teams
            </CardTitle>
            <CardDescription>
              Ideal for sketching interfaces and brand palettes. Quickly explore
              color combinations and copy the CSS you need for gradients.
            </CardDescription>
          </div>

          <div>
            <CardTitle className="text-base">Illustrators & artists</CardTitle>
            <CardDescription>
              Use the eyedropper to pull inspiration from photos or paintings,
              then plan smooth shading and color transitions with gradients.
            </CardDescription>
          </div>

          <div>
            <CardTitle className="text-base">Front-end developers</CardTitle>
            <CardDescription>
              Generate consistent color values across projects. The browser
              extension makes sampling colors from existing sites effortless.
            </CardDescription>
          </div>

          <div>
            <CardTitle className="text-base">Accessibility checks</CardTitle>
            <CardDescription>
              View colors in different formats and adjust opacity until contrast
              requirements are met.
            </CardDescription>
          </div>
        </div>
      </Card>

      {/* Getting started */}
      <Card>
        <CardHeader>
          <CardTitle>Getting started</CardTitle>
          <CardDescription>
            You don’t need a manual to use Color Picker — but here’s a quick
            walkthrough to get you going.
          </CardDescription>
        </CardHeader>

        <div className="px-6 pb-6 space-y-4">
          <div>
            <CardTitle className="text-base">Choose a color</CardTitle>
            <CardDescription>
              Click anywhere on the palette to instantly see HEX, RGB, and HSV
              values. Use sliders to adjust hue, saturation, brightness, and
              transparency.
            </CardDescription>
          </div>

          <div>
            <CardTitle className="text-base">Sample from an image</CardTitle>
            <CardDescription>
              Drop an image onto the page or select one manually. Click any
              pixel to extract its exact color values.
            </CardDescription>
          </div>

          <div>
            <CardTitle className="text-base">Build a gradient</CardTitle>
            <CardDescription>
              Add and drag stops on the gradient bar, switch between linear and
              radial styles, and fine-tune angle and opacity.
            </CardDescription>
          </div>

          <div>
            <CardTitle className="text-base">Copy and reuse</CardTitle>
            <CardDescription>
              Your colors and gradients are saved automatically. Copy the codes
              or CSS and paste them into your project or share them with your
              team.
            </CardDescription>
          </div>
        </div>
      </Card>
    </div>
  );
}
