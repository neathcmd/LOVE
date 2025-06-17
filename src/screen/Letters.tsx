import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MailOpen } from "lucide-react"; // Import message icons

// Types
interface Letter {
  id: number;
  title: string;
  content: string;
  emoji: string;
}

// Letter Component
const Letter: React.FC<{ letter: Letter }> = ({ letter }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${
        theme === "dark"
          ? "bg-gray-800 text-gray-200"
          : "bg-white text-gray-800"
      } p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border ${
        theme === "dark" ? "border-gray-700" : "border-gray-200"
      } relative`}
    >
      {/* Message icon that changes based on open state */}
      <div className="absolute -top-3 -left-3">
        {isOpen ? (
          <MailOpen
            size={24}
            className={`p-1 rounded-full ${
              theme === "dark"
                ? "text-purple-400 bg-gray-900"
                : "text-purple-600 bg-white"
            } shadow-md`}
          />
        ) : (
          <Mail
            size={24}
            className={`p-1 rounded-full ${
              theme === "dark"
                ? "text-blue-400 bg-gray-900"
                : "text-blue-600 bg-white"
            } shadow-md`}
          />
        )}
      </div>

      <button
        className="flex items-center justify-between w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`letter-content-${letter.id}`}
      >
        <h3 className="text-xl font-semibold pr-4">{letter.title}</h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-2xl"
        >
          {letter.emoji}
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`letter-content-${letter.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 overflow-hidden"
          >
            <p
              className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {letter.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Letters: React.FC = () => {
  const { theme } = useTheme();

  const letters: Letter[] = [
    {
      id: 1,
      title: "Miss you",
      content: "អូនហ៎ា🥺🤭 នឹកអូនពេកហៅអូនលេង🤭 អូនមិនអីទេមែន🥺🤍",
      emoji: "💌",
    },
    {
      id: 2,
      title: "I love you",
      content:
        "បងស្រឡាញ់អូនបងមិនខ្វល់ពិអតីតកាលរបស់អូនទេបងស្រឡាញ់អូនជាណ៎ា បងសំុទោសបើពេលខ្លះបងធ្វើអោយអូនមានអារម្មណ៍មិនល្អបងគ្មានបំណងអីទេក្រៅពីស្រឡាញ់អូន😊🤍",
      emoji: "💌",
    },
    {
      id: 3,
      title: "Memories",
      content:
        "ចាំទេថ្ងៃដែរយើងទាក់ទងគ្នាដំបូង? បងសប្បាយចិត្តហ៎ាអោយតែបាននៅក្បែអូនម្ដងៗ😚 ទេាះជាពេលនុះយើងមិនទាន់ត្រូវជាអីនឹងគ្នាក៏ដោយ🥺🤍",
      emoji: "💌",
    },
    {
      id: 4,
      title: "I know",
      content:
        "បងដឹងថាពេលខ្លះអូនហត់អូនពិបាកអូនចង់មានពេលនៅម្នាក់ឯង បងមិនហាមឃាត់អូនទេ បងគ្រាន់តែចង់អោយអូនដឹងថាបងនៅទីនេះសម្រាប់អូន🤍",
      emoji: "💌",
    },
    {
      id: 5,
      title: "Did you know",
      content:
        "តើអូនដឹងទេថាបងស្រឡាញ់អូនខ្លាំងប៉ុណ្ណាបងបារម្ភពីអូនគ្រប់ពេល គ្រប់ពេលដែរបងឃើញអូនមិនសប្បាយចិត្តបងតែងតែលេងជាមួយអូនយ៉ាងហោចណាស់អោយអូនមានអារម្មណ៍ល្អបន្តិចហើយចាំយើងនិយាយគ្នាថាមានរឿងអីកើតឡើងនឹងរកវិធីដេាះស្រាយវាជាមួយគ្នា🤍",
      emoji: "💌",
    },
    {
      id: 6,
      title: "Tow Souls",
      content:
        "មនុស្សពីរនាក់ស្រឡាញ់គ្នាមានរឿងអីត្រូវចេះប្រាប់គ្នាណ៎ាយើងរកវិធីដេាះស្រាយជាមួយគ្នាអូនមិនមែននៅម្នាក់ឯងទេណ៎ា ព្រះនាងរបស់បង🤍",
      emoji: "💌",
    },
    {
      id: 7,
      title: "To my girlfriend",
      content:
        "កំុបារម្ភអីណាបងមិនទៅណាចោលអូនទេទេាះជាមានរឿងអ្វីក៏ដោយក៏សង្សារអូនម្នាក់នេះមិនទុកអោយចោលឡើយបងនៅក្បែអូននៅចាំជួយគាំទ្រអូនគ្រប់ពេលវេលា🤍",
      emoji: "💌",
    },
  ];

  return (
    <section>
      <div className="max-w-4xl mx-auto">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${
            theme === "dark" ? "bg-gray-900" : "bg-gray-100"
          } p-6 rounded-xl`}
        >
          {letters.length > 0 ? (
            letters.map((letter) => <Letter key={letter.id} letter={letter} />)
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No messages available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Letters;
