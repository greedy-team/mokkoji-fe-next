import getValidationError from '../../util/getValidationError';
import { AdminRecruitmentFormAction, AdminRecruitmentFormState } from '../type';

export const initialState: AdminRecruitmentFormState = {
  formData: {
    title: '',
    imageNames: [],
    content: '',
    recruitStart: '',
    recruitEnd: '',
    recruitForm: '',
    isAlwaysRecruiting: false,
  },
  errors: {},
};

export default function adminRecruitmentFormReducer(
  state: AdminRecruitmentFormState,
  action: AdminRecruitmentFormAction,
): AdminRecruitmentFormState {
  switch (action.type) {
    case 'UPDATE_FIELD': {
      const { name, value } = action;
      return {
        ...state,
        formData: { ...state.formData, [name]: value },
      };
    }
    case 'VALIDATE_FIELD': {
      const { name } = action;
      const value = state.formData[name];
      const errorMsg = getValidationError(name, value as string);
      return {
        ...state,
        errors: { ...state.errors, [name]: errorMsg },
      };
    }
    case 'RESET_FORM': {
      return initialState;
    }
    default:
      return state;
  }
}
