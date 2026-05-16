import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatInput({
  sendMessage
}) {

  const [text, setText] = useState("");

  const handleSend = () => {

    if (!text.trim()) return;

    sendMessage(text);

    setText("");
  };

  return (
    <div className="p-4 border-t border-white/10 bg-[#0f172a]">

      <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3 border border-white/10">

        <input
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Ask AI to modify your layout..."
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
        />

        <button
          onClick={handleSend}
          className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-all"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}