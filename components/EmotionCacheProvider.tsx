import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import React, { FC, useEffect, useRef, useState } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
export type EmotionCacheProviderProps = {};

export const EmotionCacheProvider: FC<EmotionCacheProviderProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const createMyCache = () =>
    createCache({
      key: "stanza",
      container: containerRef.current as HTMLElement,
    });
  const [myCache, setMyCache] = useState(createMyCache);
  useEffect(() => setMyCache(createMyCache), []);
  return (
    <CacheProvider value={myCache}>
      <div ref={containerRef}>{children}</div>
    </CacheProvider>
  );
};
