import React from 'react';

import { useAuthProvider } from './useAuthProvider';
//types
import {
  SignInUserType,
  SignUpUserType,
  EmailVerificationVerifyType,
  AccessRecoveryVerifyType,
  SessionType,
  ChangePasswordType,
  UserSubscriptionPlanType,
  UpdateProfileType,
  UpdateProfileImageType,
  UserProfileType,
} from './types';
import { ResponseType } from '../types';

export interface AuthState {
  initLoadingToken: boolean;
  initLoading: boolean;
  userProfile: UserProfileType | null;
  signIn: (user: SignInUserType) => Promise<ResponseType>;
  signInGoogle: (credential: any) => Promise<ResponseType>;
  signUp: (user: SignUpUserType) => Promise<ResponseType>;
  logOut: (session?: SessionType) => Promise<ResponseType>;
  token: string | null;
  isFirstLogin: boolean;
  emailVerificationRequest: (email: string) => Promise<ResponseType>;
  emailVerificationVerify: (
    data: EmailVerificationVerifyType
  ) => Promise<ResponseType>;
  accessRecoveryRequest: (email: string) => Promise<ResponseType>;
  accessRecoveryVerify: (
    data: AccessRecoveryVerifyType
  ) => Promise<ResponseType>;
  changePassword: (data: ChangePasswordType) => Promise<ResponseType>;
  verifyPhone: (token: string) => Promise<ResponseType>;
  userSubscrPlan: UserSubscriptionPlanType | null;
  updateProfile: (data: UpdateProfileType) => Promise<ResponseType>;
  updateProfileImage: (data: UpdateProfileImageType) => Promise<ResponseType>;
  getUserFn: (access?: string) => Promise<void>;
  emailChangeRequest: (newEmail: string) => Promise<ResponseType>;
  emailChangeVerify: (
    data: EmailVerificationVerifyType
  ) => Promise<ResponseType>;
}

export const AuthContext = React.createContext<AuthState>(null!);

interface AuthProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProps) => {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
