
"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import MarkdownMessage from '../components/MarkdownMessage';
import LinkedInIcon from "@/components/contactMe";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage: Message = {
          id: Date.now() + 1,
          sender: "bot",
          text: data.response,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage: Message = {
          id: Date.now() + 1,
          sender: "bot",
          text: data.error || "Something went wrong!",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (err) {
      console.error("Error fetching chat:", err);
      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: "An unexpected error occurred.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Fixed Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-black z-0" aria-hidden="true" />

      {/* Foreground content */}
      <div className="relative flex flex-col min-h-[100dvh] z-10">
        {/* Header */}
        <header className="sticky top-0 z-20 backdrop-blur-sm border-gray-800 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-l from-slate-700 via-slate-400 to-slate-100 bg-clip-text text-transparent mb-2 sm:mb-0">
              Chat with Your Buddy
            </h1>
            <LinkedInIcon />
          </div>
        </header>

        {/* Chat Container */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col">
          {/* Messages - scrollable with padding bottom for input height */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 no-scrollbar pb-24">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`rounded-lg px-3 py-2 max-w-[85%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[55%] ${
                  msg.sender === "user" ? "bg-[#072da1] text-white" : "bg-[#0b111e] text-white"}`}>
                  {msg.sender === "bot" ? (
                    <div className="overflow-x-auto">
                      <MarkdownMessage content={msg.text} />
                    </div>
                  ) : (
                    <div className="break-words text-sm sm:text-base">{msg.text}</div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-lg px-3 py-2 max-w-[85%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[55%] bg-[#0b111e]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input bar fixed to bottom */}
          <div className="fixed bottom-0 left-0 w-full z-30 backdrop-blur-sm px-4 py-3 shadow-lg">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 rounded-lg px-3 py-2 bg-[#0b111e]">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none min-w-0"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                    loading || !input.trim() ? "text-gray-400 cursor-not-allowed" : "text-white hover:bg-gray-700"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default ChatPage;
