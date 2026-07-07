"use client";

import { useLenis } from "lenis/react";

export const SCROLL_OFFSET = 0;

export function useScrollTo(targetId: string) {
  const lenis = useLenis();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    lenis?.scrollTo(`#${targetId}`, { offset: SCROLL_OFFSET });
  };

  return handleClick;
}
