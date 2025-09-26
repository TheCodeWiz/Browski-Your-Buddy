# AI Chat Buddy 🤖

A modern, elegant chatbot powered by Groq's advanced language models. Built with Next.js 14, TypeScript, and Tailwind CSS, this project demonstrates real-time AI interactions with support for multiple file formats and voice input.

![Chat Interface Preview](ChatBot.png)

## ✨ Features

### Core Capabilities
- 🧠 Powered by Groq's LLM (Large Language Model)
- 💬 Real-time chat interface
- 🎨 Modern, responsive design
- 🌓 Dark mode optimized
- ⚡ Lightning-fast responses
- 📋 Code snippet highlighting

### Technical Highlights
- 🔄 Server-Side Rendering (SSR)
- 🛡️ TypeScript for type safety
- 🎯 Zero-dependency state management
- 🚀 Edge runtime support

## 🚨 Important Note

**This chatbot operates without a database backend.** All conversations and interactions are ephemeral and will be cleared upon page refresh. This design choice ensures:
- 🔒 Maximum privacy
- 💨 Minimal latency
- ☁️ Zero storage overhead
- 📈 Improved performance

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/TheCodeWiz/BudAI-Your-Buddy.git
cd ai-chat-buddy
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```
Add your Groq API key to `.env.local`:
```
GROQ_API_KEY=your_api_key_here
```

4. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to see your chatbot in action!

## 🎯 Usage Examples

### Text Chat
```typescript
// Simple text interaction
"Tell me about artificial intelligence"

// Code-related queries
"How do I implement a binary search tree in TypeScript?"
```


## 🧪 Technologies Used

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Groq API
- **Voice Processing**: Web Audio API
- **Code Highlighting**: Prism.js
- **Markdown**: React-Markdown

## 🔧 Configuration



```env
GROQ_API_KEY=your_api_key
```

## 🚀 Deployment

Deploy easily to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ai-chat-buddy)

## 📈 Performance

- **Response Time**: <100ms
- **Time to First Byte (TTFB)**: <200ms
<!-- - **Lighthouse Score**: 95+ across all metrics -->

## 👨‍💻 Author

Manav Bhatt
- LinkedIn: [manav-bhatt1409](https://www.linkedin.com/in/manav-bhatt1409/)
- GitHub: [Your GitHub Profile](https://github.com/yourusername)

## 💡 Future Enhancements

- [ ] Integration with multiple AI models
- [ ] Real-time collaboration features
- [ ] Custom theme support
- [ ] Enhanced file processing capabilities
- [ ] Advanced voice command system

---

<p align="center">
  Made with ❤️ by Manav Bhatt
</p>