"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackClientEvent } from "@/lib/tracking";

type TrackedOutboundLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  eventName?: string;
  payload?: Record<string, string | number | boolean | null | undefined>;
  children: ReactNode;
};

export function TrackedOutboundLink({
  href,
  eventName = "outbound_click",
  payload,
  onClick,
  children,
  ...props
}: TrackedOutboundLinkProps) {
  return (
    <a
      href={href}
      onClick={(event) => {
        trackClientEvent(eventName, { href, ...payload });
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

