import {
  BloodGroup,
  Gender,
  MaritalStatus,
} from "../../../generated/prisma/enums";

export interface IUpdatePatientInfoPayload {
  name: string;
  profile: string;
  contactNumber: string;
  address: string;
}

export interface IUpdatePatientHealthDataPayload {
  gender: Gender;
  bloodGroup: BloodGroup;
  dateOfBirth: Date;
  hasAllergies: boolean;
  hasDiabetes: boolean;
  height: string;
  weight: string;
  smokingStatus: boolean;
  dietaryPreferences: string;
  pregnancyStatus: boolean;
  mentalHealthHistory: string;
  immunizationStatus: string;
  hasPastSurgeries: boolean;
  recentAnxiety: boolean;
  recentDepression: boolean;
  maritalStatus: MaritalStatus;
}

export interface IUpdatePatientMedicalReportPayload {
  reportName: string;
  reportLink: string;
  shouldDelete: boolean;
  reportId: string;
}

export interface IUpdatePatientProfilePayload {
  patientInfo: IUpdatePatientInfoPayload;
  patientHealthData: IUpdatePatientHealthDataPayload;
  medicalReports: IUpdatePatientMedicalReportPayload[];
}
