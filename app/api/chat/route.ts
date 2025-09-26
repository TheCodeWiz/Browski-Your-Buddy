

import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { error } from "console";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY});

export async function POST(request: Request){
    try{
        const { message } = await request.json();
        if(!message){
            return NextResponse.json(
                {error: "Message is required! "},
                {status: 400}
            );
        }
        const chatCompletion = await groq.chat.completions.create({
            messages: [{
                role: "user",
                content: message,
            }],
            model: "openai/gpt-oss-120b"
        });
        const responseMessage = chatCompletion.choices[0]?.message?.content || "No Response From LLama 3";
        return NextResponse.json({
            response: responseMessage 
        });
    }
    catch(err){
        console.error("error in chat route", err);
        return NextResponse.json(
            {error: "Internal Server error"},
            {status: 500}
        );
    }
}



// import { NextResponse } from "next/server";
// import Groq from "groq-sdk";

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// export async function POST(request: Request) {
//     try {
//         // Add debugging for request body
//         const text = await request.text();
//         console.log('Request body:', text);
        
//         // Parse JSON with error handling
//         let body;
//         try {
//             body = JSON.parse(text);
//         } catch (e) {
//             console.error('JSON parse error:', e);
//             return NextResponse.json(
//                 { error: "Invalid JSON in request body" },
//                 { status: 400 }
//             );
//         }

//         const { message } = body;

//         if (!message || typeof message !== 'string') {
//             return NextResponse.json(
//                 { error: "Message is required and must be a string" },
//                 { status: 400 }
//             );
//         }

//         const chatCompletion = await groq.chat.completions.create({
//             messages: [{
//                 role: "user",
//                 content: message,
//             }],
//             model: "openai/gpt-oss-120b",  // Using the currently supported model
//         });

//         const responseMessage = chatCompletion.choices[0]?.message?.content || "No response generated";
        
//         return NextResponse.json({
//             response: responseMessage
//         });
//     } catch (err) {
//         console.error("Error in chat route:", err);
//         return NextResponse.json(
//             { error: "Internal server error" },
//             { status: 500 }
//         );
//     }
// }



// import { NextResponse } from "next/server";
// import Groq from "groq-sdk";

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// export async function POST(request: Request) {
//     try {
//         // Handle multipart form data
//         const formData = await request.formData();
//         const message = formData.get('message') as string;
//         const attachments = [];

//         // Process attachments
//         for (const [key, value] of formData.entries()) {
//             if (key.startsWith('attachment')) {
//                 const file = value as File;
//                 attachments.push({
//                     name: file.name,
//                     type: file.type,
//                     size: file.size
//                 });
//             }
//         }

//         // Prepare context with attachments info
//         let contextMessage = message || "";
//         if (attachments.length > 0) {
//             contextMessage += "\n\nAttachments:\n" + 
//                 attachments.map(a => `- ${a.name} (${a.type})`).join("\n");
//         }

//         const chatCompletion = await groq.chat.completions.create({
//             messages: [{
//                 role: "user",
//                 content: contextMessage,
//             }],
//             model: "openai/gpt-oss-120b",
//         });

//         return NextResponse.json({
//             response: chatCompletion.choices[0]?.message?.content || "No response generated"
//         });
//     } catch (err) {
//         console.error("Error in chat route:", err);
//         return NextResponse.json(
//             { error: "Internal server error" },
//             { status: 500 }
//         );
//     }
// }