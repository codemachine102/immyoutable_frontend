import React from 'react';

import { useCommonProvider } from './useCommonProvider';
//types
import {
  FAQType,
  PolicyType,
  SocialMediaType,
  SubsriptionPlanType,
  TermsType,
} from './types';
import { ResponseType } from '../types';

export interface CommonState {
  subscriptionPlans: SubsriptionPlanType[] | null;
  getSubsriptionsPlans: () => Promise<void>;
  socialMedia: SocialMediaType[] | null;
  getSocialMedia: () => Promise<void>;
  faq: FAQType[] | null;
  getFaq: () => Promise<void>;
  policy: PolicyType | null;
  getPolicy: () => Promise<void>;
  terms: TermsType | null;
  getTerms: () => Promise<void>;
  contactUs: (values: any) => Promise<ResponseType>;
}

export const CommonContext = React.createContext<CommonState>(null!);

interface CommonProps {
  children: React.ReactNode;
}

export const CommonProvider = ({ children }: CommonProps) => {
  const common = useCommonProvider();

  return (
    <CommonContext.Provider value={common}>{children}</CommonContext.Provider>
  );
};
