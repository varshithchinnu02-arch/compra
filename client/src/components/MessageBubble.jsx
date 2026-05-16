export default function MessageBubble({ msg }) {

  const isUser = msg.role === "user";

  return (
    <div
      className={`flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >

      <div
        className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg border ${
          isUser
            ? "bg-blue-600 text-white border-blue-500"
            : "bg-white/10 backdrop-blur-xl text-gray-100 border-white/10"
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}