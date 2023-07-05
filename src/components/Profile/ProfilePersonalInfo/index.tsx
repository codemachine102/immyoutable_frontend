import React, { HTMLAttributes, FC, ReactNode } from 'react';
import cn from 'classnames';

//styles
import './styles.scss';

interface InfoTableDataType {
  name: string | ReactNode;
  from: string;
  to: string;
  date: string;
}

interface ItemInfoDataType {
  title?: string;
  text?: string;
  full?: boolean;
  type?: string;
  tableData?: InfoTableDataType[];
}

interface InfoDataType {
  data: ItemInfoDataType[];
}

interface ProfilePersonalInfoProps extends HTMLAttributes<HTMLDivElement> {
  data?: InfoDataType[];
  title?: string;
  containerClassName?: string;
}

export const ProfilePersonalInfo: FC<ProfilePersonalInfoProps> = ({
  data = [],
  title = '',
  className,
  containerClassName,
}) => {
  return (
    <div className={cn('profilePersonalInfo', className)}>
      <h3 className='profile__subtitle'>{title}</h3>
      <div className={cn('profilePersonalInfo__container', containerClassName)}>
        {data?.map((line, lineIndex) => (
          <div
            className='profilePersonalInfo__line'
            key={`profilePersonalInfo__line-${lineIndex}-${line.data[0].title}`}
          >
            {line.data?.map((item, itemIndex) => {
              if (item.type === 'table') {
                return (
                  <div
                    className={cn(
                      'profilePersonalInfo__item',
                      'profilePersonalInfo__item--table'
                    )}
                    key={`profilePersonalInfo__item-${lineIndex}-${itemIndex}-${item.title}`}
                  >
                    <>
                      <h4>History</h4>
                      <h4>From</h4>
                      <h4>To</h4>
                      <h4>Date</h4>
                    </>
                    {item.tableData?.map((el, elIndex) => (
                      <React.Fragment
                        key={`profilePersonalInfo__item-table-${lineIndex}-${itemIndex}-${elIndex}`}
                      >
                        <p>{el.name}</p>
                        <p>{el.from}</p>
                        <p>{el.to}</p>
                        <p>{el.date}</p>
                      </React.Fragment>
                    ))}
                  </div>
                );
              } else {
                return (
                  <div
                    className={cn(
                      'profilePersonalInfo__item',
                      item?.full && 'profilePersonalInfo__item--full'
                    )}
                    key={`profilePersonalInfo__item-${lineIndex}-${itemIndex}-${item.title}`}
                  >
                    <h4>{item?.title}</h4>
                    <p>{item?.text}</p>
                  </div>
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
