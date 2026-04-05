import { useEffect, useRef } from "react";

export function useInfiniteScroll({ loadMore, hasMore, scrollLoader }) {
  const sentinel = useRef(null);
  const fetchingRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];

        if (!entry.isIntersecting) return;
        if (!hasMore || scrollLoader || fetchingRef.current) return;

        fetchingRef.current = true;

        try {
          await loadMore();
        } finally {
          fetchingRef.current = false;
        }
      },
      {
        threshold: 0,
        rootMargin: "400px",
      },
    );

    const el = sentinel.current;
    if (el) observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, scrollLoader, loadMore]);

  return sentinel;
}
