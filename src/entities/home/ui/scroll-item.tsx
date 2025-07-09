import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

interface ScrollItemProps {
  title: string;
  description: string;
  imgUrl?: string;
}

function ScrollItem({ title, description, imgUrl }: ScrollItemProps) {
  return (
    <div className="relative h-[191px] w-[448px] cursor-pointer rounded-2xl bg-[#F2F4F6] p-5 hover:bg-[#e8e8e8]">
      <div className="mb-8 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Avatar className="size-12">
            <AvatarImage src={imgUrl} />
            <AvatarFallback>{title}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="w-[250px] text-sm break-words whitespace-normal">
          {description}
        </div>
      </div>
    </div>
  );
}

export default ScrollItem;
