import {
  RefObject,
  useState,
  useEffect,
  FC,
  useRef,
  CSSProperties,
  HTMLAttributes,
} from 'react';

function useElementOnScreen(
  ref: RefObject<Element>,
  timeout = 0,
  rootMargin = '0px'
) {
  const [isIntersecting, setIsIntersecting] = useState(true);
  const timeoutConst = 100 + timeout;
  useEffect(() => {
    let timerId: any;
    const refCurrent = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timerId = setTimeout(() => {
            setIsIntersecting(entry.isIntersecting);
          }, 100 + timeoutConst);
        } else {
          clearTimeout(timerId);
          setIsIntersecting(entry.isIntersecting);
        }
      },
      { rootMargin }
    );
    if (refCurrent) {
      observer.observe(refCurrent);
    }
    return () => {
      clearTimeout(timerId);
      if (refCurrent) {
        observer.unobserve(refCurrent);
      }
    };
  }, [timeout, ref, rootMargin, timeoutConst]);
  return isIntersecting;
}

interface AnimatedInTypes extends HTMLAttributes<HTMLDivElement> {
  from: CSSProperties;
  to: CSSProperties;
  timeout?: number;
}

const AnimateIn: FC<AnimatedInTypes> = ({
  from,
  to,
  children,
  timeout,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useElementOnScreen(ref, timeout);
  const defaultStyles: CSSProperties = {
    transition: '600ms ease-in-out',
  };
  return (
    <div
      ref={ref}
      style={
        onScreen
          ? {
              ...defaultStyles,
              ...to,
            }
          : {
              ...defaultStyles,
              ...from,
            }
      }
      className={className}
    >
      {children}
    </div>
  );
};

interface AnimatedTypes extends HTMLAttributes<HTMLDivElement> {
  timeout?: number;
}

const FadeIn: FC<AnimatedTypes> = (props) => (
  <AnimateIn from={{ opacity: 0 }} to={{ opacity: 1 }} {...props}>
    {props.children}
  </AnimateIn>
);

const FadeUp: FC<AnimatedTypes> = (props) => (
  <AnimateIn
    from={{ opacity: 0, translate: '0 2rem' }}
    to={{ opacity: 1, translate: 'none' }}
    {...props}
  >
    {props.children}
  </AnimateIn>
);

const ScaleIn: FC<AnimatedTypes> = (props) => (
  <AnimateIn from={{ scale: '0' }} to={{ scale: '1' }} {...props}>
    {props.children}
  </AnimateIn>
);

const SlideLeftIn: FC<AnimatedTypes> = (props) => (
  <AnimateIn
    from={{ opacity: 0, translate: -150 }}
    to={{ opacity: 1, translate: 0 }}
    {...props}
  >
    {props.children}
  </AnimateIn>
);
const SlideRightIn: FC<AnimatedTypes> = (props) => (
  <AnimateIn
    from={{ opacity: 0, translate: 150 }}
    to={{ opacity: 1, translate: 0 }}
    {...props}
  >
    {props.children}
  </AnimateIn>
);

export const Animate = {
  FadeIn,
  FadeUp,
  ScaleIn,
  SlideLeftIn,
  SlideRightIn,
};
