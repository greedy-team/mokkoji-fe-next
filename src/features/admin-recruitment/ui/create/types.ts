export type CreateStep = 'basicInfo' | 'postInfo' | 'complete';

export interface CreateFlowState {
  currentStep: CreateStep;
  isSubmitting: boolean;
}
