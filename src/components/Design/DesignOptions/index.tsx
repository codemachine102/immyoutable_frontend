import React, { FC, HTMLAttributes, useState } from 'react';
import cn from 'classnames';

//styles
import './styles.scss';
//components
import { DesignMenu } from '../DesignMenu';
import { DesignColors } from '../DesignColors';
import { DesignLogos } from '../DesignLogos';
//assets
import {
  colorActiveImg,
  colorImg,
  graduateActiveImg,
  graduateImg,
} from '../../../assets/img';
//types
import { DesignMenuItemType } from '../types';

interface DesignOptionsProps extends HTMLAttributes<HTMLDivElement> {}

export const DesignOptions: FC<DesignOptionsProps> = ({ className }) => {
  const options: DesignMenuItemType[] = [
    {
      title: 'Colors',
      icon: colorImg,
      activeIcon: colorActiveImg,
      component: <DesignColors />,
    },
    {
      title: 'Logos',
      icon: graduateImg,
      activeIcon: graduateActiveImg,
      component: <DesignLogos />,
    },
    // {
    //   title: 'Animations',
    //   icon: animateIcon,
    //   activeIcon: animateActiveIcon,
    //   component: <>Animations</>,
    // },
  ];

  const [activeOption, setActiveOption] = useState<DesignMenuItemType>(
    options[0]
  );

  return (
    <div className={cn('designOptions', className)}>
      <DesignMenu
        options={options}
        activeOption={activeOption}
        setActiveOption={setActiveOption}
      />
      <div className='designOptions__container'>{activeOption.component}</div>
    </div>
  );
};
