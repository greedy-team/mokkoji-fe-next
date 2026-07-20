import ky from 'ky';

const clientApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_BASE_URL,
  hooks: {
    beforeRequest: [
      () => {
        if (typeof window === 'undefined') {
          throw new Error('clientApi is not available on the server');
        }
      },
    ],
  },
});

export default clientApi;
