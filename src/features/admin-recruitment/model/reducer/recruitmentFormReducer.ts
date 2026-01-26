import getValidationError from '../../util/getValidationError';
import { Action, StateProp } from '../type';

export const initialState: StateProp = {
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
