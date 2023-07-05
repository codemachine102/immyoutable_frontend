export interface SubsriptionPlanType {
  id: number;
  plan: string;
  price: number;
  subscriptionPlanInfos: any[];
  note: string;
  priceAfter: number;
}

export interface SocialMediaType {
  image: string;
  id: number;
  name: 'Facebook' | 'Twitter' | 'Instagram';
  link: string;
}

export interface FAQType {
  id: number;
  question: string;
  answer: string;
}

export interface PolicyType {
  id: number;
  sectionTitle: string;
  privacyPolicyItems: PolicyItemType[];
}

export interface PolicyItemType {
  id: number;
  itemTitle: string;
  itemText: string;
}

export interface TermsType {
  id: number;
  sectionTitle: string;
  termsAndConditionsItems: TermsItemType[];
}

export interface TermsItemType {
  id: number;
  itemTitle: string;
  itemText: string;
}
