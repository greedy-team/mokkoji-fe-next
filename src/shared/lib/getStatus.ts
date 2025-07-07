const STATUS = {
  CLOSED: {
    text: '모집마감',
    backColor: 'bg-[#D1D5DB]',
    fontColor: 'text-[#9CA3AF]',
  },
  URGENT: {
    text: '마감임박',
    backColor: 'bg-[#FEE2E2]',
    fontColor: 'text-[#DC2626]',
  },
  OPEN: {
    text: '모집중',
    backColor: 'bg-[#00E457]',
    fontColor: 'text-[#FFFFFF]',
  },
};

const getStatus = (date: string | undefined) => {
  if (!date) {
    return STATUS.CLOSED;
  }
  const endDate = new Date(date);
  const koreaTime = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Seoul',
  });
  const today = new Date(koreaTime);

  endDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const due = Math.floor(
    (endDate.getTime() - today.getTime()) / (1000 * 3600 * 24),
  );

  if (due < 0) return STATUS.CLOSED;
  if (due <= 3) return STATUS.URGENT;
  return STATUS.OPEN;
};

export default getStatus;
