import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

// Danh sách khung giờ có thể đặt lịch
const timeSlots = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"];

export default function CalendarPage() {
  const [myEvents, setMyEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  // Khi chọn một ngày trong lịch
  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(moment(slotInfo.start).startOf("day").toDate()); // Chỉ lấy ngày
    setSelectedTime("");
    setEventTitle("");
  };

  // Khi chọn một giờ
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  // Thêm sự kiện mới
  const handleAddEvent = () => {
    if (!eventTitle || !selectedDate || !selectedTime) return;
    
    const eventDateTime = moment(selectedDate).set({
      hour: parseInt(selectedTime.split(":")[0]),
      minute: selectedTime.includes("PM") ? 0 + 12 * (selectedTime.startsWith("12") ? 0 : 1) : 0,
    });

    const newEvent = {
      title: eventTitle,
      start: eventDateTime.toDate(),
      end: eventDateTime.add(1, "hour").toDate(),
    };

    setMyEvents([...myEvents, newEvent]);
    setSelectedDate(null);
    setSelectedTime("");
    setEventTitle("");
  };

  // Đổi màu nền cho ngày có sự kiện
  const dayPropGetter = (date) => {
    const hasEvent = myEvents.some((event) => moment(event.start).isSame(date, "day"));
    if (hasEvent) {
      return {
        style: {
          backgroundColor: "#ffeb3b",
          color: "#333",
          borderRadius: "5px",
        },
      };
    }
    return {};
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Lịch đặt lịch</h2>

        <Calendar
          localizer={localizer}
          events={myEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          className="rounded-lg shadow-md"
          selectable
          onSelectSlot={handleSelectSlot}
          dayPropGetter={dayPropGetter}
        />

        {/* Form đặt lịch */}
        {selectedDate && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Đặt lịch cho ngày: {moment(selectedDate).format("DD/MM/YYYY")}
            </h3>

            {/* Chọn giờ */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  className={`py-2 px-4 rounded border ${
                    selectedTime === time ? "bg-blue-500 text-white" : "bg-white text-gray-700 border-gray-300"
                  }`}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </button>
              ))}
            </div>

            {/* Nhập tiêu đề sự kiện */}
            <input
              type="text"
              placeholder="Nhập tiêu đề sự kiện..."
              className="mt-4 w-full p-2 border border-gray-300 rounded-lg"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />

            {/* Nút thêm sự kiện */}
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md"
                onClick={handleAddEvent}
                disabled={!eventTitle || !selectedTime}
              >
                Thêm sự kiện
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
