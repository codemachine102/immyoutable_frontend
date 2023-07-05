export interface SignInUserType {
  email: string;
  password: string;
}

export interface SignUpUserType {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  phone: string;
  agreement: boolean;
}

export interface EmailVerificationVerifyType {
  email?: string | null;
  code?: string | null;
}

export interface AccessRecoveryVerifyType {
  email?: string | null;
  code?: string | null;
  password: string;
  passwordConfirm: string;
}

export interface ChangePasswordType {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export type SessionType = 'current' | 'all' | 'all-other';

export interface UserType {
  id: number;
  image: string;
  email: string;
  isEmailVerified: boolean;
  phone: string;
  isPhoneVerified: boolean;
  firstName: string;
  lastName: string;
  nickname: string;
  lang: string;
  role: string;
  birthdate: string;
  isIdentityVerified: boolean;
  isIdentityRejected: boolean;
  identityRejectionReason: any;
  _identityRejectionReason: string;
  isIdentityPending: boolean;
  isFirstLogin: boolean;
  bio?: string;
}
export interface StudentType {
  academicHonors: string;
  bio: string;
  class: string;
  dateOfIssue: string;
  degree: string;
  degreeVerifiedAt?: any;
  gradYear: string;
  id: number;
  idvId: string;
  isAlumni: boolean;
  isDegreeVerified: boolean;
  isVerifiedPending: boolean;
  majors?: string[];
  name: string;
  universityId?: any;
  verifiedPendingAt?: any;
}
export interface UniversityType {
  id: number;
  image: string;
  name: string;
}

export interface UserProfileType {
  user: UserType | null;
  student: StudentType | null;
  university: UniversityType | null;
}

export interface UserSubscriptionPlanType {
  id: number;
  subscriptionPlanId: number;
  renewalAt: any;
  isPaid: boolean;
  paidAt: any;
  isCanceled: boolean;
  canceledAt: any;
  subscriptionPlan: {
    id: number;
    plan: string;
    price: number;
  };
}

export interface UpdateProfileType {
  nickname?: string;
  bio?: string;
}

export interface UpdateProfileImageType {
  image: File;
}
