import { WEEKDAYS } from './constants';
import getDateGrid from './getDateGrid';

function CalenderBody() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const allDate = getDateGrid({ today, currentYear, currentMonth });

  return (
    <div>
      <h2>
        {currentYear}년 {currentMonth + 1}월
      </h2>
      <div className="grid grid-cols-7">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {allDate.map((date) => (
          <div key={date?.getDate()}>{date?.getDate()}</div>
        ))}
      </div>
    </div>
  );
}

export default CalenderBody;
