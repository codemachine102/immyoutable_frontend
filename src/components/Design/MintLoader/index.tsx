import React, { FC, HTMLAttributes, useMemo } from 'react';
import cn from 'classnames';

//styles
import './styles.scss';
//assets
import {
  mintLoadingHalf1Icon,
  mintLoadingHalf2Icon,
} from '../../../assets/icons';

interface MintLoaderProps extends HTMLAttributes<HTMLDivElement> {
  widthLoading: number;
}

export const MintLoader: FC<MintLoaderProps> = ({
  className,
  widthLoading,
}) => {
  const radius = 80;
  const circleCircumference = 2 * Math.PI * radius;

  const targetAmount = 100;

  const spentAmount = useMemo(
    () => targetAmount - widthLoading,
    [widthLoading, targetAmount]
  );
  const percentage = useMemo(
    () => (spentAmount / targetAmount) * 100,
    [spentAmount, targetAmount]
  );
  const strokeDashoffset = useMemo(
    () => circleCircumference - (circleCircumference * percentage) / 100,
    [circleCircumference, percentage]
  );

  return (
    <div className={cn('mintLoader', className)}>
      <img src={mintLoadingHalf2Icon} alt='Mint Loading 1' />
      <img src={mintLoadingHalf1Icon} alt='Mint Loading 2' />
      <svg
        height='160'
        width='160'
        viewBox='0 0 180 180'
        className='mintLoader__Bg'
      >
        <g
          transform-origin='90 90'
          style={{
            transform: 'rotateZ(0deg) rotateX(180deg)',
            transition: '1s',
          }}
        >
          <circle
            cx='50%'
            cy='50%'
            r={radius}
            stroke='#282A3A'
            fill='transparent'
            strokeWidth='20'
            strokeDasharray={circleCircumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: '1s' }}
          />
        </g>
      </svg>
    </div>
  );
};
