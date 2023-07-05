import React, { useRef, useState } from 'react';
import cn from 'classnames';

//styles
import './styles.scss';
//constants
// import { faqs } from '../../constants';
//assets
import { accordionOpenIcon } from '../../assets/icons';
import { FAQType } from '../../context/common/types';

const AccordionItem = ({ faq }: { faq: FAQType }) => {
  const [open, setOpen] = useState<boolean>(false);
  const contentEl = useRef<HTMLDivElement>(null);

  const { question, answer } = faq;

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <li className={cn('accordion__item')}>
      <div
        onClick={handleToggle}
        className={cn('accordion__button', open && 'accordion__button--active')}
      >
        {question}
        <img
          src={accordionOpenIcon}
          className={cn('accordion__icon', open && 'accordion__icon--active')}
          alt='Accordion Open'
        />
      </div>

      <div
        ref={contentEl}
        className='accordion__answer'
        style={
          open ? { height: contentEl.current?.scrollHeight } : { height: '0px' }
        }
      >
        <p>{answer}</p>
      </div>
    </li>
  );
};

export const Accordion = ({ faqs }: { faqs: FAQType[] | null }) => {
  return (
    <ul className='accordion'>
      {faqs?.map((faq, index) => (
        <AccordionItem key={index} faq={faq} />
      ))}
    </ul>
  );
};
