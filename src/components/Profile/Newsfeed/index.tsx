import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

//styles
import './styles.scss';
//components
import { NewsPost } from '../NewsPost';
//axios
import axiosApiInstance from '../../../api/axios';

interface NewsfeedProps extends HTMLAttributes<HTMLDivElement> {}

export const Newsfeed: FC<NewsfeedProps> = ({}) => {
  const [news, setNews] = useState<any[]>([]);
  const [newsPage, setNewsPage] = useState<number>(0);
  const [newsError, setNewsError] = useState<boolean>(false);
  const [isLoadingNews, setIsLoadingNews] = useState<boolean>(false);
  const [notFoundNews, setNotFoundNews] = useState<boolean>(false);
  const [scrollRef, inView] = useInView({ threshold: 1 });

  const getNews = async (offset = 0, numberOfNews = 15, order = 'desc') => {
    // console.log('getNews', { offset, numberOfNews, order });
    try {
      setIsLoadingNews(true);
      setNewsError(false);
      const { data } = await axiosApiInstance.get(
        `private/common/news-feed/main/?offset=${
          offset * numberOfNews
        }&limit=${numberOfNews}&order=${order}`
      );
      if (data?.success) {
        setNews((prevNews) => [...prevNews, ...data?.data?.rows]);

        if (data?.data?.rows && data?.data?.rows.length > 0) {
          setNewsPage((page) => page + 1);
        } else {
          setNotFoundNews(true);
        }
      }
      setIsLoadingNews(false);
    } catch (e) {
      console.log('getNews error', e);
      setIsLoadingNews(false);
      setNewsError(true);
    }
  };

  // useEffect(() => {
  //   if (!news || !news.length) {
  //     getNews();
  //   }
  // }, [news]);

  useEffect(() => {
    if (inView) {
      getNews(newsPage);
    }
  }, [inView, newsPage]);

  return (
    <div className='newsfeed__container'>
      {news && !!news.length && (
        <div className='newsfeed'>
          {news.map((post, id) => (
            <NewsPost
              data={post}
              key={`newsPost-${id}-${post.id}`}
              data-testid='newsPost'
            />
          ))}
        </div>
      )}
      {!isLoadingNews && !notFoundNews && !newsError && <div ref={scrollRef} />}
      {/* {isLoadingNews && <div>LOADING</div>} */}
    </div>
  );
};
