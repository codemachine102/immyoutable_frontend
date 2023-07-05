import { useContext } from 'react';
import { AuthContext } from './auth/context';
import { DesignContext } from './design/context';
import { MetamaskContext } from './metamask/context';
import { CommonContext } from './common/context';
import { ProfileContext } from './profile/context';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useDesign = () => {
  return useContext(DesignContext);
};

export const useMetamask = () => {
  return useContext(MetamaskContext);
};

export const useCommon = () => {
  return useContext(CommonContext);
};

export const useProfile = () => {
  return useContext(ProfileContext);
};

export { AppContextProvider } from './AppContextProvider';
