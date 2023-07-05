import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import cn from 'classnames';

//styles
import './styles.scss';
//components
import { SlideArrow } from '../iconsComponents';

interface SwipeButtonProps {
  mainText: any;
  overlayText: any;
  onSwipeDone: Function;
  reset?: number;
  containerClassName?: string;
  className?: string;
  overlayClassName?: string;
  caretClassName?: string;
  delta?: number;
  minSwipeWidth?: number;
  minSwipeVelocity?: number;
  caret?: any;
  minOverlayWidth?: number;
  disabled?: boolean;
}

function findLeft(element: any) {
  var rec = element.getBoundingClientRect();
  return rec.left + window.scrollX;
}

export function SwipeButton({
  mainText,
  overlayText,
  onSwipeDone,
  reset,
  containerClassName = '',
  className = '',
  overlayClassName = '',
  caretClassName = '',
  delta = 10,
  minSwipeWidth = 0.95,
  minSwipeVelocity = 0.6,
  caret = null,
  minOverlayWidth = 62,
  disabled = false,
}: SwipeButtonProps) {
  const [overlayWidth, setOverlayWidth] = useState<number>(minOverlayWidth);
  const [swipeComplete, setSwipeComplete] = useState<boolean>(false);
  const buttonRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (reset) {
      setSwipeComplete(false);
      setOverlayWidth(minOverlayWidth);
    }
  }, [reset, minOverlayWidth]);

  const handlers = useSwipeable({
    onSwipedRight: (data) => {
      if (swipeComplete) return;
      const butWidth = buttonRef.current?.clientWidth || 0;

      if (data.velocity > minSwipeVelocity) {
        setOverlayWidth(butWidth);
        setSwipeComplete(true);
        setTimeout(() => onSwipeDone(), 100);
      } else {
        const offsetLeft = findLeft(buttonRef.current);
        const startPos = Math.abs(data.initial[0] - offsetLeft);
        if (
          startPos <= 100 &&
          (data.event.type === 'touchend'
            ? //@ts-ignore
              data.event.changedTouches[0].clientX - offsetLeft
            : //@ts-ignore
              data.event.offsetX) >
            minSwipeWidth * butWidth
        ) {
          setOverlayWidth(butWidth);
          setSwipeComplete(true);
          setTimeout(() => onSwipeDone(), 100);
        } else setOverlayWidth(minOverlayWidth);
      }
    },
    onSwiping: (data) => {
      const butWidth = buttonRef.current?.clientWidth || 0;

      if (swipeComplete) return;
      const offsetLeft = findLeft(buttonRef.current);
      const startPos = Math.abs(data.initial[0] - offsetLeft);

      //@ts-ignore
      // console.log(butWidth, data.event.offsetX, data.deltaX);

      if (startPos <= 100 && data.deltaX > 0 && data.deltaX <= butWidth) {
        if (data.event.type && data.event.type === 'touchmove')
          //@ts-ignore
          setOverlayWidth(data.event.touches[0].clientX - offsetLeft);
        else {
          const minValue =
            //@ts-ignore
            data.event.offsetX >= minOverlayWidth
              ? //@ts-ignore
                data.event.offsetX
              : minOverlayWidth;
          // console.log(minValue);

          setOverlayWidth(minValue <= butWidth ? minValue : butWidth);
        }
      }
    },
    delta,
    trackMouse: true,
    // preventDefaultTouchmoveEvent: true,
  });

  return (
    <div
      className={cn(
        'swipeButton__container',
        disabled && 'swipeButton__container--disabled',
        containerClassName
      )}
    >
      <div
        className={cn(
          'swipeButton',
          disabled && 'swipeButton--disabled',
          className
        )}
        {...handlers}
        ref={(t) => {
          handlers.ref(t);
          //@ts-ignore
          buttonRef.current = t;
        }}
      >
        <div
          className={cn(
            'swipeButton__overlay',
            overlayClassName,
            overlayWidth === minOverlayWidth &&
              'swipeButton__overlay--transition'
          )}
          style={{ width: overlayWidth }}
        >
          <div className='swipeButton__overlayWrapper'>
            <div className={cn('swipeButton__caretWrapper', caretClassName)}>
              {caret ? (
                caret
              ) : (
                <SlideArrow color={disabled ? 'grey' : 'blue'} />
              )}
            </div>
            <div className='swipeButton__overlayTxt'>{overlayText}</div>
          </div>
        </div>
        <span
          className='swipeButton__mainTxt'
          style={{
            paddingLeft: minOverlayWidth / 1.5,
          }}
        >
          {mainText}
        </span>
      </div>
    </div>
  );
}
