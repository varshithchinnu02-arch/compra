import { useState } from "react";
import axios from "axios";

import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({
  layout,
  setLayout
}) {

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I can help transform your design layout. Try commands like 'Convert to 9:16' or 'Move headline to top'."
    }
  ]);

  const sendMessage = async (text) => {

    const userMsg = {
      role: "user",
      content: text
    };

    setMessages((prev) => [
      ...prev,
      userMsg
    ]);

    try {

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chat`,
        // "http://localhost:3001/api/chat",
        {
          message: text,
          layout
        }
      );

      setLayout(data.updatedLayout);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message
        }
      ]);

    } catch (err) {

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong while updating the layout."
        }
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* Scrollable Messages */}
      <div
        className="
          flex-1
          overflow-y-auto
          px-4
          py-5
          space-y-4
        "
      >

        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            msg={msg}
          />
        ))}

      </div>

      {/* Input */}
      <ChatInput sendMessage={sendMessage} />

    </div>
  );
}