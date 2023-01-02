import { RefObject, useEffect } from "react";

export const useResetScroll = <T extends HTMLElement>(scrollInner: RefObject<T>, data: any) => {
  useEffect(() => {
    if (!scrollInner.current) return;
    scrollInner.current.scrollTop = 0;
  }, [data]);
};
