import { useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useInfiniteScroll(
  callback: () => void,
  options: UseInfiniteScrollOptions = {}
) {
  const [node, setNode] = useState<Element | null>(null);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px'
      }
    );

    const currentNode = node;
    const currentObserver = observer.current;

    if (currentNode) {
      currentObserver.observe(currentNode);
    }

    return () => {
      if (currentNode) {
        currentObserver.unobserve(currentNode);
      }
    };
  }, [node, options.threshold, options.rootMargin, callback]);

  return setNode;
};