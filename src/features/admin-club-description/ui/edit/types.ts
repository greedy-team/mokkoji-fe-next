export type EditStep = 'basicInfo' | 'description' | 'complete';

export interface EditFlowState {
  currentStep: EditStep;
  isSubmitting: boolean;
}
