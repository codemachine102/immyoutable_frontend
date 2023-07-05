import { useCallback, useEffect, useState } from 'react';
//axios
import axiosApiInstance from '../../api/axios';
//types
import {
  AccessRecoveryVerifyType,
  ChangePasswordType,
  EmailVerificationVerifyType,
  SessionType,
  SignInUserType,
  SignUpUserType,
  UpdateProfileImageType,
  UpdateProfileType,
  UserProfileType,
  UserSubscriptionPlanType,
} from './types';
//helpers
import {
  getStorageAccessToken,
  setStorageAccessToken,
  setStorageRefreshToken,
  clearStorage,
} from '../../api/helpers';

export function useAuthProvider() {
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const [initLoadingToken, setInitLoadingToken] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isFirstLogin, setIsFirstLogin] = useState<boolean>(false);
  const [userSubscrPlan, setUserSubscrPlan] =
    useState<UserSubscriptionPlanType | null>(null);

  const signIn = async (signInUser: SignInUserType) => {
    try {
      // console.log('newUser', signInUser);
      const { data } = await axiosApiInstance.post('public/login', {
        ...signInUser,
      });
      // console.log('signIn data', data);

      setIsFirstLogin(data.data.isFirstLogin);
      setStorageAccessToken(data.data.accessToken);
      setToken(data.data.accessToken);
      setStorageRefreshToken(data.data.refreshToken);
      return { err: false, data: data };
    } catch (e: any) {
      console.log('signIn error', e);
      return {
        err: true,
        data: e?.response?.data?.message || 'Server Error',
      };
    }
  };

  const signInGoogle = async (credential: any) => {
    try {
      // console.log('newUser', signInUser);
      const { data } = await axiosApiInstance.post(
        'public/services/auth/third-party/google/login/',
        { credential }
      );
      console.log('signInGoogle data', data);

      setIsFirstLogin(data.data?.isFirstLogin);
      setStorageAccessToken(data.data?.accessToken);
      setToken(data.data?.accessToken);
      setStorageRefreshToken(data.data?.refreshToken);
      return { err: false, data: data };
    } catch (e: any) {
      console.log('signInGoogle error', e);
      return {
        err: true,
        data: e?.response?.data?.message || 'Server Error',
      };
    }
  };

  const signUp = async (signUpUser: SignUpUserType) => {
    try {
      // console.log('signUp signUpUser', signUpUser);
      const { data } = await axiosApiInstance.post('public/sign-up', {
        ...signUpUser,
      });

      // console.log('signUp data', data);

      return { err: false, data: data };
    } catch (e: any) {
      console.log('signUp error', e);
      return {
        err: true,
        data: e?.response?.data?.message || 'Server Error',
      };
    }
  };

  const logOut = useCallback(
    async (session: SessionType = 'current') => {
      try {
        const { data } = await axiosApiInstance.post('private/common/logout', {
          session: session,
        });

        setUserProfile(null);
        setUserSubscrPlan(null);
        setToken(null);
        clearStorage();
        return { err: false, data: data };
      } catch (e: any) {
        setUserProfile(null);
        setUserSubscrPlan(null);
        setToken(null);
        clearStorage();
        return {
          err: true,
          data: e?.response?.data?.message || 'Server Error',
        };
      }
    },
    [setUserProfile, setUserSubscrPlan]
  );

  const emailVerificationRequest = async (email: string) => {
    try {
      const { data } = await axiosApiInstance.post(
        'public/common/email-verification/request',
        {
          email: email,
        }
      );

      return { err: false, data: data };
    } catch (e: any) {
      return {
        err: true,
        data: e?.response?.data?.message || 'Server Error',
      };
    }
  };

  const emailVerificationVerify = async (
    verifyData: EmailVerificationVerifyType
  ) => {
    try {
      // console.log('verifyData', verifyData);

      const { data } = await axiosApiInstance.post(
        'public/common/email-verification/verify',
        verifyData
      );

      return { err: false, data: data };
    } catch (e: any) {
      return {
        err: true,
        data: e?.response?.data?.message || 'Server Error',
      };
    }
  };

  const accessRecoveryRequest = async (email: string) => {
    try {
      const { data } = await axiosApiInstance.post(
        'public/common/access-recovery/request',
        {
          email: email,
        }
      );

      return { err: false, data: data };
    } catch (e: any) {
      return {
        err: true,
        data: e?.response?.data?.message || 'Server Error',
      };
    }
  };

  const accessRecoveryVerify = async (verifyData: AccessRecoveryVerifyType) => {
    try {
      const { data } = await axiosApiInstance.post(
        'public/common/access-recovery/verify',
        verifyData
      );

      return { err: false, data: data };
    } catch (e: any) {
      return {
        err: true,
        data: e?.response?.data?.message || 'Server Error',
      };
    }
  };

  const changePassword = async (changeData: ChangePasswordType) => {
    try {
      const { data } = await axiosApiInstance.post(
        'private/user/settings/security/password/change',
        changeData
      );

      return { err: false, data: data };
    } catch (e: any) {
      return {
        err: true,
        data: e?.response?.data?.message || 'Server Error',
      };
    }
  };

  const verifyPhone = async (token: string) => {
    try {
      const { data } = await axiosApiInstance.post(
        'private/user/settings/security/phone/verify',
        { token: token }
      );

      return { err: false, data: data };
    } catch (e: any) {
      return {
        err: true,
        data: e?.response?.data?.message || 'Server Error',
      };
    }
  };

  const getToken = useCallback(async () => {
    setInitLoadingToken(true);
    const accessToken = await getStorageAccessToken();
    setToken(accessToken);
    setInitLoadingToken(false);
  }, []);

  const getUserFn = useCallback(
    async (access?: string) => {
      const { data } = await axiosApiInstance.get('private/user/profile/get/', {
        // token: access,
      });
      console.log('getUserFn data', data);
      if (data?.data) {
        setUserProfile(data?.data);
      }
    },
    [setUserProfile]
  );

  const getUserSubsriptionPlan = useCallback(async () => {
    try {
      const { data } = await axiosApiInstance.get(
        'private/user/subscription-plan/current/get'
      );
      // console.log('getUserSubsriptionPlan data', data);
      if (data?.success) {
        setUserSubscrPlan(data?.data);
      }
    } catch (e) {
      console.log('getUserSubsriptionPlan error', e);
    }
  }, [setUserSubscrPlan]);

  const initUser = useCallback(async () => {
    try {
      if (!userProfile) {
        await getUserFn();
      }
      if (!userSubscrPlan) {
        await getUserSubsriptionPlan();
      }
      setInitLoading(false);
    } catch (e) {
      setInitLoading(false);
      logOut();
    }
  }, [getUserFn, getUserSubsriptionPlan, logOut, userProfile, userSubscrPlan]);

  useEffect(() => {
    let mounted = true;
    setInitLoading(true);
    if (mounted && token) {
      // console.log('HEEEEELLLLOOO');
      initUser();
    } else {
      setInitLoading(false);
      setUserProfile(null);
    }
    return () => {
      mounted = false;
    };
  }, [token]);

  useEffect(() => {
    getToken();
  }, [getToken]);

  const updateProfile = async (updateDate: UpdateProfileType) => {
    try {
      const { data } = await axiosApiInstance.post(
        'private/user/profile/update/',
        { ...updateDate }
      );
      return { err: false, data: data };
    } catch (e: any) {
      return {
        err: true,
        data: e?.response?.data?.message || 'Server Error',
      };
    }
  };

  const updateProfileImage = async (updateDate: UpdateProfileImageType) => {
    try {
      const { data } = await axiosApiInstance.post(
        'private/user/profile/image/update/',
        { ...updateDate, formData: true }
      );
      return { err: false, data: data };
    } catch (e: any) {
      return {
        err: true,
        data: e?.response?.data?.message || 'Server Error',
      };
    }
  };

  const emailChangeRequest = async (newEmail: string) => {
    try {
      const { data } = await axiosApiInstance.post(
        'private/user/settings/security/email/change/request',
        { newEmail }
      );

      return { err: false, data: data };
    } catch (e: any) {
      return {
        err: true,
        data: e?.response?.data?.message || 'Server Error',
      };
    }
  };

  const emailChangeVerify = async (verifyData: EmailVerificationVerifyType) => {
    try {
      // console.log('verifyData', verifyData);

      const { data } = await axiosApiInstance.post(
        'public/common/email-change/verify',
        verifyData
      );

      return { err: false, data: data };
    } catch (e: any) {
      return {
        err: true,
        data: e?.response?.data?.message || 'Server Error',
      };
    }
  };

  return {
    initLoadingToken,
    initLoading,
    userProfile,
    token,
    isFirstLogin,
    signIn,
    signInGoogle,
    signUp,
    logOut,
    emailVerificationRequest,
    emailVerificationVerify,
    accessRecoveryRequest,
    accessRecoveryVerify,
    changePassword,
    verifyPhone,
    userSubscrPlan,
    updateProfile,
    updateProfileImage,
    getUserFn,
    emailChangeRequest,
    emailChangeVerify,
  };
}
