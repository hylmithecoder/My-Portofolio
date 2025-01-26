import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! How can I help you today?", sender: "bot" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    setMessages([...messages, { text: newMessage, sender: "user" }]);
    setNewMessage("");

    // Simulasi respons bot
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, { text: "Thanks for your message!", sender: "bot" }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 w-80">
      {isOpen ? (
        <motion.div
          className="bg-white rounded-lg shadow-lg p-4"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-blue-500">Chatbot</h3>
            <button onClick={toggleChatbot}>
              <X size={24} />
            </button>
          </div>
          <div className="h-64 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block p-2 rounded-lg ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex mt-4">
            <input
              type="text"
              className="flex-1 border rounded-l-lg p-2"
              value={newMessage}
              onChange={handleMessageChange}
              placeholder="Type a message..."
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-r-lg"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </motion.div>
      ) : (
        <button
          onClick={toggleChatbot}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
