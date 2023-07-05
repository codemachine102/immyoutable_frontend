import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, optimism, polygon, fantomTestnet } from 'wagmi/chains';

import './index.css';
import App from './App';
//context
import { AppContextProvider } from './context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, optimism, polygon, fantomTestnet],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

root.render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
    <WagmiConfig client={client}>
      <AppContextProvider>
        <BrowserRouter>
          <Suspense>
            <App />
          </Suspense>
        </BrowserRouter>
      </AppContextProvider>
    </WagmiConfig>
  </GoogleOAuthProvider>
  // </React.StrictMode>
);
