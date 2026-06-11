"use client";

import { usePathname } from "next/navigation";

// Re-keys on route change so each page plays a brief entrance animation.
// The animation always completes on load; reduced-motion disables it via CSS.
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="animate-enter flex flex-1 flex-col">
      {children}
    </div>
  );
}
