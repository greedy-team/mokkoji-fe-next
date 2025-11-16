interface DateProps {
  currentDate: Date;
  currentMonth: number;
  currentYear: number;
}

function getDateGrid({ currentDate, currentYear, currentMonth }: DateProps) {
  const dateGrid = [];
  const firstDay = currentDate.getDay();
  const parsedFirstDay = (firstDay + 6) % 7;
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let i = 0; i < parsedFirstDay; i += 1) {
    dateGrid.push(null);
  }

  for (let i = 0; i < lastDate; i += 1) {
    dateGrid.push(new Date(currentYear, currentMonth, i + 1));
  }

  return dateGrid;
}

export default getDateGrid;
