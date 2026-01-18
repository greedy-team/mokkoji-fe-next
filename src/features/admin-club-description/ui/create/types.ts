export type CreateStep = 'basicInfo' | 'complete';

export interface CreateFlowState {
  currentStep: CreateStep;
  isSubmitting: boolean;
}
