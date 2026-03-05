import ky from 'ky';

const serverApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  fetch: (input, init) =>
    fetch(input, {
      ...init,
      cache: 'no-store',
    }),
});

export default serverApi;
