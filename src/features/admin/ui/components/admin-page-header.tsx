'use client';

interface AdminPageHeaderProps {
  title: string;
}

function AdminPageHeader({ title }: AdminPageHeaderProps) {
  return (
    <div className="mb-4 flex items-center gap-2 lg:gap-4">
      <h1 className="text-base font-bold lg:text-[28px]">{title}</h1>
    </div>
  );
}

export default AdminPageHeader;
