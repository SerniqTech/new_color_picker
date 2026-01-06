"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
  className?: string;
};

export function NavLink({
  href,
  children,
  className,
  exact = false,
}: NavLinkProps) {
  const pathname = usePathname();

  const isActive = exact ? pathname === href : pathname.startsWith(href);


  return (
    <Link
      href={href}
      className={clsx(
        "text-sm font-medium transition-colors pb-2",
        isActive
          ? "text-primary border-b-2 border-primary"
          : "text-muted-foreground hover:text-primary",
        className
      )}
    >
      {children}
    </Link>
  );
}
