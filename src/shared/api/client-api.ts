import ky from 'ky';

const clientApi = ky.create({
  prefixUrl: '/',
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
