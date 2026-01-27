export type CreateStep = 'basicInfo' | 'postinfo' | 'complete';

export interface CreateFlowState {
  currentStep: CreateStep;
  isSubmitting: boolean;
}
