import { useCallback, useEffect, useState } from 'react';
import {
  useAccount,
  useConnect,
  useEnsName,
  useDisconnect,
  useBalance,
  // useContractRead,
  // useNetwork,
  useSignMessage,
} from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { mainnet, optimism, polygon, fantomTestnet } from 'wagmi/chains';
// import { BigNumber, ethers } from 'ethers';

//types
import { CryptoAccoutType } from './types';
//helpers
import {} from '../../api/helpers';
//context
import { useAuth } from '..';
//contract
// import { NFTCollectionABI } from '../../contracts';
//axios
import axiosApiInstance from '../../api/axios';

// const contractAddress = '0x45DB714f24f5A313569c41683047f1d49e78Ba07';

// export const injected = new InjectedConnector({
//   supportedChainIds: [1, 5, 42, 137, 1337, 4002],
// });

export function useMetamaskProvider() {
  const [cryptoAccountConnected, setCryptoAccountConnected] =
    useState<boolean>(false);
  const [cryptoAccount, setCryptoAccount] = useState<CryptoAccoutType | null>(
    null
  );
  const [cryptoAccountLoading, setCryptoAccountLoading] =
    useState<boolean>(true);
  const [challenge, setChallenge] = useState('');
  const auth = useAuth();

  //Account START
  const {
    address,
    isConnected: isAccountConnected,
    isConnecting: isAccountConnecting,
    isReconnecting: isAccountReconecting,
    status: accountStatus,
  } = useAccount({
    onConnect({ address, connector, isReconnected }) {
      // console.log('useAccount onConnect', address, connector, isReconnected);
    },
  });
  const { data: ensName } = useEnsName({
    address,
  });
  //Account END

  //Balance START
  const {
    data: balance,
    isError: isBalanceError,
    isLoading: isBalanceLoading,
    status: balanceStatus,
  } = useBalance({
    address: address,
  });
  //Balance END

  //Connect And Disconnect Wallet START
  const connector = new MetaMaskConnector({
    chains: [mainnet, optimism, polygon, fantomTestnet],
    options: {
      shimChainChangedDisconnect: false,
      UNSTABLE_shimOnConnectSelectAccount: true,
    },
  });
  const { connect } = useConnect({
    connector: connector,
  });
  const { disconnect, disconnectAsync } = useDisconnect({});

  const connectWallet = useCallback(async () => {
    try {
      // console.log('window', window.ethereum);

      if (!window.ethereum) {
        // alert('Please install Metamask');
        window.open('https://metamask.io/download/', '_blank', 'noreferrer');
        return;
      }
      await connect();
    } catch (e) {
      console.log('connectWallet error', e);
    }
  }, [connect]);

  const disconnectWallet = useCallback(async () => {
    try {
      disconnect();
    } catch (e) {
      console.log('disconnectWallet error', e);
    }
  }, [disconnect]);

  const disconnectAndDeleteWallet = useCallback(async () => {
    try {
      const data = await disconnectAsync();
      // console.log('disconnectAndDeleteWallet data', data);
      deleteWalletBack();
    } catch (e) {
      console.log('disconnectWallet error', e);
    }
  }, [disconnectAsync]);

  useEffect(() => {
    if (!auth.token && !auth.userProfile && !auth.initLoading) {
      disconnectWallet();
    }
  }, [auth.token, auth.userProfile, auth.initLoading, disconnectWallet]);
  //Connect And Disconnect Wallet END

  //Connect and Delete Wallet From Backend START
  const connectWalletBack = useCallback(async () => {
    try {
      // console.log('connectWalletBack');
      setChallenge('');
      const { data } = await axiosApiInstance.post(
        'private/user/crypto/accounts/challenge/request'
      );
      // console.log('connectWalletBack data', data);
      if (data?.success) {
        setChallenge(data?.data?.challenge);
        // getCryptoAccount();
      }
    } catch (e) {
      console.log('connectWalletBack error', e);
    }
  }, []);

  useEffect(() => {
    // console.log('Change of address', address);
    if (
      !!address &&
      isAccountConnected &&
      !cryptoAccountLoading &&
      !cryptoAccountConnected
    ) {
      // console.log('Change of address connectWalletBack');
      connectWalletBack();
    }
  }, [
    address,
    isAccountConnected,
    cryptoAccountLoading,
    cryptoAccountConnected,
    cryptoAccount,
  ]);

  const deleteWalletBack = useCallback(async () => {
    try {
      // console.log('deleteWalletBack');
      const { data } = await axiosApiInstance.post(
        'private/user/crypto/accounts/delete'
      );
      // console.log('deleteWalletBack data', data);
      if (data?.success) {
        setChallenge('');
        setCryptoAccount(null);
        setCryptoAccountConnected(false);
      }
    } catch (e) {
      console.log('deleteWalletBack error', e);
    }
  }, []);
  //Connect and Delete Wallet From Backend END

  //Sign Message START
  const { signMessageAsync } = useSignMessage({});

  const signMessage = useCallback(async () => {
    try {
      const data = await signMessageAsync({ message: challenge });
      // console.log('signMessage data', data);
      if (data) {
        verifySignedMessage(data);
      }
    } catch (e) {
      console.log('signMessage error', e);
    }
  }, [challenge]);

  const verifySignedMessage = useCallback(async (signature: string) => {
    try {
      const { data } = await axiosApiInstance.post(
        'private/user/crypto/accounts/challenge/verify',
        {
          signature,
        }
      );
      // console.log('verifySignedMessage data', data);
      if (data?.success) {
        getCryptoAccount();
      }
    } catch (e) {
      console.log('verifySignedMessage error', e);
    }
  }, []);

  useEffect(() => {
    // console.log('Change of challenge', challenge, cryptoAccount);
    if (
      !!challenge &&
      !!address &&
      !cryptoAccountLoading &&
      (!cryptoAccount?.isSigned || cryptoAccount?.address !== address) &&
      isAccountConnected
    ) {
      // console.log('Change of challenge signMessage');
      signMessage();
    }
  }, [
    challenge,
    address,
    cryptoAccountLoading,
    cryptoAccount,
    isAccountConnected,
  ]);
  //Sign Message END

  //Get Wallet From Backend START
  const getCryptoAccount = async () => {
    try {
      setCryptoAccountLoading(true);
      const { data } = await axiosApiInstance.get(
        'private/user/crypto/accounts/get'
      );
      console.log('getCryptoAccount data', data);
      if (data?.success) {
        setCryptoAccount(data?.data);
        setChallenge(data?.data?.challenge);
      }
      setCryptoAccountLoading(false);
      setCryptoAccountConnected(!!data?.success);
    } catch (e) {
      console.log('getCryptoAccount error', e);
      setCryptoAccountLoading(false);
      setCryptoAccountConnected(false);
    }
  };

  useEffect(() => {
    if (auth.token && auth.userProfile) {
      getCryptoAccount();
    }
  }, [auth.token, auth.userProfile]);
  //Get Wallet From Backend END

  return {
    address,
    isAccountConnected,
    isAccountConnecting,
    isAccountReconecting,
    accountStatus,
    balance,
    isBalanceError,
    isBalanceLoading,
    balanceStatus,
    ensName,
    connectWallet,
    disconnectWallet,
    disconnectAndDeleteWallet,
    cryptoAccount,
  };
}
