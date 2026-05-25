function TableHeaderCell({
  width,
  children,
}: {
  width: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`${width} text-[16px] leading-[140%] font-medium text-[#000000]`}
    >
      {children}
    </span>
  );
}

export default TableHeaderCell;
