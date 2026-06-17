"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";
type Variant = "outline" | "solid";

type CommonProps = {
  children: React.ReactNode;
  tone?: Tone;
  variant?: Variant;
  className?: string;
  icon?: React.ReactNode;
};

type AsLink = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
};
type AsButton = CommonProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function PillButton(props: AsLink | AsButton) {
  const {
    children,
    tone = "light",
    variant = "outline",
    className,
    icon,
  } = props;

  const solid = variant === "solid";

  const base = cn(
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full border py-1.5 pl-1.5 pr-6 font-semibold tracking-tight transition-colors duration-500",
    solid
      ? "border-volt bg-volt text-ink"
      : tone === "dark"
        ? "border-bone/25 text-bone"
        : "border-ink/15 text-ink",
    className,
  );

  // Wipe fill color
  const fill =
    solid
      ? "bg-ink"
      : tone === "dark"
        ? "bg-bone"
        : "bg-ink";

  const hoverText =
    solid
      ? "group-hover:text-bone"
      : tone === "dark"
        ? "group-hover:text-ink"
        : "group-hover:text-bone";

  const circle = solid ? "bg-ink text-volt" : "bg-volt text-ink";

  const inner = (
    <>
      {/* wipe fill */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 origin-left scale-x-0 rounded-full transition-transform duration-500 ease-swift group-hover:scale-x-100",
          fill,
        )}
      />
      <span
        className={cn(
          "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-[42deg]",
          circle,
        )}
      >
        {icon ?? <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />}
      </span>
      <span
        className={cn(
          "relative z-10 text-sm transition-colors duration-500",
          hoverText,
        )}
      >
        {children}
      </span>
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={base}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={(props as AsButton).type ?? "button"}
      onClick={(props as AsButton).onClick}
      className={base}
    >
      {inner}
    </button>
  );
}
