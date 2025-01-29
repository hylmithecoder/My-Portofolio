import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';

const knowledgeBase = [
  {
    patterns: ['price', 'cost', 'how much', 'pricing', 'package', 'subscription'],
    responses: [
      "Our premium package is priced at $100/month. Would you like to know more about what's included? 💰",
      "We offer different packages starting from $100/month. What features are you interested in? 💎",
      "The basic package starts at $100/month, with advanced features available in higher tiers. Would you like to see a comparison? 📊"
    ]
  },
  {
    patterns: ['contact', 'reach', 'support', 'help', 'assistance', 'phone', 'email'],
    responses: [
      "You can reach our support team at:\n📞 +62 812-7872-7944\n📧 support@hylmi.ai",
      "Need help? Contact us:\n📞 Phone: +62 812-7872-7944\n📧 Email: support@hylmi.ai\n💬 Or just chat with me!",
      "Our support team is available 24/7:\n📞 +62 812-7872-7944\n📧 support@hylmi.ai"
    ]
  },
  {
    patterns: ['creator', 'made', 'who made', 'who created', 'built by'],
    responses: [
      "I was created by Hylmi! Nice to meet you! 😊",
      "Hylmi is my creator! He's a talented developer! 🚀",
      "I'm one of Hylmi's creations! He's amazing at building AI! ✨"
    ]
  },
  {
    patterns: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
    responses: [
      "Hello! How can I assist you today? 😊",
      "Hi there! What can I help you with? 👋",
      "Hey! I'm here to help! What's on your mind? 💭"
    ]
  },
  {
    patterns: ['bye', 'goodbye', 'exit', 'see you', 'talk to you later', 'cya'],
    responses: [
      "Goodbye! Feel free to chat with me again anytime! 👋",
      "Take care! Come back soon! 😊",
      "Bye! Have a great day! ✨"
    ]
  },
  {
    patterns: ['creator doing', 'creator work', 'what does creator do', 'hylmi doing', 'hylmi work'],
    responses: [
      "My creator Hylmi is a software engineer. He loves to code and build cool stuff! 😎",
      "Hylmi works as a software engineer, creating amazing applications and AI solutions! 🚀",
      "Hylmi is passionate about software development and artificial intelligence! 💻"
    ]
  },
  {
    patterns: ['thank', 'thanks', 'appreciate', 'grateful', 'thankful', 'thx', 'nice'],
    responses: [
      "You're welcome! I'm here to help! 😊",
      "No problem! Happy to assist! 👍",
      "You're welcome! Let me know if you need anything else! 😊"
    ]
  },
  {
    patterns: ['age', 'old', 'born', 'birthday', 'age'],
    responses: [
      "Hylmi was born on 2007, so he's currently 17 years old! 🎉",
      "Hylmi is 17 years old, born in 2007! 🎂",
      "My creator Hylmi was born in 2007, making him 17 years old! 🎈"
    ]
  },
  {
    patterns: ['live', 'location', 'city', 'country'],
    responses: [
      "Hylmi is based in North Sumatera, Indonesia! 📍",
      "Hylmi is currently based in North Sumatera, Indonesia! 🌟",
      "My creator Hylmi lives in North Sumatera, Indonesia! 🏡"
    ]
  },
  {
    patterns: ['fuck', 'bitch', 'hell', 'ass', 'shit'],
    responses: [
      "Please don't use profanity in this chat! 🙅‍♂️",
      "No profanity allowed in this chat! 🙅‍♀️",
      "Please don't use offensive language in this chat! 🙅‍♂️"
    ]
  },
  {
    patterns: ['school', 'university', 'college', 'education'],
    responses: [
      "Hylmi is a vocational school student! 🎓",
      "Hylmi is currently in vocational school! 🎉",
      "My creator Hylmi is a vocational school student! 🎓"
    ]
  }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! 👋 I'm Hylmi AI, how can I help you today?", sender: "bot" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const calculateSimilarity = (str1, str2) => {
    const matrix = Array(str1.length + 1).fill(null).map(() => Array(str2.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= str2.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= str1.length; i++) {
      for (let j = 1; j <= str2.length; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    return 1 - (matrix[str1.length][str2.length] / Math.max(str1.length, str2.length));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const findBestResponse = (message) => {
    const words = message.toLowerCase().split(' ');
    let bestMatch = { similarity: 0, responses: null };

    knowledgeBase.forEach(entry => {
      entry.patterns.forEach(pattern => {
        words.forEach(word => {
          const similarity = calculateSimilarity(word, pattern);
          if (similarity > bestMatch.similarity) {
            bestMatch = {
              similarity: similarity,
              responses: entry.responses
            };
          }
        });
      });
    });

    return bestMatch.similarity > 0.6
      ? bestMatch.responses[Math.floor(Math.random() * bestMatch.responses.length)]
      : "I'm not quite sure about " + message + " that. Could you please rephrase your question? 🤔";
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    setMessages([...messages, { text: newMessage, sender: "user" }]);
    setNewMessage("");
    setIsTyping(true);

    // Enhanced response system with similarity matching
    setTimeout(() => {
      const response = findBestResponse(newMessage);
      setMessages(prev => [...prev, { text: response, sender: "bot" }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 md:w-96 max-h-[600px] flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot className="text-white" size={24} />
              <h3 className="text-xl font-bold text-white">Hylmi AI</h3>
            </div>
            <button
              onClick={toggleChatbot}
              className="text-white hover:bg-blue-700 p-1 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[320px] max-h-[400px] bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex items-end space-x-2">
                  {message.sender === "bot" && (
                    <Bot size={20} className="text-blue-600 mb-2" />
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                  </div>
                  {message.sender === "user" && (
                    <User size={20} className="text-blue-600 mb-2" />
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2">
                <Bot size={20} className="text-blue-600" />
                <div className="bg-gray-200 p-3 rounded-lg rounded-bl-none">
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-gray-800"
                value={newMessage}
                onChange={handleMessageChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      {!isOpen && (
        <button
          onClick={toggleChatbot}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all animate-bounce"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
