import React, { FC, HTMLAttributes, useState } from 'react';
import Ticker from 'react-ticker';

//styles
import './styles.scss';
//assets
import { chevronIcon, pauseIcon, planetLogoIcon } from '../../../assets/icons';

interface SingleNewsPlayProps extends HTMLAttributes<HTMLDivElement> {}

export const SingleNewsPlay: FC<SingleNewsPlayProps> = ({}) => {
  const [move, setMove] = useState<boolean>(true);
  const [direction, setDirection] = useState<'toLeft' | 'toRight'>('toLeft');

  return (
    <div className='singleNewsPlay'>
      <div className='singleNewsPlay__logo'>
        <img src={planetLogoIcon} alt='Planet Logo' />
      </div>
      <div className='singleNewsPlay__container'>
        <Ticker
          move={move}
          direction={direction}
          mode='smooth'
          speed={5}
          offset={20}
        >
          {({ index }) => (
            <>
              <div className='singleNewsPlay__text'>
                Young Harris College to become first Higher Education
                Institution in the US to implement tokenized diplomas.
              </div>
            </>
          )}
        </Ticker>
        <div className='singleNewsPlay__btns'>
          <img
            src={chevronIcon}
            className='singleNewsPlay__btn--left'
            alt='Chevron'
            onClick={() => setDirection('toLeft')}
          />
          <img
            src={pauseIcon}
            className='singleNewsPlay__btn--center'
            alt='Pause'
            onClick={() => setMove((prev) => !prev)}
          />
          <img
            src={chevronIcon}
            className='singleNewsPlay__btn--right'
            alt='Chevron'
            onClick={() => setDirection('toRight')}
          />
        </div>
      </div>
    </div>
  );
};
