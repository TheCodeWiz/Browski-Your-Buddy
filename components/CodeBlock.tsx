// components/CodeBlock.tsx
import React from "react";

type CodeBlockProps = {
  code: string;
  language?: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "tsx" }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="relative bg-[#23272a] rounded-lg p-4 my-2 shadow-md ">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded hover:bg-gray-700 active:bg-gray-800 "
        aria-label="Copy code"
      >
        {/* Copy SVG icon code here */}
      </button>
      <pre className="whitespace-pre-wrap overflow-x-auto  ">
        <code className={`language-${language} `}>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
