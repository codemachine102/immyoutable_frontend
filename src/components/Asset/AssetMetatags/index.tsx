import React, { FC, HTMLAttributes } from 'react';
import { Helmet } from 'react-helmet';

interface AssetMetatagsProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  image?: string;
}

export const AssetMetatags: FC<AssetMetatagsProps> = ({ id, image }) => (
  <Helmet>
    <title>Verified Immyoutable NFT - Own yourself</title>
    <meta
      property='og:url'
      content={`https://immyoutable-ui.3dmadcat.com/asset/${id}`}
    />
    <meta property='og:type' content='website' />
    <meta
      property='og:title'
      content='Verified Immyoutable NFT - Own yourself'
    />
    <meta
      property='og:description'
      content='Tokenize your credentials and build your digital identity'
    />
    <meta property='og:image' content={image} />

    <meta name='twitter:card' content='summary_large_image' />
    <meta property='twitter:domain' content='immyoutable-ui.3dmadcat.com' />
    <meta
      property='twitter:url'
      content={`https://immyoutable-ui.3dmadcat.com/asset/${id}`}
    />
    <meta
      name='twitter:title'
      content='Verified Immyoutable NFT - Own yourself'
    />
    <meta
      name='twitter:description'
      content='Tokenize your credentials and build your digital identity'
    />
    <meta name='twitter:image' content={image} />
  </Helmet>
);
