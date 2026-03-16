import getValidationError from '../../util/getValidationError';
import { ClubDescriptionFormAction, ClubDescriptionFormState } from '../type';

export const initialState: ClubDescriptionFormState = {
  formData: {
    name: '',
    category: '',
    affiliation: '',
    description: '',
    clubMasterStudentId: '',
    instagram: '',
    logo: '',
  },
  errors: {},
};

export default function clubDescriptionFormReducer(
  state: ClubDescriptionFormState,
  action: ClubDescriptionFormAction,
): ClubDescriptionFormState {
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
    case 'UPDATE_MULTIPLE_FIELDS': {
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };
    }
    case 'RESET_FORM': {
      return initialState;
    }
    default:
      return state;
  }
}
