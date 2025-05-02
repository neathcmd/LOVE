import { Link } from "react-router";
import { useTheme } from "../../context/ThemeContext";
import { MessageSquare } from "lucide-react";

const SendMessageButton = () => {
  const { theme } = useTheme();

  return (
    <Link
      to="sent-messages"
      className={`flex items-center justify-center gap-2 px-4 py-3 max-w-[12rem] w-full rounded-lg font-medium text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
        theme === "dark"
          ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
      } active:scale-95`}
      aria-label="Send a message"
    >
      <span>Send Message</span>
      <MessageSquare size={18} />
    </Link>
  );
};

export default SendMessageButton;
