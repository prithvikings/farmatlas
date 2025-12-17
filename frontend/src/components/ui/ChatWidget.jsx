import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";

// --- MOCK DATA ---
const MOCK_ANSWERS = [
  "To add a new animal, navigate to the 'Livestock' tab and click the + button in the top right corner.",
  "Based on your recent data, our AI suggests checking the vaccination schedule for Herd #4.",
  "I can help you analyze your feed costs. Would you like to generate a PDF report for this month?",
  "Synchronization complete. Your farm data is fully backed up to the cloud.",
  "Weather alert: A storm is approaching your region. Please ensure outdoor shelters are secured.",
  "That feature is available in the Pro plan. Innovative farming requires premium tools!",
];

// --- CUSTOM STYLES ---
const animationStyles = `
  @keyframes messageIn {
    from { opacity: 0; transform: translateY(10px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes typingBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
  @keyframes cursorBlink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  .animate-message-in {
    animation: messageIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .animate-typing-dot {
    animation: typingBounce 0.6s infinite ease-in-out;
  }
  .animate-cursor-blink {
    animation: cursorBlink 0.8s infinite;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your Livestock AI Assistant. How can I help verify your farm stats today?",
      sender: "bot",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false); // For the "..." bubble
  const [isStreaming, setIsStreaming] = useState(false); // For the text generation effect
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isStreaming, isOpen]);

  // --- STREAMING LOGIC ---
  const streamResponse = (fullText) => {
    setIsTyping(false); // Hide "..."
    setIsStreaming(true); // Start streaming mode

    const botMsgId = Date.now() + 1;

    // 1. Create empty bot message
    const newMsg = {
      id: botMsgId,
      text: "",
      sender: "bot",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isLive: true, // Flag to show cursor
    };

    setMessages((prev) => [...prev, newMsg]);

    // 2. Chunk text and append
    const words = fullText.split(" ");
    let i = 0;

    const interval = setInterval(() => {
      if (i >= words.length) {
        clearInterval(interval);
        setIsStreaming(false);
        // Remove 'isLive' flag to hide cursor
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId ? { ...msg, isLive: false } : msg
          )
        );
        return;
      }

      const nextChunk = words[i];
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMsgId
            ? { ...msg, text: msg.text + (i === 0 ? "" : " ") + nextChunk }
            : msg
        )
      );

      i++;
      scrollToBottom(); // Ensure we follow the stream
    }, 50); // Speed: 50ms per word (adjust for faster/slower typing)
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const messageToSend = inputValue;
    setInputValue("");
    setIsTyping(true);

    try {
      // --- FIX STARTS HERE ---
      // 1. Remove the hardcoded "Welcome" message (id: 1)
      // 2. Map to Gemini format
      let formattedHistory = messages
        .filter((msg) => msg.id !== 1) // Ignore the initial bot greeting
        .map((msg) => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        }));

      // 3. SLICING SAFETY:
      // If we slice purely by index (e.g. last 5), we might cut in the middle
      // and start with a 'model' reply. Gemini will crash.
      // So we take the last 10, then check the first element.
      formattedHistory = formattedHistory.slice(-10);

      // 4. FINAL SAFETY CHECK: Ensure the history starts with 'user'
      if (formattedHistory.length > 0 && formattedHistory[0].role === "model") {
        formattedHistory.shift(); // Remove the orphan bot message
      }
      // --- FIX ENDS HERE ---

      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          message: messageToSend,
          history: formattedHistory, // Send the sanitized history
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Server error");
      }

      if (data.reply) {
        streamResponse(data.reply);
      } else {
        streamResponse("I'm sorry, I couldn't process that request.");
      }
    } catch (err) {
      console.error("Chat Error:", err);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: `Error: ${err.message}`,
          sender: "bot",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }
  };
  return (
    <>
      <style>{animationStyles}</style>

      {/* --- Chat Window --- */}
      <div
        className={`
          fixed bottom-24 right-6 z-50
          w-[360px] h-[520px]
          bg-white dark:bg-zinc-900
          border border-zinc-200 dark:border-zinc-800
          rounded-2xl shadow-2xl
          flex flex-col overflow-hidden
          transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) origin-bottom-right
          ${
            isOpen
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-90 opacity-0 translate-y-8 pointer-events-none"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 absolute top-0 w-full z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full absolute -bottom-0.5 -right-0.5 border-2 border-white dark:border-zinc-900 z-10"></div>
              <div className="bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/40 dark:to-orange-900/20 p-2 rounded-xl text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-800/30">
                <Bot size={20} />
              </div>
            </div>
            <div>
              <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 leading-tight">
                Livestock AI
              </div>
              <div className="text-[11px] text-zinc-500 font-medium">
                Support Agent
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 px-5 pt-24 pb-4 overflow-y-auto no-scrollbar bg-zinc-50 dark:bg-zinc-950/50">
          <div className="flex flex-col gap-4">
            <div className="text-center">
              <span className="text-[10px] font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 px-2 py-1 rounded-full">
                Today
              </span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex w-full animate-message-in flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`
                    max-w-[85%] px-4 py-2.5 text-sm leading-relaxed shadow-sm relative group
                    ${
                      msg.sender === "user"
                        ? "bg-orange-600 text-white rounded-2xl rounded-tr-none"
                        : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 rounded-2xl rounded-tl-none"
                    }
                  `}
                >
                  {msg.text}
                  {/* Blinking Cursor during generation */}
                  {msg.isLive && (
                    <span className="inline-block w-1.5 h-3.5 bg-orange-500 ml-1 align-middle animate-cursor-blink"></span>
                  )}
                </div>
                <span className="text-[10px] text-zinc-400 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {/* "Thinking..." Bubble */}
            {isTyping && (
              <div className="flex flex-col items-start animate-message-in">
                <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center shadow-sm w-fit">
                  <div
                    className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-typing-dot"
                    style={{ animationDelay: "0s" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-typing-dot"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-typing-dot"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800"
        >
          <div className="relative flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/50 p-1.5 rounded-full border border-transparent focus-within:border-orange-500/30 focus-within:bg-white dark:focus-within:bg-zinc-800 focus-within:shadow-sm transition-all">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-transparent text-zinc-900 dark:text-zinc-100 px-4 text-sm focus:outline-none placeholder:text-zinc-400 h-9"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className={`
                h-9 w-9 rounded-full flex items-center justify-center transition-all duration-200
                ${
                  inputValue.trim()
                    ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md"
                    : "bg-zinc-200 dark:bg-zinc-700 text-zinc-400 cursor-not-allowed"
                }
              `}
            >
              <Send size={16} className={inputValue.trim() ? "ml-0.5" : ""} />
            </button>
          </div>
        </form>
      </div>

      {/* --- Floating Toggle Button --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          cursor-pointer
          fixed bottom-6 right-6 z-50
          h-14 w-14
          rounded-full
          bg-orange-600 text-white
          flex items-center justify-center
          /* Light Mode Shadow only */
          shadow-xl shadow-orange-500/20 
          /* Dark Mode: No colored shadow, subtle border */
          dark:shadow-none dark:border dark:border-zinc-700
          hover:scale-105 active:scale-95
          transition-all duration-300
        `}
      >
        <div className="relative w-6 h-6">
          <MessageSquare
            className={`absolute inset-0 transition-all duration-300 ${
              isOpen
                ? "opacity-0 rotate-90 scale-50"
                : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <X
            className={`absolute inset-0 transition-all duration-300 ${
              isOpen
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-90 scale-50"
            }`}
          />
        </div>
      </button>
    </>
  );
}
