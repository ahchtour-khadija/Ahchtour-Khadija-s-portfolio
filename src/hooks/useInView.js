import { useState, useEffect, useRef, useLayoutEffect } from 'react';

export function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);
  const optionsRef = useRef(options);

  useLayoutEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...optionsRef.current,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

export function useStaggeredInView(itemCount, options = {}) {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const ref = useRef(null);
  const optionsRef = useRef(options);

  useLayoutEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, i]));
            }, i * 80);
          }
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...optionsRef.current,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [itemCount]);

  return [ref, visibleItems];
}