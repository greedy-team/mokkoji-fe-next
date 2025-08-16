import ky from 'ky';

const serverApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
});

export default serverApi;
