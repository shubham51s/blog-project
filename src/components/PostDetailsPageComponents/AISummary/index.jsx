import { useEffect, useRef, useState } from "react";
import { useRequestHandler } from "../../../hooks/requestHandler";
import aiImg from "../../../assets/images/ai-summary.png";

function BlogSummary({ blog, fullSummary, setFullSummary, handleClose }) {
  const { requestHandler } = useRequestHandler();
  const [status, setStatus] = useState(fullSummary ? "done" : "loading");
  const [typingIndex, setTypingIndex] = useState(fullSummary ? fullSummary.length : 0);
  const visibleSummary = fullSummary.slice(0, typingIndex);
  const toggleTimeout = useRef(null);
  const [isShow, setIsShow] = useState(false);

  const generateSummary = async () => {
    setStatus("loading");
    setTypingIndex(0);

    try {
      controller.value = new AbortController();
      const response = await requestHandler(`/blogs/get-ai-summary/${blog._id}`);
      const result = await response.json();

      if (response?.status === 200 && result?.data?.summary) {
        setFullSummary(result.data.summary);
        setStatus("typing");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    if (status !== "typing") return;

    if (typingIndex >= fullSummary.length) {
      setStatus("done");
      return;
    }

    const timer = setTimeout(() => {
      setTypingIndex((index) => Math.min(index + 2, fullSummary.length));
    }, 14);

    return () => clearTimeout(timer);
  }, [status, typingIndex, fullSummary]);

  const onCloseBtnClick = () => {
    if (toggleTimeout.current) {
      clearTimeout(toggleTimeout.current);
      toggleTimeout.current = null;
    }

    setIsShow(false);
    toggleTimeout.current = setTimeout(() => {
      handleClose();
      toggleTimeout.current = null;
    }, 200);
  };

  useEffect(() => {
    setIsShow(true);
    if (!fullSummary) {
      generateSummary();
    }
  }, []);

  return (
    <div className="fixed w-screen h-screen inset-0 z-999 bg-transparent" onClick={() => onCloseBtnClick()}>
      <aside onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="summary-title" className={`absolute top2 bottom-0 right-0 overflow-x-hidden flex max-w-full flex-col border-l border-stone-200 bg-white shadow-2xl shadow-stone-900/10 transition-all duration-200 linear ${isShow ? "w-[420px]" : "!w-0"}`}>
        <header className="flex items-center justify-between border-b border-stone-100 px-7 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full">
              {/* <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5 text-emerald-700" aria-hidden="true">
                <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" strokeLinejoin="round" />
              </svg> */}
              <img src={aiImg} className="w-[70%] h-[70%]" />
            </div>
            <div>
              <h2 id="summary-title" className="text-base font-semibold tracking-tight text-stone-900">
                AI Summary
              </h2>
              <p className="mt-0.5 text-xs text-stone-500">The key ideas, at a glance</p>
            </div>
          </div>
          <button type="button" onClick={onCloseBtnClick} aria-label="Close summary" className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden="true">
              <path d="m18 6-12 12M6 6l12 12" />
            </svg>
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-7 py-8">
          {status === "loading" && (
            <div role="status" aria-live="polite" className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-600" />
                <p className="text-sm font-medium text-stone-700">Reading through the article...</p>
              </div>
              <div className="space-y-3">
                <div className="h-3 w-full animate-pulse rounded bg-stone-100" />
                <div className="h-3 w-[94%] animate-pulse rounded bg-stone-100" />
                <div className="h-3 w-[87%] animate-pulse rounded bg-stone-100" />
                <div className="h-3 w-full animate-pulse rounded bg-stone-100" />
                <div className="h-3 w-[65%] animate-pulse rounded bg-stone-100" />
              </div>
              <p className="text-xs leading-5 text-stone-400">Finding the main ideas and key takeaways.</p>
            </div>
          )}
          {(status === "typing" || status === "done") && (
            <div>
              <div className="mb-6 flex items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800">Article summary</span>
                {status === "typing" && <span className="text-xs text-stone-400">Generating...</span>}
              </div>
              <p aria-live="polite" className="whitespace-pre-wrap text-[15px] leading-7 text-stone-700">
                {visibleSummary}
                {status === "typing" && <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse bg-emerald-700" aria-hidden="true" />}
              </p>
              {status === "done" && false && (
                <div className="mt-8 border-t border-stone-100 pt-5">
                  <p className="text-xs leading-5 text-stone-400">AI-generated summary. Refer to the original article for the complete context.</p>
                </div>
              )}
            </div>
          )}
          {status === "error" && (
            <div role="alert" className="w-full h-full flex flex-col items-center justify-center px-2 pt-16 text-center">
              <h3 className="mt-5 text-base font-semibold text-stone-900">Couldn't generate a summary</h3>
              <p className="mt-2 max-w-[270px] text-sm leading-6 text-stone-500">Something went wrong while summarizing this article. Please try again.</p>
              <button type="button" onClick={generateSummary} className="cursor-pointer mt-6 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2">
                Try again
              </button>
            </div>
          )}
        </div>
        <footer className="border-t border-stone-100 px-7 py-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400 invisible">Powered by AI</span>
            <button type="button" onClick={onCloseBtnClick} className="cursor-pointer rounded-full px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600">
              Close
            </button>
          </div>
        </footer>
      </aside>
    </div>
  );
}

export default BlogSummary;
