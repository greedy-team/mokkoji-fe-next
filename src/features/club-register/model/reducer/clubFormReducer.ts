import validateField from '../../util/validateField';
import { ClubFormData } from '../type';

type Action =
  | { type: 'UPDATE_FIELD'; name: keyof ClubFormData; value: string }
  | { type: 'UPDATE_LOGO'; file: File }
  | { type: 'RESET_FORM' };

type State = {
  formData: ClubFormData;
  errors: Partial<Record<keyof ClubFormData, string>>;
};

export const initialState: State = {
  formData: {
    name: '',
    category: '',
    affiliation: '',
    description: '',
    leaderId: '',
    instagram: '',
    logo: undefined,
  },
  errors: {},
};

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_FIELD': {
      const { name, value } = action;
      const errorMsg = validateField(name, value);
      return {
        ...state,
        formData: { ...state.formData, [name]: value },
        errors: { ...state.errors, [name]: errorMsg },
      };
    }
    case 'UPDATE_LOGO': {
      return {
        ...state,
        formData: { ...state.formData, logo: action.file },
      };
    }
    case 'RESET_FORM': {
      return initialState;
    }
    default:
      return state;
  }
}
