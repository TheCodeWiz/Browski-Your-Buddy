

"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
// import CodeSnippet from "../components/CodeBlock";
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
  }, [messages]);

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
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black no-scrollbar">
      {/* Header */}
      <div className="flex justify-center gap-50 ml-130 mt-3">
        <h1 className="p-5 text-4xl text-center font-semibold bg-gradient-to-l from-slate-700 via-slate-400 to-slate-100 bg-clip-text text-transparent cursor-default mb-2 -mt-2">
          Chat with Your Buddy
        </h1>
        <LinkedInIcon />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-2 no-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-full sm:max-w-[700px] md:max-w-[1150px] m-5 ${
                  msg.sender === "user"
                    ? "bg-[#072da1] text-white"
                    : "bg-[#0b111e] text-white"
                }`}
              >
                {msg.sender === "bot" ? (
                  <div className="overflow-x-auto">
                    <MarkdownMessage content={msg.text} />
                  </div>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className=" rounded-lg px-4 py-2 max-w-[320px] w-full">
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

      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto flex items-center gap-4 bg-[#0b111e] rounded-lg px-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-white p-4 focus:outline-none placeholder-gray-400"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="p-3 text-white hover:bg-gray-600 hover:cursor-pointer rounded-full disabled:opacity-50 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPage;









// "use client";

// import { useState, useEffect, FormEvent, useRef } from "react";
// import AttachmentButton from "@/components/AttachmentButton";
// import VoiceRecorder from "@/components/VoiceRecorder";
// import MarkdownMessage from '@/components/MarkdownMessage';
// // Add these types at the top of your page.tsx file
// interface Attachment {
//     file: File;
//     type: 'file' | 'image' | 'audio';
//     preview?: string;
// }

// type Message = {
//     id: number;
//     sender: "user" | "bot";
//     text: string;
//     attachments?: Attachment[];
// };
// const ChatPage = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [attachments, setAttachments] = useState<Attachment[]>([]);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleFileSelect = (files: File[]) => {
//     const newAttachments = files.map(file => ({
//       file,
//       type: 'file' as const
//     }));
//     setAttachments(prev => [...prev, ...newAttachments]);
//   };

//   const handleImageSelect = (files: File[]) => {
//     const newAttachments = files.map(file => ({
//       file,
//       type: 'image' as const,
//       preview: URL.createObjectURL(file)
//     }));
//     setAttachments(prev => [...prev, ...newAttachments]);
//   };

//   const handleVoiceRecording = async (audioBlob: Blob) => {
//     const file = new File([audioBlob], 'voice-message.wav', { type: 'audio/wav' });
//     setAttachments(prev => [...prev, { file, type: 'file' }]);
//   };

//   const removeAttachment = (index: number) => {
//     setAttachments(prev => prev.filter((_, i) => i !== index));
//   };
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!input.trim() && attachments.length === 0) return;

//     // Create FormData instance
//     const formData = new FormData();
//     formData.append('message', input.trim());
    
//     // Add all attachments
//     attachments.forEach((att, index) => {
//         formData.append(`attachment${index}`, att.file);
//     });

//     const userMessage: Message = {
//         id: Date.now(),
//         sender: "user",
//         text: input.trim(),
//         attachments: attachments
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInput("");
//     setAttachments([]); // Clear attachments after sending
//     setLoading(true);

//     try {
//         const response = await fetch("/api/chat", {
//             method: "POST",
//             body: formData, // Send formData instead of JSON
//         });

//         const data = await response.json();
//         if (response.ok) {
//             const botMessage: Message = {
//                 id: Date.now() + 1,
//                 sender: "bot",
//                 text: data.response
//             };
//             setMessages(prev => [...prev, botMessage]);
//         } else {
//             throw new Error(data.error || "Something went wrong!");
//         }
//     } catch (err) {
//         console.error("Error:", err);
//         const errorMessage: Message = {
//             id: Date.now() + 1,
//             sender: "bot",
//             text: "An unexpected error occurred."
//         };
//         setMessages(prev => [...prev, errorMessage]);
//     } finally {
//         setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black no-scrollbar">
//       {/* Header */}
//       <h1 className="p-5 text-3xl text-center font-semibold bg-gradient-to-l from-slate-700 via-slate-400 to-slate-100 bg-clip-text text-transparent">
//         Chat with Your Buddy
//       </h1>

//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar ">
//         {messages.map((msg) => (
//             <div
//                 key={msg.id}
//                 className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
//             >
//                 <div
//                     className={`rounded-lg px-4 py-2 max-w-xl ${
//                         msg.sender === "user"
//                             ? "bg-[#072da1] text-white"
//                             : "bg-[#0b111e] text-white"
//                     }`}
//                 >
//                     {msg.text}
//                     {msg.attachments && msg.attachments.length > 0 && (
//                         <div className="mt-2 flex flex-wrap gap-2">
//                             {msg.attachments.map((att, index) => (
//                                 <div key={index} className="relative group">
//                                     {att.type === 'image' ? (
//                                         <img
//                                             src={att.preview}
//                                             alt="attachment"
//                                             className="h-20 w-20 object-cover rounded"
//                                         />
//                                     ) : att.file.type.startsWith('audio/') ? (
//                                         <audio
//                                             controls
//                                             className="max-w-[200px]"
//                                             src={URL.createObjectURL(att.file)}
//                                         />
//                                     ) : (
//                                         <div className="flex items-center space-x-2 bg-gray-700 rounded p-2">
//                                             <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
//                                                 <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
//                                             </svg>
//                                             <span className="text-sm truncate">
//                                                 {att.file.name}
//                                             </span>
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         ))}
//         {loading && (
//           <div className="flex justify-start">
//             <div className="bg-[#0b111e] rounded-lg px-4 py-2">
//               <div className="flex space-x-2">
//                 <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
//                 <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-100" />
//                 <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-200" />
//               </div>
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800 ">
//         {attachments.length > 0 && (
//           <div className="flex flex-wrap gap-2  ">
//             {attachments.map((att, index) => (
//               <div key={index} className="relative group ">
//                 {att.type === 'image' ? (
//                   <img
//                     src={att.preview}
//                     alt="attachment"
//                     className="h-16 w-16 object-cover rounded "
//                   />
//                 ) : (
//                   <div className="h-16 w-16 bg-gray-700 rounded flex items-center justify-center ">
//                     📎
//                   </div>
//                 )}
//                 <button
//                   type="button"
//                   onClick={() => removeAttachment(index)}
//                   className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity "
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="max-w-4xl mx-auto flex items-center gap-4 bg-[#0b111e] rounded-lg px-4">
//           <AttachmentButton
//             onFileSelect={handleFileSelect}
//             onImageSelect={handleImageSelect}
//           />
//           <VoiceRecorder onRecordingComplete={handleVoiceRecording} />
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 bg-transparent text-white p-4 focus:outline-none placeholder-gray-400"
//             disabled={loading}
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="p-3 text-white  rounded-full disabled:opacity-50 transition-colors hover:cursor-pointer hover:bg-gray-600"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//               />
//             </svg>
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ChatPage;