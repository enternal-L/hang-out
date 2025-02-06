"use client";

import { useState, useEffect } from "react";

const Calendar = () => {
  const [calendar, setCalendar] = useState([]);
  const [currentMonth, setMonth] = useState(new Date().getMonth());
  const currentDate = new Date().getDate();
  const currentYear = new Date().getFullYear();
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const generateDates = (year) => {
      const dates = [];
      for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const months = [];
        for (let day = 1; day <= daysInMonth; day++) {
          months.push({ date: day, selected: false });
        }
        dates.push(months);
      }
      setCalendar(dates);
    };

    generateDates(currentYear);
  }, []);

  const incrMonth = () => setMonth(currentMonth === 11 ? 0 : currentMonth + 1);
  const decrMonth = () => setMonth(currentMonth === 0 ? 11 : currentMonth - 1);

  // Function to toggle selection
  const toggleSelection = (index) => {
    setCalendar((prevCalendar) =>
      prevCalendar.map((month, mIdx) =>
        mIdx === currentMonth
          ? month.map((day, dIdx) =>
              dIdx === index ? { ...day, selected: !day.selected } : day
            )
          : month
      )
    );
  };

  // Start drag selection
  const handleMouseDown = (index) => {
    setIsDragging(true);
    toggleSelection(index);
  };

  // Continue drag selection
  const handleMouseOver = (index) => {
    if (isDragging) {
      toggleSelection(index);
    }
  };

  // Stop dragging when mouse is released
  const handleMouseUp = () => setIsDragging(false);

  return (
    <>
      {calendar.length > 0 && (
        <div className="w-96" onMouseUp={handleMouseUp}>
          {/* Title */}
          <div className="flex flex-row justify-between p-3">
            <button className="change-month" onClick={decrMonth}>
              &lt;
            </button>
            <div className="flex flex-row flex-center gap-1">
              <p className="text-center font-bold">
                {new Date(currentYear, currentMonth).toLocaleString("default", {
                  month: "long",
                })}
              </p>
              <p className="text-center font-bold">{currentYear}</p>
            </div>
            <button className="change-month" onClick={incrMonth}>
              &gt;
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="flex flex-col border-2 border-black rounded-md p-4">
            <div className="grid grid-cols-7">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-semibold">
                  {day}
                </div>
              ))}

              {calendar[currentMonth].map((val, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 flex items-center justify-center border cursor-pointer 
                    hover:bg-gray-200 select-none text-slate-800 ${
                      val.date === currentDate &&
                      currentMonth === new Date().getMonth()
                        ? "text-black font-bold"
                        : ""
                    } 
                    ${val.selected ? "bg-[#FFB800] bg-opacity-60" : "text-black"}`}
                  onMouseDown={() => handleMouseDown(index)}
                  onMouseOver={() => handleMouseOver(index)}
                >
                  {val.date}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Calendar;
