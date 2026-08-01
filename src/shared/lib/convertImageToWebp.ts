export const LOGO_MAX_DIMENSION = 256;
export const RECRUITMENT_IMAGE_MAX_DIMENSION = 1200;

const WEBP_QUALITY = 0.8;

async function convertImageToWebp(
  file: File,
  maxDimension: number,
): Promise<File> {
  if (file.type === 'image/webp') return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(
      1,
      maxDimension / Math.max(bitmap.width, bitmap.height),
    );

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);

    const context = canvas.getContext('2d');
    if (!context) return file;

    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/webp', WEBP_QUALITY);
    });

    // webp 인코딩을 지원하지 않는 브라우저는 toBlob이 png를 대신 반환한다
    if (!blob || blob.type !== 'image/webp') return file;

    return new File([blob], `${file.name.replace(/\.[^.]+$/, '')}.webp`, {
      type: 'image/webp',
    });
  } catch {
    return file;
  }
}

export default convertImageToWebp;
