import React, { useEffect, useState } from "react";
import BlogSummary from ".";

function AiSummaryBtn({ blog }) {
  const [isOpen, setIsOpen] = useState(false);
  const [fullSummary, setFullSummary] = useState("");

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button" aria-label="Open AI blog summary" className="cursor-pointer ai-summary-button fixed bottom-7 right-7 z-40 flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-medium text-stone-800 shadow-lg shadow-stone-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5 text-emerald-700" aria-hidden="true">
          <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" strokeLinejoin="round" />
          <path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z" />
        </svg>
        <span>AI Summary</span>
      </button>
      {isOpen && <BlogSummary blog={blog} fullSummary={fullSummary} setFullSummary={setFullSummary} handleClose={handleClose} />}
    </>
  );
}

export default AiSummaryBtn;
