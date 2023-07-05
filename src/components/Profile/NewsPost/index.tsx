import React, { FC, HTMLAttributes } from 'react';

//styles
import './styles.scss';
//components
import { Button } from '../../Button';
//utils
import { formatedDateMoment } from '../../../utils';

interface PostProps {
  author: string;
  createdAt: string;
  description: string;
  guid: string;
  id: number;
  image: string;
  provider: string;
  title: string;
  icon: string;
  original: string;
}

interface NewsPostProps extends HTMLAttributes<HTMLDivElement> {
  data?: PostProps;
}

export const NewsPost: FC<NewsPostProps> = ({ data }) => {
  return (
    <div className='newsPost'>
      <div className='newsPost__header mb16'>
        {/* <div  */}
        <img
          alt='News Logo'
          src={data?.icon}
          className='newsPost__headerLogo'
        />
        {/* </div> */}
        <div className='newsPost__headerInfo'>
          <div className='newsPost__headerTitle'>
            Cointelegraph
            {/* {data?.author} */}
          </div>
          {/* <div className='newsPost__headerFollowers'>27883 followers</div> */}
          <div className='newsPost__headerTime'>
            {data?.createdAt ? formatedDateMoment(data?.createdAt) : ''}
          </div>
        </div>
      </div>
      <div className='newsPost__text'>
        <p>{data?.description}</p>
        <Button
          buttonType='text'
          // color='white'
          text='See more...'
          className='newsPost__textBtn'
          href={data?.original}
        />
      </div>
      <img src={data?.image} className='newsPost__img' alt='News Post' />
      <div className='newsPost__title'>
        <h3>{data?.title}</h3>
        <div className='newsPost__titleTime'>1 min read</div>
      </div>
    </div>
  );
};
