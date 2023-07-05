import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

//styles
import './styles.scss';
//components
import {
  AssetCharacteristics,
  AssetInfo,
  AssetMetatags,
  ProfilePersonalInfo,
  ShareButton,
  UniversityCard,
} from '../../components';
//constants
import { assetsDescription, universitiesSlider } from '../../constants';
//axios
import axiosApiInstance from '../../api/axios';
//assets
import {
  historyFrozenIcon,
  historyMintedIcon,
  historyTranferredIcon,
} from '../../assets/icons';

export type AssetInfoType = {
  assetCid: string;
  assetId: number;
  assetUrl: string;
  cid: string;
  createdAt?: string;
  finalizedAt?: string;
  id: number;
  isFinalized: boolean;
  metadataCid: string;
  metadataUrl: string;
  mintedFrom: string;
  mintedTo: string;
  network: string;
  ogPreviewUrl: string;
  previewCid: string;
  previewUrl: string;
  protocol: string;
  shareUrl: string;
  studentId: number;
  txHash: string;
  userAssetId: number;
  userId: number;
};

type AssetNetadataAtribute = {
  display_type?: string;
  trait_type: string;
  value: string;
};

export type AssetMetadataType = {
  animation_type: string;
  animation_url: string;
  attributes: AssetNetadataAtribute[];
  background_color: string;
  description: string;
  external_url: string;
  image: string;
  name: string;
};

export const Asset = () => {
  let { id } = useParams();
  const [assetInfo, setAssetInfo] = useState<AssetInfoType | null>(null);
  const [assetMetadata, setAssetMetadata] = useState<AssetMetadataType | null>(
    null
  );

  const getAssetInfo = async (id: string) => {
    try {
      const { data } = await axiosApiInstance.get(
        `private/user/studio/nfts/get/by/id/${id}`
      );
      console.log('getAssetInfo data', data);
      if (data?.success) {
        setAssetInfo(data?.data);
      }
    } catch (e: any) {
      console.log('getAssetInfo error', e);
    }
  };

  useEffect(() => {
    if (id) {
      getAssetInfo(id);
    }
  }, [id]);

  const getAssetMetadata = async (url: string) => {
    try {
      const data = await axios.get(url);
      console.log('getAssetMetadata data', data?.data);
      if (data?.status === 200) {
        setAssetMetadata(data?.data);
      }
    } catch (e: any) {
      console.log('getAssetMetadata error', e);
    }
  };

  useEffect(() => {
    if (assetInfo?.metadataUrl) {
      getAssetMetadata(assetInfo?.metadataUrl);
    }
  }, [assetInfo]);

  const assetsDescription = useMemo(
    () => [
      {
        data: [
          {
            title: `By ${assetMetadata?.name}`,
            text: assetMetadata?.description,
            full: true,
          },
        ],
      },
      // {
      //   data: [
      //     {
      //       title: 'Table',
      //       type: 'table',
      //       tableData: [
      //         {
      //           name: (
      //             <>
      //               <img src={historyMintedIcon} /> Minted
      //             </>
      //           ),
      //           from: 'immyoutable',
      //           to: 'wallet address@example.com',
      //           date: '5 mo ago',
      //         },
      //         {
      //           name: (
      //             <>
      //               <img src={historyFrozenIcon} /> Frozen
      //             </>
      //           ),
      //           from: 'immyoutable',
      //           to: 'wallet address@example.com',
      //           date: '5 mo ago',
      //         },
      //         {
      //           name: (
      //             <>
      //               <img src={historyTranferredIcon} /> Transferred
      //             </>
      //           ),
      //           from: 'immyoutable',
      //           to: 'wallet address@example.com',
      //           date: '5 mo ago',
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
    [assetInfo, assetMetadata]
  );

  return (
    <>
      {/* <AssetMetatags id={id} /> */}
      <div className='profile profileAsset'>
        <div className='space-beetwen align-start'>
          <h2 className='profile__title'>Asset {assetMetadata?.name}</h2>
          <ShareButton shareUrl={assetInfo?.shareUrl} />
        </div>
        <div className='profileAsset__container'>
          <UniversityCard
            className='profileAsset__card'
            type='big'
            isNavigate={false}
            previewUrl={assetInfo?.previewUrl}
          />
          <div className='profileAsset__info'>
            <AssetInfo assetInfo={assetInfo} assetMetadata={assetMetadata} />
            <ProfilePersonalInfo title='Description' data={assetsDescription} />
            <AssetCharacteristics
              assetInfo={assetInfo}
              assetMetadata={assetMetadata}
            />
          </div>
        </div>
      </div>
    </>
  );
};
