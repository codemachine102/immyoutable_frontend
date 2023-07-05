import { useCallback, useState } from 'react';
//axios
import axiosApiInstance from '../../api/axios';
//types
import {
  SubsriptionPlanType,
  SocialMediaType,
  FAQType,
  PolicyType,
  TermsType,
} from './types';
//helpers
import {} from '../../api/helpers';

export function useCommonProvider() {
  const [subscriptionPlans, setSubscriptionPlans] = useState<
    SubsriptionPlanType[] | null
  >(null);
  const [socialMedia, setSocialMedia] = useState<SocialMediaType[] | null>(
    null
  );
  const [faq, setFaq] = useState<FAQType[] | null>(null);
  const [policy, setPolicy] = useState<PolicyType | null>(null);
  const [terms, setTerms] = useState<TermsType | null>(null);

  const getSubsriptionsPlans = useCallback(async () => {
    try {
      const { data } = await axiosApiInstance.get(
        'public/data/subscription-plans/get/all'
      );
      // console.log('getSubsriptionsPlans data', data);
      if (data?.success) {
        setSubscriptionPlans(data?.data);
      }
    } catch (e) {
      console.log('getSubsriptionsPlans error', e);
    }
  }, [setSubscriptionPlans]);

  const getSocialMedia = useCallback(async () => {
    try {
      const { data } = await axiosApiInstance.get(
        'public/data/social-media/get/all'
      );
      // console.log('getSocialMedia data', data);
      if (data?.success) {
        setSocialMedia(data?.data);
      }
    } catch (e) {
      console.log('getSocialMedia error', e);
    }
  }, [setSocialMedia]);

  const getFaq = useCallback(async () => {
    try {
      const { data } = await axiosApiInstance.get('public/data/faq/get/all');
      // console.log('getFaq data', data);
      if (data?.success) {
        setFaq(data?.data);
      }
    } catch (e) {
      console.log('getFaq error', e);
    }
  }, [setFaq]);

  const getPolicy = useCallback(async () => {
    try {
      const { data } = await axiosApiInstance.get(
        'public/data/privacy-policy/get/all/?offset=0&limit=30&order=asc'
      );
      // console.log('getPolicy data', data);
      if (data?.success) {
        setPolicy(data?.data);
      }
    } catch (e) {
      console.log('getPolicy error', e);
    }
  }, [setPolicy]);

  const getTerms = useCallback(async () => {
    try {
      const { data } = await axiosApiInstance.get(
        'public/data/terms-and-conditions/get/all/?offset=0&limit=30&order=asc'
      );
      // console.log('getTerms data', data);
      if (data?.success) {
        setTerms(data?.data);
      }
    } catch (e) {
      console.log('getTerms error', e);
    }
  }, [setTerms]);

  const contactUs = async (values: any) => {
    try {
      const { data } = await axiosApiInstance.post(
        'public/contact-us/request/',
        { ...values, formData: true }
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
    subscriptionPlans,
    getSubsriptionsPlans,
    socialMedia,
    getSocialMedia,
    faq,
    getFaq,
    policy,
    getPolicy,
    terms,
    getTerms,
    contactUs,
  };
}
