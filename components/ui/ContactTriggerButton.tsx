"use client";

import { Button } from "@/components/ui/Button";
import { useContactModal } from "@/components/layout/ContactModalProvider";

interface ContactTriggerButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "pill" | "pillOutline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/** Client-side trigger for the global contact modal — use from Server Components. */
export function ContactTriggerButton({ children, ...buttonProps }: ContactTriggerButtonProps) {
  const { openContactModal } = useContactModal();

  return (
    <Button type="button" onClick={openContactModal} {...buttonProps}>
      {children}
    </Button>
  );
}
