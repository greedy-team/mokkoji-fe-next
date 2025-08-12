import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import Link from 'next/link';

interface ScrollItemProps {
  title: string;
  description: string;
  logo?: string;
  id: number;
}

function ScrollItem({ title, description, logo, id }: ScrollItemProps) {
  return (
    <Link href={`/recruit/${id}`}>
      <div className="relative h-[30px] w-[62px] cursor-pointer rounded-2xl bg-[#F2F4F6] p-5 hover:bg-[#e8e8e8] lg:h-[120px] lg:h-[191px] lg:w-[250px] lg:w-[448px]">
        <div className="mb-2 flex flex-row items-center justify-between lg:mb-8">
          <div className="flex flex-row items-center gap-3">
            <Avatar className="size-6 lg:size-12">
              <AvatarImage src={logo} />
              <AvatarFallback>{title}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-sm font-bold lg:text-xl">{title}</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="w-[250px] text-sm break-words whitespace-normal">
            {description}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ScrollItem;
