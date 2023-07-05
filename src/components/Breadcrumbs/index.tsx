import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

//styles
import './styles.scss';
import { ROUTES } from '../../constants';

interface BreadcrumbsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ className, title }) => {
  return (
    <div className={cn('breadcrumbs', className)}>
      <Link to={ROUTES.faq} className='breadcrumbs__link'>
        Help Center
      </Link>
      <span className='breadcrumbs__separator'>/</span>
      <span>{title}</span>
    </div>
  );
};
