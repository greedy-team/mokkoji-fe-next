import { MetadataRoute } from 'next';
import { ApiResponse } from '@/shared/model/type';
import { ClubsResponse } from '@/widgets/club/model/type';
import serverApi from '@/shared/api/server-api';

const BASE_URL = 'https://www.mokkoji.site';

async function getAllClubIds(): Promise<number[]> {
  try {
    const firstResponse = await serverApi
      .get('clubs', {
        searchParams: { page: '0', size: '100' },
        next: { revalidate: 3600 },
      } as Parameters<typeof serverApi.get>[1])
      .json<ApiResponse<ClubsResponse>>();

    if (!firstResponse.data) return [];

    const { clubs, page } = firstResponse.data;
    const allIds = clubs.map((club) => club.id);

    const remainingPages = Array.from(
      { length: page.totalPages - 1 },
      (_, i) => i + 1,
    );

    const results = await Promise.all(
      remainingPages.map((pageNum) =>
        serverApi
          .get('clubs', {
            searchParams: { page: String(pageNum), size: '100' },
            next: { revalidate: 3600 },
          } as Parameters<typeof serverApi.get>[1])
          .json<ApiResponse<ClubsResponse>>(),
      ),
    );

    results.forEach((res) => {
      res.data?.clubs.forEach((club) => allIds.push(club.id));
    });

    return allIds;
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/club`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/support`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const clubIds = await getAllClubIds();
  const clubPages: MetadataRoute.Sitemap = clubIds.map((id) => ({
    url: `${BASE_URL}/club/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...clubPages];
}
