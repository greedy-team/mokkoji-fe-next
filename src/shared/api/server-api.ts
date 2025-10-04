import ky from 'ky';

const serverApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  fetch: (input, init) =>
    fetch(input, {
      ...init,
      cache: 'force-cache',
      next: { revalidate: 3000 },
    }),
});

export default serverApi;
