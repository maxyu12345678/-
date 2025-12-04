import React, { useState, useCallback } from 'react';

interface OutlineDisplayProps {
  content: string;
}

const OutlineDisplay: React.FC<OutlineDisplayProps> = ({ content }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(content).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      // You could add user-facing error handling here if desired
    });
  }, [content]);

  const formattedContent = content
    .split('\n')
    .map((line, index) => {
      // Markdown-like headings
      if (line.startsWith('### ')) {
        return <h4 key={index} className="text-lg font-semibold text-slate-600 mt-4 mb-2">{line.substring(4)}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={index} className="text-xl font-bold text-cyan-800 mt-6 mb-3 border-b-2 border-cyan-200 pb-2">{line.substring(3)}</h3>;
      }
      if (line.startsWith('# ')) {
        return <h2 key={index} className="text-2xl font-extrabold text-teal-700 mt-8 mb-4">{line.substring(2)}</h2>;
      }
      
      // Markdown-like list items
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <li key={index} className="ml-5 list-disc text-slate-700 mb-2">
            {line.trim().substring(2)}
          </li>
        );
      }
      
      // Paragraphs
      if (line.trim().length > 0) {
        return <p key={index} className="text-slate-700 leading-relaxed mb-3">{line}</p>;
      }

      return null;
    });

  return (
    <div className="prose max-w-none bg-white p-6 md:p-8 rounded-lg shadow-inner border border-slate-200 mt-6 relative">
      <button
        onClick={handleCopy}
        disabled={isCopied}
        className={`absolute top-4 right-4 flex items-center px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ease-in-out border z-10
          ${isCopied
            ? 'bg-green-100 text-green-700 border-green-200'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
          }`}
        aria-label={isCopied ? "大綱已複製" : "複製大綱"}
      >
        {isCopied ? (
          <>
            <i className="fa-solid fa-check mr-2"></i>
            <span>已複製！</span>
          </>
        ) : (
          <>
            <i className="fa-solid fa-copy mr-2"></i>
            <span>複製大綱</span>
          </>
        )}
      </button>

      {formattedContent}
    </div>
  );
};

export default OutlineDisplay;
