import { useState } from "react";

import ChatWindow from "./components/ChatWindow";
import WireframePreview from "./components/WireframePreview";

import initialLayout from "./data/initialLayout.json";

export default function App() {

  const [layout, setLayout] =
    useState(initialLayout);

  return (

    <div className="h-screen overflow-hidden bg-[#020617] text-white flex flex-col">

      {/* ================================= */}
      {/* TOP NAVBAR */}
      {/* ================================= */}

      <div className="h-16 border-b border-white/10 bg-black/20 backdrop-blur-xl flex items-center justify-between px-8">

        {/* LEFT */}
        <div>

          <h1 className="text-2xl font-bold tracking-wide">
            Compra Layout Agent
          </h1>

          <p className="text-sm text-gray-400">
            AI-powered layout transformation system
          </p>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          <div className="px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium">
            Gemini Connected
          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* MAIN SECTION */}
      {/* ================================= */}

      <div className="flex flex-1 overflow-hidden">

        {/* ================================= */}
        {/* LEFT CHAT PANEL */}
        {/* ================================= */}

        <div className="w-[360px] min-w-[360px] border-r border-white/10 bg-white/[0.03] backdrop-blur-2xl flex flex-col">

          {/* HEADER */}
          <div className="p-6 border-b border-white/10">

            <h2 className="text-xl font-semibold">
              AI Assistant
            </h2>

            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              Modify layouts using natural language instructions.
            </p>

          </div>

          {/* SUGGESTIONS */}
          <div className="p-4 flex flex-wrap gap-2 border-b border-white/10">

            {[
              "Convert to 9:16",
              "Move headline to top",
              "Make product bigger",
              "Center the product",
              "Make background blue"
            ].map((item) => (

              <div
                key={item}
                className="
                  px-3 py-2
                  rounded-xl
                  bg-white/5
                  border border-white/10
                  text-sm
                  text-gray-300
                "
              >
                {item}
              </div>

            ))}

          </div>

          {/* CHAT */}
          <div className="flex-1 overflow-hidden">

            <ChatWindow
              layout={layout}
              setLayout={setLayout}
            />

          </div>

        </div>

        {/* ================================= */}
        {/* RIGHT PREVIEW PANEL */}
        {/* ================================= */}

        <div className="flex-1 relative overflow-hidden">

          {/* BACKGROUND GLOW */}
          <div className="absolute inset-0 overflow-hidden">

            <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />

            <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />

          </div>

          {/* HEADER */}
          <div className="relative z-10 h-16 border-b border-white/10 bg-black/20 backdrop-blur-xl flex items-center justify-between px-8">

            <div>

              <h2 className="text-xl font-semibold">
                Live Preview
              </h2>

              <p className="text-sm text-gray-400">
                Real-time wireframe rendering
              </p>

            </div>

            <div className="flex items-center gap-3">

              <button
                className="
                  px-4 py-2
                  rounded-xl
                  bg-white/5
                  border border-white/10
                  hover:bg-white/10
                  transition-all
                  text-sm
                "
              >
                Export JSON
              </button>

              <button
                className="
                  px-4 py-2
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-500
                  transition-all
                  text-sm
                  font-semibold
                  shadow-lg shadow-blue-500/30
                "
              >
                Save Layout
              </button>

            </div>

          </div>

          {/* PREVIEW CENTER */}
          <div className="relative z-10 h-[calc(100%-64px)] flex items-center justify-center p-10 overflow-auto">

            {/* CANVAS WRAPPER */}
            <div
              className="
                p-8
                rounded-[32px]
                border border-white/10
                bg-white/[0.03]
                backdrop-blur-2xl
                shadow-2xl
              "
            >

              <WireframePreview
                layout={layout}
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}