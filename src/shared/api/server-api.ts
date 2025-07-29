import ky from 'ky';
import ErrorMessage from '../lib/error-message';

const serverApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeError: [
      async (error) => {
        ErrorMessage(error);
        return error;
      },
    ],
  },
});

export default serverApi;
