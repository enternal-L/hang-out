"use client"

import { useState, useEffect } from "react";

const Calendar = () => {

  const [calendar, setCalendar] = useState([])
  const [currentMonth, setMonth] = useState([]);
  const currentDate = new Date().getDate()
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const generateDates = (year) => {
      const dates = [];

      for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const months = [];

        for (let day = 1; day <= daysInMonth; day++) {
          months.push({
            date: day,
            selected: false,
          });
        }

        dates.push(months);
      }

      setMonth(new Date().getMonth());
      setCalendar(dates);
    };

    generateDates(currentYear);

  }, []);

  const incrMonth = () => {
    setMonth(currentMonth == 11 ? 0 : currentMonth + 1)
  }

  const decrMonth = () => {
    setMonth(currentMonth == 0 ? 11 : currentMonth - 1)
  }

  return (
    <>
      {
        calendar.length > 0 && 
        <div className="w-96">
          {/* Title */}
          <div className="flex flex-row justify-between p-3">
            <button className="change-month" onClick={decrMonth}>&lt;</button>
            <div className="flex flex-row flex-center gap-1 ">
              <p className="text-center font-bold">
                {new Date(currentMonth, currentMonth).toLocaleString("default", { month: "long" })}
              </p>
              <p className="text-ceter font-bold">
                {currentYear}
              </p>
            </div>
            <button className="change-month" onClick={incrMonth}>&gt;</button>
          </div>
          <div className="flex flex-col border-2 border-black rounded-md p-4">
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center font-semibold">
                    {day}
                  </div>
                ))}
      
                {calendar[currentMonth].map((val, key) => (
                    <div key = {key} 
                        className= {`w-12 h-12 flex items-center 
                          justify-center border cursor-pointer hover:bg-gray-200 
                        ${val.date === currentDate && 
                          currentMonth == new Date().getMonth()
                          ? "bg-[#aac9fa]" : ""}"}`}>
                      {val.date}
                    </div>
                ))}
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Calendar