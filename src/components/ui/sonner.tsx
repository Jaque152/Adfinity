"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-ink group-[.toaster]:text-bone group-[.toaster]:border group-[.toaster]:border-bone/15 group-[.toaster]:rounded-xl group-[.toaster]:shadow-2xl group-[.toaster]:font-sans",
          title: "group-[.toast]:font-semibold",
          description: "group-[.toast]:text-bone/60",
          actionButton:
            "group-[.toast]:bg-volt group-[.toast]:text-ink group-[.toast]:rounded-full group-[.toast]:font-bold",
          cancelButton:
            "group-[.toast]:bg-bone/10 group-[.toast]:text-bone",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
