'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogOverlay,
  DialogClose,
} from '@/shared/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import { DialogTitle } from '@radix-ui/react-dialog';

interface ClickLogoProps {
  logo: string;
  title: string;
}

export default function ClickLogo({ logo, title }: ClickLogoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Avatar className="size-12 cursor-pointer lg:size-14">
          <AvatarImage src={logo} alt={title} />
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
      </DialogTrigger>

      <DialogOverlay />
      <DialogTitle className="sr-only">{title}</DialogTitle>
      <DialogContent
        className="flex max-h-[85vh] max-w-[90vw] items-center justify-center border-none bg-white p-0 shadow-none"
        showCloseButton
      >
        <Image
          src={logo}
          alt={title}
          width={600}
          height={600}
          className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg"
        />
      </DialogContent>
    </Dialog>
  );
}
