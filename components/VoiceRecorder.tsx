// // import { useState, useRef } from 'react';

// // interface VoiceRecorderProps {
// //   onRecordingComplete: (audioBlob: Blob) => void;
// // }

// // const VoiceRecorder = ({ onRecordingComplete }: VoiceRecorderProps) => {
// //   const [isRecording, setIsRecording] = useState(false);
// //   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
// //   const chunksRef = useRef<Blob[]>([]);

// //   const startRecording = async () => {
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
// //       const mediaRecorder = new MediaRecorder(stream);
// //       mediaRecorderRef.current = mediaRecorder;
// //       chunksRef.current = [];

// //       mediaRecorder.ondataavailable = (e) => {
// //         if (e.data.size > 0) {
// //           chunksRef.current.push(e.data);
// //         }
// //       };

// //       mediaRecorder.onstop = () => {
// //         const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
// //         onRecordingComplete(audioBlob);
// //       };

// //       mediaRecorder.start();
// //       setIsRecording(true);
// //     } catch (err) {
// //       console.error('Error accessing microphone:', err);
// //     }
// //   };

// //   const stopRecording = () => {
// //     if (mediaRecorderRef.current) {
// //       mediaRecorderRef.current.stop();
// //       setIsRecording(false);
// //     }
// //   };

// //   return (
// //     <button
// //       type="button"
// //       onClick={isRecording ? stopRecording : startRecording}
// //       className={`p-2 ${isRecording ? 'text-red-500' : 'text-gray-400'} hover:text-white rounded-full hover:cursor-pointer hover:bg-gray-600 transition-colors`}
// //     >
// //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
// //       </svg>
// //     </button>
// //   );
// // };

// // export default VoiceRecorder;


// import { useState, useRef } from 'react';

// interface VoiceRecorderProps {
//   onRecordingComplete: (recording: {
//     file: File;
//     type: 'audio';
//     preview: string;
//   }) => void;
// }

// const VoiceRecorder = ({ onRecordingComplete }: VoiceRecorderProps) => {
//   const [isRecording, setIsRecording] = useState(false);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const chunksRef = useRef<Blob[]>([]);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = mediaRecorder;
//       chunksRef.current = [];

//       mediaRecorder.ondataavailable = (e) => {
//         if (e.data.size > 0) {
//           chunksRef.current.push(e.data);
//         }
//       };

//       mediaRecorder.start();
//       setIsRecording(true);
//     } catch (err) {
//       console.error('Error accessing microphone:', err);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
      
//       // Create audio file when recording stops
//       const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
//       const file = new File([audioBlob], 'voice-message.wav', { type: 'audio/wav' });
//       onRecordingComplete({
//         file,
//         type: 'audio' as const,
//         preview: URL.createObjectURL(audioBlob)
//       });

//       // Clean up the media stream
//       const tracks = mediaRecorderRef.current.stream.getTracks();
//       tracks.forEach(track => track.stop());
//     }
//   };

//   return (
//     <button
//       type="button"
//       onClick={isRecording ? stopRecording : startRecording}
//       className={`p-2 ${isRecording ? 'text-red-500' : 'text-gray-400'} hover:text-white rounded-full hover:cursor-pointer hover:bg-gray-600 transition-colors`}
//     >
//       <svg 
//         xmlns="http://www.w3.org/2000/svg" 
//         className="h-6 w-6" 
//         fill="none" 
//         viewBox="0 0 24 24" 
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
//         />
//       </svg>
//     </button>
//   );
// };

// export default VoiceRecorder;