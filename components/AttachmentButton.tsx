// import { useState, useRef } from 'react';

// interface AttachmentButtonProps {
//   onFileSelect: (files: File[]) => void;
//   onImageSelect: (images: File[]) => void;
// }

// const AttachmentButton = ({ onFileSelect, onImageSelect }: AttachmentButtonProps) => {
//   const [showOptions, setShowOptions] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const imageInputRef = useRef<HTMLInputElement>(null);

//   const handleFileClick = () => {
//     fileInputRef.current?.click();
//     setShowOptions(false);
//   };

//   const handleImageClick = () => {
//     imageInputRef.current?.click();
//     setShowOptions(false);
//   };

//   return (
//     <div className="relative">
//       <button
//         type="button"
//         onClick={() => setShowOptions(!showOptions)}
//         className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:cursor-pointer hover:bg-gray-600"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
//         </svg>
//       </button>

//       {showOptions && (
//         <div className="absolute bottom-full mb-2 left-0 bg-gray-800 rounded-lg shadow-lg p-2 min-w-[150px]">
//           <button
//             type="button"
//             onClick={handleFileClick}
//             className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded"
//           >
//             Attach File
//           </button>
//           <button
//             type="button"
//             onClick={handleImageClick}
//             className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded"
//           >
//             Attach Image
//           </button>
//         </div>
//       )}

//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={(e) => {
//           if (e.target.files) onFileSelect(Array.from(e.target.files));
//         }}
//         className="hidden"
//         multiple
//       />

//       <input
//         type="file"
//         ref={imageInputRef}
//         accept="image/*"
//         onChange={(e) => {
//           if (e.target.files) onImageSelect(Array.from(e.target.files));
//         }}
//         className="hidden"
//         multiple
//       />
//     </div>
//   );
// };

// export default AttachmentButton;