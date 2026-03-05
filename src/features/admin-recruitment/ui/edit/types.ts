import { ClubRecruitments } from '@/entities/club-detail/model/type';

export type EditStep = 'selectPost' | 'basicInfo' | 'postinfo' | 'complete';

export interface EditFlowState {
  currentStep: EditStep;
  selectedPost?: ClubRecruitments;
  isSubmitting: boolean;
}
