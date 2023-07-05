import React, { FC, HTMLAttributes, useState } from 'react';
import cn from 'classnames';

//styles
import './styles.scss';
//components
import { DesignStudent } from '../DesignStudent';

type TabTypes = {
  title: string;
  component: JSX.Element;
};

interface DesignTabsProps extends HTMLAttributes<HTMLDivElement> {}

export const DesignTabs: FC<DesignTabsProps> = ({ className }) => {
  const tabs: TabTypes[] = [
    { title: 'student', component: <DesignStudent /> },
    { title: 'alumni', component: <DesignStudent /> },
  ];
  const [activeTab] = useState<TabTypes>(tabs[1]);

  return (
    <div className={cn('designTabs', className)}>
      <div className='designTabs__header'>
        {/* {tabs.map((el) => (
          <div
            className={cn(
              'designTabs__headerBtn',
              el.title === activeTab.title && 'designTabs__headerBtn--active'
            )}
            key={`designTabs__header-${el.title}`}
            onClick={() => setActiveTab(el)}
          >
            {el.title}
          </div>
        ))} */}
        <div
          className={cn(
            'designTabs__headerBtn',
            'designTabs__headerBtn--active'
          )}
        >
          {activeTab.title}
        </div>
      </div>
      <div className='designTabs__container'>{activeTab.component}</div>
    </div>
  );
};
