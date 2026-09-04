import ErrorPage from '@/entities/error/ui/error-page';

export default function NotFound() {
  return (
    <ErrorPage
      statusCode={404}
      title="지원하지 않는 학교예요"
      message="입력하신 학교 주소를 찾을 수 없어요. 주소를 다시 확인해주세요."
      showHomeButton={false}
    />
  );
}
