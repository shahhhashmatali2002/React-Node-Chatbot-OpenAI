import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";  // Import the send icon from react-icons

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [chatVisible, setChatVisible] = useState<boolean>(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const chatButtonRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom whenever a new message is added
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle the sending of the message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to the chat
    setMessages((prevMessages) => [...prevMessages, { text: input, isUser: true }]);
    setInput("");
    setLoading(true);

    // Send the message to the backend and get the bot's response
    try {
      const response = await axios.post("http://localhost:3000/api/chatbot-api", { message: input });
      const botResponse = response.data.response;
      setMessages((prevMessages) => [...prevMessages, { text: botResponse, isUser: false }]);
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { text: "Sorry, something went wrong.", isUser: false }]);
    } finally {
      setLoading(false);
    }
  };

  // Toggle chat window visibility
  const toggleChatWindow = () => {
    setChatVisible((prev) => !prev);
  };

  // Close chat window when the close button is clicked
  const closeChatWindow = () => {
    setChatVisible(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!chatVisible && (
        <div className="chat-button" ref={chatButtonRef} onClick={toggleChatWindow}>
          <div className="chat-icon">💬</div>
        </div>
      )}

      {/* Chat Window */}
      {chatVisible && (
        <div className="chatbot-container">
          <div className="chat-header">
            <span className="chat-title">Chatbot</span>
            <button className="close-button" onClick={closeChatWindow}>×</button>
          </div>
          <div className="chat-window" ref={chatWindowRef}>
            {messages.map((msg, index) => (
              <div key={index} className={msg.isUser ? "user-message" : "bot-message"}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="bot-message">...</div>
            )}
          </div>

          {/* Input and Send Button */}
          <form onSubmit={handleSendMessage} className="chat-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="chat-input"
            />
            <button type="submit" className="send-button">
              <FaPaperPlane size={20} color="white" /> {/* Send icon */}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
