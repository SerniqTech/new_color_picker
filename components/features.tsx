import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  FiCheckCircle,
  FiDroplet,
  FiSliders,
  FiClock,
  FiGlobe,
  FiShield,
} from "react-icons/fi";
import { HiClipboardDocumentList } from "react-icons/hi2";


export default function Features() {
  return (
    <div className="bg-card text-card-foreground rounded-xl border p-6">
      <div className="text-xl font-bold flex justify-start items-center gap-2"><HiClipboardDocumentList/> Features at a glance</div>
      <div className="w-full border-b mt-1 mb-8"></div>
      {/* Eyedropper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Alert className="border-blue-200 bg-blue-50 text-blue-900 flex-1">
          <FiDroplet className="h-5 w-5 text-blue-600" />
          <div>
            <AlertTitle>Eyedropper</AlertTitle>
            <AlertDescription>
              Pull colors directly from images or anywhere on your screen by
              clicking a single pixel.
            </AlertDescription>
          </div>
        </Alert>

        {/* Format conversions */}
        <Alert className="border-violet-200 bg-violet-50 text-violet-900 flex-1">
          <FiSliders className="h-5 w-5 text-violet-600" />
          <div>
            <AlertTitle>Format conversions</AlertTitle>
            <AlertDescription>
              Instantly switch between HEX, RGB, HSL, and HSV and copy values
              wherever you need them.
            </AlertDescription>
          </div>
        </Alert>

        {/* Gradient maker */}
        <Alert className="border-pink-200 bg-pink-50 text-pink-900 flex-1">
          <FiCheckCircle className="h-5 w-5 text-pink-600" />
          <div>
            <AlertTitle>Gradient maker</AlertTitle>
            <AlertDescription>
              Build linear or radial gradients, fine-tune stops and opacity,
              then copy the finished CSS.
            </AlertDescription>
          </div>
        </Alert>

        {/* Color history */}
        <Alert className="border-amber-200 bg-amber-50 text-amber-900 flex-1">
          <FiClock className="h-5 w-5 text-amber-600" />
          <div>
            <AlertTitle>Color history</AlertTitle>
            <AlertDescription>
              Every color you pick is saved so you can reuse or revisit it
              later.
            </AlertDescription>
          </div>
        </Alert>

        {/* Browser add-ons */}
        <Alert className="border-emerald-200 bg-emerald-50 text-emerald-900 flex-1">
          <FiGlobe className="h-5 w-5 text-emerald-600" />
          <div>
            <AlertTitle>Browser add-ons</AlertTitle>
            <AlertDescription>
              Chrome and Edge extensions let you sample colors from any website
              directly.
            </AlertDescription>
          </div>
        </Alert>

        {/* Free & private */}
        <Alert className="border-slate-200 bg-slate-50 text-slate-900 flex-1">
          <FiShield className="h-5 w-5 text-slate-600" />
          <div>
            <AlertTitle>Free & private</AlertTitle>
            <AlertDescription>
              Completely free to use and we don’t collect or sell your data.
            </AlertDescription>
          </div>
        </Alert>
      </div>
    </div>
  );
}
