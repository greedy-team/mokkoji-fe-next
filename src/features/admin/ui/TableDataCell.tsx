function TableDataCell({
  width,
  children,
}: {
  width: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`${width} shrink-0 text-[16px] leading-[19px] font-normal text-[#000000]`}
    >
      {children}
    </span>
  );
}

export default TableDataCell;
