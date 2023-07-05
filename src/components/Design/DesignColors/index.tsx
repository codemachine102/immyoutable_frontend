import React, { FC, HTMLAttributes, useEffect } from 'react';
import cn from 'classnames';
import ContentLoader from 'react-content-loader';

//styles
import './styles.scss';
//context
import { useDesign } from '../../../context';
//hooks
import { useWindowSize } from '../../../hooks';
//constants
import { screenResolutions } from '../../../constants';

interface DesignColorsProps extends HTMLAttributes<HTMLDivElement> {}

export const DesignColors: FC<DesignColorsProps> = ({ className }) => {
  const design = useDesign();

  useEffect(() => {
    if (design.colorsCount === null && !design.colorsLoading) {
      design.getAllColors();
    }
  }, [design.colorsCount, design.colorsLoading]);

  return (
    <div className={cn('designColors', className)}>
      {!design.colorsLoading ? (
        design.colors &&
        design.colors.map((color, index) => (
          <div
            key={`designColor-${color.id}-${index}`}
            className='designColors__color'
            onClick={() => design.chooseColor(color)}
          >
            <div
              className='designColors__colorCircle'
              style={{
                background: `linear-gradient(90deg, ${color.gradient})`,
                // background: color.color,
              }}
            />
            <span className='designColors__colorTitle'>{color.title}</span>
          </div>
        ))
      ) : (
        <>
          <DesignColorLoader />
          <DesignColorLoader />
          <DesignColorLoader />
          <DesignColorLoader />
          <DesignColorLoader />
          <DesignColorLoader />
        </>
      )}
    </div>
  );
};

const DesignColorLoader = () => {
  const size = useWindowSize();

  const ishigherMD = size.width && size.width > screenResolutions.md;
  const ishigherSM = size.width && size.width > screenResolutions.sm;
  const ishigherXS = size.width && size.width > screenResolutions.xs;

  return (
    <ContentLoader
      speed={3}
      backgroundColor='#69778b'
      foregroundColor='#f4f6f8'
      className='designColors__loader'
    >
      <rect
        x='50%'
        y='0'
        rx='100'
        ry='100'
        className='designColors__loaderCircle'
      />
      <rect
        x='50%'
        y={ishigherMD ? '89' : ishigherSM ? '63' : ishigherXS ? '80' : '53'}
        rx='8'
        ry='8'
        className='designColors__loaderTitle'
      />
    </ContentLoader>
  );
};
