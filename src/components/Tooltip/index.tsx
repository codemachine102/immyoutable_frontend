import React, { FC } from 'react';
import cn from 'classnames';
import Tippy, { TippyProps } from '@tippyjs/react';
import { roundArrow } from 'tippy.js';

//styles
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';
import './styles.scss';

interface TooltipProps extends TippyProps {
  tooltipContent: React.ReactNode | string;
  containerClassName?: string;
  tooltipClassName?: string;
  onClick?: () => void;
  onHide?: () => void;
  disabled?: boolean;
}

export const Tooltip: FC<TooltipProps> = ({
  children,
  placement,
  className,
  tooltipContent,
  containerClassName,
  interactive = false,
  allowHTML = false,
  tooltipClassName = '',
  onClick,
  onHidden,
  disabled,
}) => {
  return (
    <Tippy
      content={
        <span
          className={cn('tooltip__text', tooltipClassName)}
          onClick={onClick && onClick}
        >
          {tooltipContent}
        </span>
      }
      className={cn('tooltip', className)}
      placement={placement}
      arrow={roundArrow}
      interactive={interactive}
      allowHTML={allowHTML}
      hideOnClick={false}
      onHidden={onHidden && onHidden}
      disabled={disabled}
    >
      <div className={cn('tooltip__container', containerClassName)}>
        {children}
      </div>
    </Tippy>
  );
};
