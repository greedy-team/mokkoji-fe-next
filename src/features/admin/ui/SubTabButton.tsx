function SubTabButton({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        isActive
          ? 'flex h-[38px] cursor-pointer items-center justify-center rounded-[30px] bg-[#000000] px-[14px] text-[16px] leading-[140%] font-medium text-white'
          : 'flex h-[38px] cursor-pointer items-center justify-center rounded-[30px] border border-[#D6D6D6] px-[14px] text-[16px] leading-[140%] font-medium text-[#7F7F7F]'
      }
    >
      {children}
    </button>
  );
}

export default SubTabButton;
