import ky from 'ky';

// 백엔드가 presigned 서명에 Cache-Control을 포함시키므로 동일한 값을 보내지 않으면 S3가 403을 반환한다.
const IMAGE_CACHE_CONTROL = 'public, max-age=31536000, immutable';

const uploadToPresignedUrl = (presignedUrl: string, file: File) =>
  ky.put(presignedUrl, {
    body: file,
    headers: {
      'Content-Type': file.type,
      'Cache-Control': IMAGE_CACHE_CONTROL,
    },
  });

export default uploadToPresignedUrl;
