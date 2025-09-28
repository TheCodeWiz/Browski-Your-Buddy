
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";


// Copy button utility
const CopyButton: React.FC<{ content: string }> = ({ content }) => {
  const handleCopy = () => navigator.clipboard.writeText(content);


  return (
    <button
      className="absolute top-2 right-2 p-2 rounded hover:bg-gray-700 hover:cursor-pointer active:bg-gray-800"
      aria-label="Copy code"
      onClick={handleCopy}
      type="button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" strokeWidth="2" /><rect x="3" y="3" width="13" height="13" rx="2" strokeWidth="2" /></svg>
     </button>
  );
};


const MarkdownMessage = ({ content }: { content: string }) => {
  // Add error boundary
  if (!content) return null;


  return (
   <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              {children}
            </a>
          ),
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";

            if (inline) {
              return <code className="bg-[#2d2d2d] px-1 rounded" {...props}>{children}</code>;
            }


            return (
              <div className="relative bg-[#23272a] rounded-lg p-4 my-2 shadow-md">
                <CopyButton content={String(children)} />
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={language}
                  PreTag="div"
                  customStyle={{ margin: 0, background: "transparent" }}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            
            );
          },
          h1: ({ children }) => <h1 className="mt-4 mb-2 text-2xl font-bold">{children}</h1>,
          h2: ({ children }) => <h2 className="mt-3 mb-2 text-xl font-bold">{children}</h2>,
          h3: ({ children }) => <h3 className="mt-2 mb-2 text-lg font-bold">{children}</h3>,
          ul: ({ children }) => <ul className="list-disc ml-8 my-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal ml-8 my-2">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          p: ({ children }) => <p className="my-2 leading-relaxed">{children}</p>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-600 pl-4 my-2 italic">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};



export default MarkdownMessage;
