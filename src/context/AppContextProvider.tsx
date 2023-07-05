//utils
import { combineComponents } from '../utils';
//contexts
import { CommonProvider } from './common/context';
import { AuthProvider } from './auth/context';
import { DesignProvider } from './design/context';
import { MetamaskProvider } from './metamask/context';
import { ProfileProvider } from './profile/context';

const providers = [
  CommonProvider,
  AuthProvider,
  DesignProvider,
  MetamaskProvider,
  ProfileProvider,
];

export const AppContextProvider: any = combineComponents(...providers);
