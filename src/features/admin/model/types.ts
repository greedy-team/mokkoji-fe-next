export type ContentType = 'recruitment' | 'description';
export type ActionType = 'create' | 'edit';
export type Step = 'selectClub' | 'postType' | 'editMode';

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
  isReadyToRedirect?: boolean;
}
