import React, { FC, HTMLAttributes, useEffect } from 'react';
import cn from 'classnames';

//styles
import './styles.scss';
//components
import { DesignOptions } from '../DesignOptions';
import { DesignRender } from '../DesignRender';
//context
import { useDesign } from '../../../context';

interface DesignStudentProps extends HTMLAttributes<HTMLDivElement> {}

export const DesignStudent: FC<DesignStudentProps> = ({ className }) => {
  const design = useDesign();

  useEffect(() => {
    design.getMintedCards();
  }, []);

  return (
    <div className={cn('designStudent', className)}>
      <DesignOptions className='designStudent__options' />
      <DesignRender
        className='designStudent__render'
        containerClassName='designStudent__renderContainer'
      />
    </div>
  );
};
