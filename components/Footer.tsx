import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left */}
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ChromaSnap. All rights reserved.
        </p>

        {/* Right */}
        <div className="flex items-center gap-6 text-sm">
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
