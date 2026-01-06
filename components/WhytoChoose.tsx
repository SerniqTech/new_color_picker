import { Card, CardDescription, CardTitle } from "./ui/card";
import { HiClipboardDocumentList } from "react-icons/hi2";

export default function WhytoChoose() {
  return (
    <Card className="p-6" style={{ boxShadow: "unset" }}>
      <CardTitle className="text-xl font-bold w-full pb-1 border-b flex justify-start items-center gap-2">
        <HiClipboardDocumentList /> Work with colors, without the hassle
      </CardTitle>
      <CardDescription>
        New Color Picker was created in 2025 out of a simple frustration: most
        color tools were bloated, slow, or unnecessarily complex. As front-end
        developers and illustrators, we wanted something faster — a tool that
        lets you grab a color, fine-tune it, and get back to work. What began as
        an internal utility quickly spread across our team, so we polished it up
        and made it available to everyone. There’s nothing to sign up for and
        nothing to learn. Open the page, select a color, and copy the HEX, RGB,
        HSL, or HSV values you need.
      </CardDescription>
      <CardTitle>Why people enjoy using Color Picker</CardTitle>

      <CardDescription>
        Finding the right shade shouldn’t interrupt your workflow. That’s why
        Color Picker is intentionally simple and focused.
      </CardDescription>
      <CardTitle>Instant color selection</CardTitle>
      <CardDescription>
        Click anywhere on the palette and get precise color values instantly. No
        extra steps, no visual clutter — just the exact color you need.
      </CardDescription>
      <CardTitle>Sample from images</CardTitle>
      <CardDescription>
        Drag in a photo, screenshot, or illustration and use the eyedropper to
        capture any pixel directly from the image.
      </CardDescription>
      <CardTitle>Create smooth gradients</CardTitle>
      <CardDescription>
        Build clean, flexible gradients by adding and adjusting color stops.
        Switch between linear and radial styles, fine-tune angles and opacity,
        then copy the CSS when it’s ready.
      </CardDescription>
      <CardTitle>Free and browser-based</CardTitle>
      <CardDescription>
        Color Picker runs in any modern browser on desktop, tablet, or mobile.
        There’s nothing to install and no cost to use.
      </CardDescription>
      <CardTitle>Browser extensions when you need them</CardTitle>
      <CardDescription>
        Optional Chrome and Edge extensions bring the eyedropper directly into
        your browser, letting you sample colors from any website and keep a
        handy history.
      </CardDescription>
    </Card>
  );
}
