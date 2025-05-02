import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

interface Message {
  id: string;
  recipient: string;
  content: string;
  timestamp: string;
  status: "success" | "failed" | "sending";
}

const SentMessages: React.FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    recipient: "",
    message: "",
  });
  const [status, setStatus] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [errors, setErrors] = useState({ recipient: "", message: "" });

  // Load saved messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("sentMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("sentMessages", JSON.stringify(messages));
    }
  }, [messages]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { recipient: "", message: "" };

    // Remove character limit for recipient
    if (!formData.recipient.trim()) {
      newErrors.recipient = "Recipient name is required";
      isValid = false;
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.recipient)) {
      newErrors.recipient =
        "Name should contain only letters, spaces, hyphens, or apostrophes";
      isValid = false;
    }

    // Remove character limit for message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } // Remove length limit check for message

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setStatus({ text: "Sending message...", type: "info" });

    // Add temporary message with "sending" status
    const tempMessage: Message = {
      id: crypto.randomUUID(),
      recipient: formData.recipient,
      content: formData.message,
      timestamp: new Date().toLocaleString(),
      status: "sending",
    };
    setMessages((prev) => [tempMessage, ...prev]);

    try {
      const response = await fetch("https://formspree.io/f/mvgkvozp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: formData.recipient,
          message: formData.message,
        }),
      });

      const newMessage: Message = {
        ...tempMessage,
        status: response.ok ? "success" : "failed",
        timestamp: new Date().toLocaleString(),
      };

      setMessages((prev) => [
        newMessage,
        ...prev.filter((m) => m.id !== tempMessage.id),
      ]);
      setStatus({
        text: response.ok
          ? "Message sent successfully!"
          : "Failed to send message",
        type: response.ok ? "success" : "error",
      });

      if (response.ok) {
        setFormData({ recipient: "", message: "" });
        setErrors({ recipient: "", message: "" });
      }
    } catch (error) {
      setMessages((prev) => [
        {
          ...tempMessage,
          status: "failed",
          timestamp: new Date().toLocaleString(),
        },
        ...prev.filter((m) => m.id !== tempMessage.id),
      ]);
      setStatus({
        text: "Network error. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ recipient: "", message: "" });
    setErrors({ recipient: "", message: "" });
    setStatus({ text: "", type: "" });
  };

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear all message history?")) {
      setMessages([]);
      localStorage.removeItem("sentMessages");
    }
  };

  return (
    <main
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${
          theme === "dark"
            ? "bg-gray-800 border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
      >
        <div
          className={`p-6 ${
            theme === "dark"
              ? "bg-gradient-to-r from-purple-900/30 to-blue-900/30"
              : "bg-gradient-to-r from-purple-50 to-blue-50"
          }`}
        >
          <h2 className="text-2xl font-bold mb-2 text-center flex items-center justify-center gap-2">
            <span>Send a Message</span>
            <span className="animate-bounce">💌</span>
          </h2>
          <p
            className={`text-center mb-6 ${
              theme === "dark" ? "text-gray-300" : "text-gray-500"
            }`}
          >
            Share your thoughts with someone special
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="recipient"
                className={`block mb-1 text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Recipient
              </label>
              <input
                id="recipient"
                name="recipient"
                type="text"
                placeholder="Who should receive this?"
                value={formData.recipient}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg border ${
                  theme === "dark"
                    ? "bg-gray-700 text-white border-gray-600 focus:border-purple-500"
                    : "bg-white text-gray-900 border-gray-300 focus:border-blue-500"
                } focus:outline-none focus:ring-2 ${
                  theme === "dark"
                    ? "focus:ring-purple-500"
                    : "focus:ring-blue-500"
                } transition-all`}
                disabled={isLoading}
              />
              {errors.recipient && (
                <p className="mt-1 text-sm text-red-500">{errors.recipient}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className={`block mb-1 text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="What would you like to say?..."
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className={`w-full p-3 rounded-lg border ${
                  theme === "dark"
                    ? "bg-gray-700 text-white border-gray-600 focus:border-purple-500"
                    : "bg-white text-gray-900 border-gray-300 focus:border-blue-500"
                } focus:outline-none focus:ring-2 ${
                  theme === "dark"
                    ? "focus:ring-purple-500"
                    : "focus:ring-blue-500"
                } transition-all resize-none`}
                disabled={isLoading}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : theme === "dark"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    Send Message
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={isLoading}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                Clear
              </button>
            </div>
          </form>

          {status.text && (
            <div
              className={`mt-4 p-3 rounded-lg ${
                status.type === "success"
                  ? "bg-green-100 text-green-800"
                  : status.type === "error"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              } text-center`}
            >
              {status.text}
            </div>
          )}
        </div>

        {messages.length > 0 && (
          <div
            className={`border-t ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            } p-6`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Message History</h3>
              <button
                onClick={clearHistory}
                className={`text-sm ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
                } transition-colors`}
              >
                Clear All
              </button>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-lg transition-all ${
                    theme === "dark"
                      ? "bg-gray-700 hover:bg-gray-700/90"
                      : "bg-gray-100 hover:bg-gray-200"
                  } ${msg.status === "sending" ? "opacity-70" : ""}`}
                >
                  <div className="flex justify-between items-start">
                    <p className="font-medium">{msg.recipient}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        msg.status === "success"
                          ? "bg-green-100 text-green-800"
                          : msg.status === "failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {msg.status}
                    </span>
                  </div>
                  <p
                    className={`mt-1 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {msg.content}
                  </p>
                  <p
                    className={`mt-2 text-xs ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default SentMessages;
