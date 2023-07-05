import React, { FC, HTMLAttributes } from 'react';
import { AssetInfoType, AssetMetadataType } from '../../../pages/Profile/Asset';

//styles
import './styles.scss';

interface AssetInfoProps extends HTMLAttributes<HTMLDivElement> {
  assetInfo?: AssetInfoType | null;
  assetMetadata?: AssetMetadataType | null;
}

export const AssetInfo: FC<AssetInfoProps> = ({ assetInfo, assetMetadata }) => {
  const getAttributeValue = (name: string) => {
    return assetMetadata?.attributes?.find((el) => el.trait_type === name)
      ?.value;
  };

  return (
    <div className='assetInfo'>
      <p className='assetInfo__university'>{getAttributeValue('University')}</p>
      <h3 className='assetInfo__subtitle'>
        <span>{getAttributeValue('Student Name')}</span>{' '}
        <span className='assetInfo__subtitleDash'>-</span>{' '}
        <span>Class of {getAttributeValue('Class Of')}</span>
      </h3>
      <div className='assetInfo__owned'>
        Owned by{' '}
        <a href={assetInfo?.mintedTo}>
          {assetInfo?.mintedTo?.split('/')?.pop()}
        </a>
      </div>
    </div>
  );
};
