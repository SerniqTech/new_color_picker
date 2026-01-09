import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t bg-background px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left */}
        <p className="flex justify-center sm:justify-start text-xs text-muted-foreground">
          © {new Date().getFullYear()} ChromaSnap. All rights reserved.
        </p>

        {/* Right */}
        <div className="flex items-center justify-center sm:justify-end gap-6 text-sm">
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms of Use
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
