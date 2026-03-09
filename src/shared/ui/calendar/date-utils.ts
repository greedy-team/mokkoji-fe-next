export const formatDateWithTime = (dateStr: string, isEnd: boolean) => {
  if (!dateStr) return '';
  const time = isEnd ? '23:59:59' : '00:00:00';
  return `${dateStr}T${time}`;
};

export const formatDateInput = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 4) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
  return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6, 8)}`;
};

export const isValidDateFormat = (value: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(value)) return false;

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

export const formatDateToString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const extractDateOnly = (dateTimeStr: string | null) => {
  if (!dateTimeStr) return '';
  return dateTimeStr.split('T')[0];
};
