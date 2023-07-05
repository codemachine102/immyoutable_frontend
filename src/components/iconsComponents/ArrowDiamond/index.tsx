import React, { FC } from 'react';

const colors = {
  orange: {
    colorStart: '#FB5130',
    colorEnd: '#ED9719',
  },
  grey: {
    colorStart: '#414146',
    colorEnd: '#E1E1D1',
  },
  purple: {
    colorStart: '#DEAFF3',
    colorEnd: '#AF35F8',
  },
};

export const ArrowDiamond: FC<{
  color?: 'orange' | 'grey' | 'purple';
}> = ({ color = 'orange' }) => {
  return (
    <svg
      width='47'
      height='12'
      viewBox='0 0 47 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M46.7735 6L41 0.226497L35.2265 6L41 11.7735L46.7735 6ZM0 7H41V5H0V7Z'
        fill={`url(#linear_gradient_${color})`}
      />
      <defs>
        <linearGradient
          id={`linear_gradient_${color}`}
          x1='41'
          y1='6.5'
          x2='4.63527e-08'
          y2='6.5'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor={colors[color as keyof typeof colors].colorStart} />
          <stop
            offset='1'
            stopColor={colors[color as keyof typeof colors].colorEnd}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
