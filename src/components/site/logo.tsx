import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Adfinity — inicio"
      className={cn("group flex items-center gap-2.5", className)}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-ink transition-transform duration-500 group-hover:rotate-[-8deg]">
        <svg viewBox="0 0 40 40" className="h-6 w-6" fill="none">
          <path
            d="M7 28 C 14 8, 22 32, 33 12"
            stroke="#C8F02A"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <circle cx="33" cy="12" r="3.4" fill="#C8F02A" />
        </svg>
      </span>
      <span
        className={cn(
          "font-display text-lg font-extrabold tracking-tight",
          tone === "dark" ? "text-bone" : "text-ink",
        )}
      >
        Ad<span className="text-volt-deep">finity</span>
      </span>
    </Link>
  );
}
