export type ContentType = 'recruitment' | 'description';
export type ActionType = 'create' | 'edit';
export type Step = '1' | '2' | '3' | '4';

export interface AdminClubInfo {
  clubId: number;
  clubName: string;
}

export interface AdminFlowState {
  step: Step;
  selectedClubId?: number;
  selectedClubName?: string;
  contentType?: ContentType;
  actionType?: ActionType;
}

export interface StepProps {
  onNext: (data?: any) => void;
  onBack?: () => void;
}
