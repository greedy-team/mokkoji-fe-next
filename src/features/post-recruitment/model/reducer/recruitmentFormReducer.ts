import validateField from '../../util/validateField';
import { Action, StateProp } from '../type';

export const initialState: StateProp = {
  formData: {
    title: '',
    imageUrls: [],
    content: '',
    recruitStart: '',
    recruitEnd: '',
    recruitForm: '',
  },
  errors: {},
};

export default function reducer(state: StateProp, action: Action): StateProp {
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
