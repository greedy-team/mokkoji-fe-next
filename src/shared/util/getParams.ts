import { DetailParams } from '../model/type';

async function getParams({ params }: DetailParams) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  return { id };
}
export default getParams;
