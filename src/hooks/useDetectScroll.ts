import { useState, useEffect, useCallback } from 'react';

export const useDetectScroll = (node: any, deps: any[] = []) => {
  const [isBottom, setIsBottom] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [isScrollable, setIsScrollable] = useState(true);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = node.current;
    if (scrollTop + clientHeight === scrollHeight) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
    if (scrollTop === 0) {
      setIsTop(true);
    } else {
      setIsTop(false);
    }
  }, [node]);

  useEffect(() => {
    if (node.current) {
      node.current?.addEventListener('scroll', handleScroll);
      return () => node.current?.removeEventListener('scroll', handleScroll);
    }
  }, [node, handleScroll]);

  const handleScrollable = useCallback(() => {
    const { scrollHeight, clientHeight } = node.current;
    const hasScrollableContent = scrollHeight > clientHeight;
    setIsScrollable(hasScrollableContent);
  }, [node, ...deps]);

  useEffect(() => {
    if (typeof window !== 'undefined' && node.current) {
      window.addEventListener('resize', handleScrollable);
      handleScrollable();
      return () => window.removeEventListener('resize', handleScrollable);
    }
  }, [node, handleScroll, ...deps]);

  return { isBottom, isTop, isScrollable };
};
