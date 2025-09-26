// components/CopyButton.tsx
import { useState } from 'react';

export const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyToClipboard}
      className="absolute top-2 right-2 p-2 rounded-lg bg-gray-800 text-white text-sm"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};