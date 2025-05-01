import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import Partner1 from "../assets/Partner1.jpg";
import Partner2 from "../assets/Partner2.jpg";

interface Partner {
  name: string;
  imageUrl?: string;
}

interface DateCounterProps {
  partners?: [Partner, Partner];
  startDate?: string;
  anniversaryNote?: string;
  editable?: boolean;
}

const DateCounter: React.FC<DateCounterProps> = ({
  partners = [
    {
      name: "Sal Monineath",
      imageUrl: Partner1,
    },
    {
      name: "Son Reaksmey",
      imageUrl: Partner2,
    },
  ],
  startDate = "2025-04-06",
  anniversaryNote = "Our special day ❤️",
  editable = false,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    partner1Name: partners[0].name,
    partner2Name: partners[1].name,
    startDate,
    anniversaryNote,
  });

  // Update current date every seconds for real-time counting
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate time passed
  const start = new Date(editData.startDate);
  const timeDiff = currentDate.getTime() - start.getTime();

  const daysPassed = Math.floor(timeDiff / (1000 * 3600 * 24));
  const weeksPassed = Math.floor(daysPassed / 7);
  const monthsPassed =
    (currentDate.getFullYear() - start.getFullYear()) * 12 +
    (currentDate.getMonth() - start.getMonth());
  const yearsPassed = Math.floor(monthsPassed / 12);

  // Calculate next anniversary
  const nextAnniversary = new Date(start);
  nextAnniversary.setFullYear(currentDate.getFullYear());
  if (nextAnniversary < currentDate) {
    nextAnniversary.setFullYear(currentDate.getFullYear() + 1);
  }
  const daysUntilAnniversary = Math.floor(
    (nextAnniversary.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const { theme } = useTheme();

  // Format date
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main
      className={`w-full min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`relative max-w-2xl w-full rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
          theme === "dark"
            ? "bg-gray-800 border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
      >
        <div className="p-6">
          {/* Partner profiles */}
          <div className="flex flex-row items-center justify-center mb-6 gap-4 sm:gap-10">
            {partners.map((partner, index) => (
              <React.Fragment key={index}>
                <div className="text-center">
                  <div
                    className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 shadow-lg mx-auto relative ${
                      theme === "dark"
                        ? "border-gray-700 bg-gray-800"
                        : "border-gray-300 bg-gray-200"
                    }`}
                  >
                    {partner.imageUrl ? (
                      <img
                        src={partner.imageUrl}
                        alt={
                          index === 0
                            ? editData.partner1Name
                            : editData.partner2Name
                        }
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className={`w-full h-full flex items-center justify-center text-4xl font-bold ${
                          theme === "dark" ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        {partner.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}
                  </div>
                  {editable && isEditing ? (
                    <input
                      type="text"
                      name={index === 0 ? "partner1Name" : "partner2Name"}
                      value={
                        index === 0
                          ? editData.partner1Name
                          : editData.partner2Name
                      }
                      onChange={handleInputChange}
                      className={`mt-2 border-b text-center w-full max-w-[180px] transition-colors ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-500 text-white focus:border-purple-500"
                          : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                      }`}
                    />
                  ) : (
                    <p
                      className={`mt-2 font-medium text-lg ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {index === 0
                        ? editData.partner1Name
                        : editData.partner2Name}
                    </p>
                  )}
                </div>

                {index === 0 && (
                  <div className="relative mx-2 sm:mx-0">
                    {/* Heart pulse animation */}
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                      {/* Outer pulse effect */}
                      <div
                        className={`absolute inset-0 rounded-full animate-ping ${
                          theme === "dark" ? "bg-pink-500/20" : "bg-pink-400/30"
                        }`}
                        style={{ animationDuration: "2s" }}
                      ></div>

                      {/* Main heart icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        fill={theme === "dark" ? "#ec4899" : "#db2777"}
                        stroke={theme === "dark" ? "#ec4899" : "#db2777"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-heartbeat"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </div>

                    {/* Optional date display below heart on larger screens */}
                    <div
                      className={`hidden sm:block mt-2 text-center text-xs font-medium ${
                        theme === "dark" ? "text-pink-300" : "text-pink-600"
                      }`}
                    >
                      {daysPassed} days
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          {/* Time together */}
          <div className="mb-8 text-center">
            <h1
              className={`text-3xl font-bold mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Together since{" "}
              {editable && isEditing ? (
                <input
                  type="date"
                  name="startDate"
                  value={editData.startDate}
                  onChange={handleInputChange}
                  className={`border-b transition-colors ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-500 text-white focus:border-purple-500"
                      : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                  }`}
                />
              ) : (
                formatDate(new Date(editData.startDate))
              )}
            </h1>
            <div
              className={`flex items-center justify-center gap-1 text-lg ${
                theme === "dark" ? "text-indigo-300" : "text-indigo-600"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>
                That's <strong>{daysPassed} days</strong> of love and memories!
              </span>
            </div>
          </div>

          {/* Time metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { value: daysPassed, label: "Days" },
              { value: weeksPassed, label: "Weeks" },
              { value: monthsPassed, label: "Months" },
              { value: yearsPassed, label: "Years" },
            ].map((metric, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl text-center transition-colors ${
                  theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <div
                  className={`text-4xl font-bold mb-1 ${
                    theme === "dark" ? "text-indigo-300" : "text-indigo-600"
                  }`}
                >
                  {metric.value}
                </div>
                <div
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Anniversary countdown */}
          <div
            className={`p-6 rounded-xl border transition-colors ${
              theme === "dark"
                ? "bg-gradient-to-r from-gray-700/50 to-gray-600/50 border-gray-600"
                : "bg-gradient-to-r from-gray-100/50 to-gray-200/50 border-gray-300"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={theme === "dark" ? "#ec4899" : "#db2777"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21.7c2.1 0 3.8-1.7 3.8-3.8 0-2.5-3.8-6.9-3.8-6.9s-3.8 4.4-3.8 6.9c0 2.1 1.7 3.8 3.8 3.8z"></path>
                <path d="M12 21.7v-6.9"></path>
                <path d="M12 14.8l-3.8 3.1"></path>
                <path d="M12 14.8l3.8 3.1"></path>
                <path d="M5.5 8.5h13v5.2h-13z"></path>
                <path d="M9.2 3.8v4.7"></path>
                <path d="M14.8 3.8v4.7"></path>
              </svg>
              <h2
                className={`text-xl font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Next Anniversary
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <span className="font-medium">
                    {formatDate(nextAnniversary)}
                  </span>
                  {editable && isEditing ? (
                    <input
                      type="text"
                      name="anniversaryNote"
                      value={editData.anniversaryNote}
                      onChange={handleInputChange}
                      className={`ml-2 border-b transition-colors ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-500 text-white focus:border-purple-500"
                          : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                      }`}
                    />
                  ) : (
                    <span> - {editData.anniversaryNote}</span>
                  )}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {yearsPassed + 1} years together
                </p>
              </div>
              <div
                className={`px-4 py-2 rounded-lg text-center min-w-max ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-pink-900/30 to-rose-900/30 text-pink-300"
                    : "bg-gradient-to-r from-pink-600/20 to-rose-600/20 text-pink-600"
                }`}
              >
                <span className="text-sm font-medium">
                  {daysUntilAnniversary} day
                  {daysUntilAnniversary !== 1 ? "s" : ""} until your anniversary
                </span>
              </div>
            </div>
          </div>

          {/* Edit toggle button */}
          {editable && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-indigo-500 hover:bg-indigo-600 text-white"
                }`}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default DateCounter;
