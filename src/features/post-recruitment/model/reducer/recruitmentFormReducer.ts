import validateField from '../../util/validateField';
import { RecruitmentFormAction, RecruitmentFormState } from '../type';

export const initialState: RecruitmentFormState = {
  formData: {
    title: '',
    imageNames: [],
    content: '',
    recruitStart: '',
    recruitEnd: '',
    recruitForm: '',
  },
  errors: {},
};

export default function recruitmentFormReducer(
  state: RecruitmentFormState,
  action: RecruitmentFormAction,
): RecruitmentFormState {
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
      const errorMsg = validateField(name, value as string);
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
