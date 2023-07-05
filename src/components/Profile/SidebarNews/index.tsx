import React, { FC, HTMLAttributes } from 'react';

//styles
import './styles.scss';
//assets
import { news1Img, news2Img, news3Img } from '../../../assets/img';

interface SidebarNewsProps extends HTMLAttributes<HTMLDivElement> {}

export const SidebarNews: FC<SidebarNewsProps> = ({}) => {
  return (
    <div className='sidebarNews'>
      <h3 className='profile__subtitle'>U - News</h3>
      <div className='sidebarNews__newsContainer'>
        <div className='sidebarNews__news'>
          <img className='sidebarNews__img' src={news1Img} alt='News 1' />
          <p className='sidebarNews__text'>
            Californian regulators have issued consumer warnings against 16
            crypto broker scams, with one victim losing $14,000 to a fake
            Uniswap venture
          </p>
        </div>
        <div className='sidebarNews__news'>
          <img className='sidebarNews__img' src={news2Img} alt='News 2' />
          <p className='sidebarNews__text'>
            Californian regulators have issued consumer warnings against 16
            crypto broker scams, with one victim losing $14,000 to a fake
            Uniswap venture
          </p>
        </div>
        <div className='sidebarNews__news'>
          <img className='sidebarNews__img' src={news3Img} alt='News 3' />
          <p className='sidebarNews__text'>
            Californian regulators have issued consumer warnings against 16
            crypto broker scams, with one victim losing $14,000 to a fake
            Uniswap venture
          </p>
        </div>
      </div>
    </div>
  );
};
