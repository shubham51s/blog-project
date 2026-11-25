import { useEffect, useRef, useState } from "react";
import { FiMessageCircle, FiX, FiMinus, FiArrowUp } from "react-icons/fi";

// Simulated backend response
const mockAIResponse = async (message) => {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Dummy response
  return {
    count: 42,
  };
};

const AIChatbot = ({ onViewResults }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Submit message
  const handleSubmit = async (e) => {
    e?.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmedMessage,
      },
    ]);

    setMessage("");
    setIsLoading(true);

    try {
      const data = await mockAIResponse(trimmedMessage);

      // Add assistant response
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          count: data.count,
          query: trimmedMessage,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "error",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // View results
  const handleViewResults = (count, query) => {
    onViewResults?.({
      count,
      query,
    });
  };

  return (
    <>
      {/* Floating chatbot button */}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1a8917] text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-[#156d12]" aria-label="Open AI assistant">
          <FiMessageCircle size={25} />
        </button>
      )}

      {/* Chatbot window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[550px] w-[370px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:h-[600px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f5e9] text-[#1a8917]">
                <FiMessageCircle size={19} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">StoryNest AI</h3>

                <p className="text-xs text-gray-500">Your reading assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Minimize */}
              <button onClick={() => setIsOpen(false)} className="text-gray-400 transition hover:text-gray-700" aria-label="Minimize chatbot">
                <FiMinus size={19} />
              </button>

              {/* Close */}
              <button onClick={() => setIsOpen(false)} className="text-gray-400 transition hover:text-gray-700" aria-label="Close chatbot">
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex flex-1 flex-col gap-5 overflow-y-auto bg-[#fafafa] px-4 py-5">
            {/* Welcome screen */}
            {messages.length === 0 && (
              <div className="mt-8 flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f5e9] text-[#1a8917]">
                  <FiMessageCircle size={27} />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">What are you looking for?</h3>

                <p className="mt-2 max-w-[250px] text-sm leading-6 text-gray-500">Ask me anything. I'll help you discover relevant stories on StoryNest.</p>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {/* User message */}
                {msg.role === "user" && <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-[#1a8917] px-4 py-3 text-sm leading-6 text-white">{msg.content}</div>}

                {/* Assistant message */}
                {msg.role === "assistant" && (
                  <div className="max-w-[90%] rounded-2xl rounded-bl-sm border border-gray-100 bg-white px-4 py-3 text-sm leading-6 text-gray-700 shadow-sm">
                    <TypewriterResponse count={msg.count} onClick={() => handleViewResults(msg.count, msg.query)} />
                  </div>
                )}

                {/* Error message */}
                {msg.role === "error" && <div className="max-w-[90%] rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{msg.content}</div>}
              </div>
            ))}

            {/* Loading animation */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />

                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />

                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input section */}
          <form onSubmit={handleSubmit} className="border-t border-gray-100 bg-white p-4">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 transition focus-within:border-[#1a8917] focus-within:ring-1 focus-within:ring-[#1a8917]">
              <input ref={inputRef} type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask StoryNest AI..." disabled={isLoading} className="min-w-0 flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 disabled:opacity-60" />

              <button type="submit" disabled={!message.trim() || isLoading} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1a8917] text-white transition hover:bg-[#156d12] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400" aria-label="Send message">
                <FiArrowUp size={19} />
              </button>
            </div>

            <p className="mt-2 text-center text-[10px] text-gray-400">StoryNest AI can make mistakes. Verify important information.</p>
          </form>
        </div>
      )}
    </>
  );
};

// Assistant response with typing animation
const TypewriterResponse = ({ count, onClick }) => {
  const prefix = "Total results ";
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    setIsComplete(false);
    const interval = setInterval(() => {
      index++;
      setDisplayedText(prefix.slice(0, index));
      if (index >= prefix.length) {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div>
      {displayedText}
      {isComplete && (
        <button type="button" onClick={onClick} className="font-semibold text-[#1a8917] underline decoration-[#1a8917]/40 underline-offset-4 transition hover:text-[#156d12]">
          {count}
        </button>
      )}
      {!isComplete && <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-[#1a8917] align-middle" />}
    </div>
  );
};

export default AIChatbot;
