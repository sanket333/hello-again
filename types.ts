
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  NOSAY = 'nosay'
}

export enum AffiliationType {
  SCHOOL = 'school',
  UNIVERSITY = 'university',
  WORK = 'work',
  ORGANIZATION = 'organization',
  OTHER = 'other'
}

export interface Affiliation {
  id: string;
  type: AffiliationType;
  name: string;
  startYear: string;
  endYear: string;
  isCurrent: boolean;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  gender: Gender | null;
  bio: string;
  interests: string[];
  avatar: string;
  dob: string;
  affiliations: Affiliation[];
}

export enum OnboardingStep {
  IDENTITY = 0,
  GENDER = 1,
  PERSONAL = 2,
  AFFILIATION_ENTRY = 3,
  JOURNEY = 4,
  SUCCESS = 5
}
