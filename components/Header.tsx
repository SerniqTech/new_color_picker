"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { FaChrome } from "react-icons/fa6";
import { FaEdge } from "react-icons/fa";
import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { detectBrowser } from "@/lib/detect-browser";
import Image from "next/image";
import Link from "next/link";

const BROWSER_CTA = {
  chrome: {
    label: "Add to Chrome",
    icon: FaChrome,
  },
  edge: {
    label: "Add to Edge",
    icon: FaEdge,
  },
  unknown: {
    label: "Add to Browser",
    icon: BsGlobeEuropeAfrica,
  },
} as const;

type BrowserKey = keyof typeof BROWSER_CTA;

export default function Header() {
  const [browser, setBrowser] = useState<BrowserKey>("unknown");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBrowser(detectBrowser());
    setMounted(true);
  }, []);

  const { label, icon: Icon } = BROWSER_CTA[browser];

  return (
    <header className="w-full min-h-16 bg-white fixed top-0 left-0 right-0 z-50 shadow-sm px-6 md:px-12 lg:px-24 py-2 flex justify-between items-center">
      <Link
        href="/"
        className="flex items-center gap-2 justify-center sm:justify-start"
      >
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
        <span className="text-xs sm:text-sm lg:text-lg font-bold">
          New Color Picker
        </span>
      </Link>

      <div className="flex justify-center sm:col-span-2 sm:justify-center lg:col-span-1 lg:justify-end">
        {!mounted ? (
          <Button className="w-full lg:w-fit">Add Extension</Button>
        ) : (
          <Button className="w-full lg:w-fit">
            <Icon />
            {label}
          </Button>
        )}
      </div>
    </header>
  );
}
