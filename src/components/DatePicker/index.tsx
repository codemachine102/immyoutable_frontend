import React, { FC, HTMLAttributes, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import Calendar from 'react-calendar';

//styles
import 'react-calendar/dist/Calendar.css';
import './styles.scss';
//components
import { Input } from '../Input';
//hooks
import { useOnClickOutside } from '../../hooks';
//assets
import { calendarIcon } from '../../assets/icons';
//utils
import { formatDateDMY } from '../../utils';

interface DatePickerProps extends HTMLAttributes<HTMLDivElement> {
  value: Date | null | undefined;
  setValue: (value: any) => void;
  error?: string;
}

export const DatePicker: FC<DatePickerProps> = ({
  className,
  value,
  setValue,
  error,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setShowCalendar(false));

  const chageValue = (date: Date) => {
    // const fullDate = formatDateDMY(date);
    // console.log({ date, fullDate });

    setValue(date);
    setShowCalendar(false);
  };

  const inputValue = useMemo(
    () => (value ? formatDateDMY(value) : ''),
    [value]
  );

  return (
    <div className={cn('datePicker__container', className)} ref={ref}>
      <div className='relative'>
        <Input
          value={inputValue}
          label='DOB'
          name='dob'
          onClick={() => setShowCalendar(true)}
          readOnly
          error={error}
          rightElement={
            <img src={calendarIcon} className='pointer' alt='calendar' />
          }
          inputClassName={cn('datePicker__input')}
        />
        {showCalendar && (
          <Calendar
            onChange={chageValue}
            value={value}
            className='datePicker__calendar'
          />
        )}
      </div>
    </div>
  );
};
