import { ErrorPage } from '@/entities/error/ui/error-page';

export default function NotFound() {
  return <ErrorPage statusCode={404} />;
}
