import React, { FC, HTMLAttributes, useEffect } from 'react';
import cn from 'classnames';
import ContentLoader from 'react-content-loader';

//styles
import './styles.scss';
//components
import { Button } from '../../Button';
//context
import { useDesign } from '../../../context';

interface DesignLogosProps extends HTMLAttributes<HTMLDivElement> {}

export const DesignLogos: FC<DesignLogosProps> = ({ className }) => {
  const design = useDesign();

  useEffect(() => {
    if (design.logosCount === null && !design.logosLoading) {
      design.getAllLogos();
    }
  }, [design.logosCount, design.logosLoading]);

  return (
    <>
      <div className={cn('designLogos', className)}>
        {!design.logosLoading ? (
          design.logos.map((logo, index) => (
            <div
              key={`designLogo-${logo.id}-${index}`}
              className='designLogos__logo'
              onClick={() => design.chooseLogo(logo)}
            >
              <img src={logo?.image} alt='Design Logo' />
            </div>
          ))
        ) : (
          <>
            <DesignColorLoader />
            <DesignColorLoader />
            <DesignColorLoader />
          </>
        )}
      </div>
      {/* {!design.logosLoading && (
        <Button
          buttonType='text'
          text='Report missing logo'
          className='designLogos__btn'
        />
      )} */}
    </>
  );
};

const DesignColorLoader = () => {
  return (
    <ContentLoader
      speed={3}
      backgroundColor='#69778b'
      foregroundColor='#f4f6f8'
      className='designLogos__loader'
    >
      <rect x='50%' y='0' rx='8' ry='8' className='designLogos__loaderCircle' />
    </ContentLoader>
  );
};
