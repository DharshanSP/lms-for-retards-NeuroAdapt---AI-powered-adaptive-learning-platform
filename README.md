# 🧠 NeuroAdapt

**Education that adapts to you.**

NeuroAdapt is an AI-powered adaptive learning platform designed for learners with cognitive and visual accessibility needs — including **dyslexia**, **ADHD**, and **low vision**. It transforms any educational content into a personalized, distraction-free learning experience.

---

## ✨ Features

### 🎯 Adaptive Learning Modes
- **Dyslexia Mode** — OpenDyslexic font, increased letter/line spacing, paragraph-friendly layout
- **ADHD Focus Mode** — Distraction-reduced interface with calming themes (Calm, Sage, Dark) and click-to-focus paragraph highlighting
- **Low Vision Mode** — High-contrast styling, bold links, and enlarged UI elements

### 🤖 AI-Powered Content Transformation
- Powered by **Google Gemini AI** to simplify and restructure lesson content
- Generates keyword tooltips with contextual definitions
- Adapts reading level and structure to the learner's accessibility profile

### 📚 Multiple Input Methods
- **Demo Lesson** — Try the platform instantly with a pre-loaded lesson
- **Paste Text** — Paste any educational content and have it adapted in real time
- **Upload Lesson** — Upload lesson files for AI-driven transformation

### 🗣️ Speech Navigation
- Voice-controlled navigation for hands-free learning
- Read-aloud with synchronized word highlighting

### ♿ Accessibility Toolbar
- Font size controls
- High-contrast toggle
- Mode switcher accessible from any page

### 🧩 Browser Extension (AdaptLearn)
- Chrome/Edge extension (Manifest V3) for applying accessibility styles to **any website**
- Dyslexia, ADHD Focus, and Low Vision modes — no network calls, pure CSS/DOM transforms
- Persistent settings via `chrome.storage.sync`

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | TypeScript |
| **UI** | React 19, Tailwind CSS 4, Radix UI |
| **AI** | Google Gemini (`@google/genai`) |
| **Icons** | Lucide React |
| **Font** | OpenDyslexic (via `@fontsource/opendyslexic`) |
| **Extension** | Chrome/Edge Manifest V3 |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** (or yarn/pnpm/bun)

### Installation

```bash
# Clone the repository
git clone https://github.com/DharshanSP/lms-for-retards.git
cd lms-for-retards

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

Create a `.env.local` file in the project root:

```env
GOOGLE_GENAI_API_KEY=your_gemini_api_key_here
```

---

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/transform/      # AI content transformation API route
│   ├── learn/              # Learning interface (demo, paste, upload)
│   ├── profile/            # User accessibility preferences
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/             # Reusable React components
│   ├── AccessibilityToolbar.tsx
│   ├── LessonContent.tsx   # Core lesson renderer
│   ├── ModeSelector.tsx    # Accessibility mode picker
│   ├── SpeechNavTrigger.tsx # Voice navigation
│   └── ui/                 # Base UI primitives
├── contexts/               # React Context providers
│   ├── AccessibilityContext.tsx
│   └── SpeechNavContext.tsx
├── data/                   # Static lesson data & glossary
├── extension/              # Chrome/Edge browser extension
│   ├── manifest.json
│   ├── contentScript.js
│   ├── popup/
│   └── assets/
├── lib/                    # Utility functions
├── types/                  # TypeScript type definitions
└── public/                 # Static assets
```

---

## 🧩 Browser Extension

The **AdaptLearn** extension brings NeuroAdapt's accessibility features to any website.

1. Go to `chrome://extensions` (or `edge://extensions`)
2. Enable **Developer mode**
3. Click **Load unpacked** and select the `extension/` folder

See [extension/README.md](extension/README.md) for detailed usage.

---


---

<p align="center">
  Built with ❤️ for accessible education
</p>
