import type { Assessment } from './schema';

type FormValue<T> = T extends number ? number | string : T extends boolean ? boolean : T | null;

export type AssessmentFormValues = { [K in keyof Assessment]: FormValue<Assessment[K]> };

export const emptyAssessmentValues: AssessmentFormValues = {
  mrn: '',
  patientName: '',
  dateOfBirth: null,
  assessmentDate: null,
  mobility: null,
  barthelIndex: '',
  medicationCount: '',
  pharmacistReviewRequested: false,
  followUpDate: null,
  consentObtained: false,
};
