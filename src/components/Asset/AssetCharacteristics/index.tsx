import React, { FC, HTMLAttributes, useCallback, useMemo } from 'react';

//styles
import './styles.scss';
//assets
import { polygonAssetIcon, snowflakeAssetIcon } from '../../../assets/icons';
//types
import { AssetInfoType, AssetMetadataType } from '../../../pages/Profile/Asset';
//utils
import { formatDateMDY } from '../../../utils';

const assetCharData = [
  {
    title: 'School',
    text: 'High Point University',
  },
  {
    title: 'Degree',
    text: "Bachelor's in Business Administration",
  },
  {
    title: 'Class',
    text: '2020',
  },
  {
    title: 'Date of issue',
    text: '02/01/2023',
  },
  {
    title: 'Chain',
    text: (
      <>
        <img
          src={polygonAssetIcon}
          className='assetCharacteristics__itemImg'
          alt='Polygon'
        />
        Polygon
      </>
    ),
  },
  {
    title: 'Metadata',
    text: (
      <>
        <img
          src={snowflakeAssetIcon}
          className='assetCharacteristics__itemImg'
          alt='Snowflake'
        />
        Frozen
      </>
    ),
  },
];

interface AssetCharacteristicsProps extends HTMLAttributes<HTMLDivElement> {
  assetInfo?: AssetInfoType | null;
  assetMetadata?: AssetMetadataType | null;
}

export const AssetCharacteristics: FC<AssetCharacteristicsProps> = ({
  assetInfo,
  assetMetadata,
}) => {
  const getAttributeValue = useCallback(
    (name: string) => {
      const attribute = assetMetadata?.attributes?.find(
        (el) => el.trait_type === name
      );
      return attribute?.value;
    },
    [assetMetadata]
  );

  const assetCharData = useMemo(
    () => [
      {
        title: 'School',
        text: getAttributeValue('University'),
      },
      {
        title: 'Degree',
        text: `${getAttributeValue('Degree') || ''}'s in ${
          getAttributeValue('Majors') || ''
        }`,
      },
      {
        title: 'Class',
        text: getAttributeValue('Class Of'),
      },
      {
        title: 'Date of issue',
        text:
          assetInfo?.createdAt && formatDateMDY(new Date(assetInfo?.createdAt)),
      },
      {
        title: 'Chain',
        text: (
          <>
            <img
              src={polygonAssetIcon}
              className='assetCharacteristics__itemImg'
              alt='Polygon'
            />
            {assetInfo?.network}
          </>
        ),
      },
      {
        title: 'Metadata',
        text: assetInfo?.isFinalized ? (
          <>
            <img
              src={snowflakeAssetIcon}
              className='assetCharacteristics__itemImg'
              alt='Snowflake'
            />
            Frozen
          </>
        ) : (
          <>Not Frozen</>
        ),
      },
    ],
    [assetInfo, assetMetadata]
  );

  return (
    <div className='assetCharacteristics'>
      <h3 className='profile__subtitle'>Characteristics</h3>
      <div className='assetCharacteristics__container'>
        {assetCharData.map((el, index) => (
          <div
            className='assetCharacteristics__item'
            key={`assetCharacteristics__item-${index}`}
          >
            <h4>{el.title}</h4>
            <p>{el.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
