import { useMemo, useState } from 'react';

const demoSections = [
  {
    title: 'What is Inclusive Learning?',
    text: 'Inclusive learning means every person can understand material in ways that fit their needs. We can change pacing, format, and support tools so learning feels safe and clear. This lesson shows how one topic can adapt across reading, focus, audio, and visual support modes.',
  },
  {
    title: 'Why Adaptation Helps',
    text: 'Some learners need simpler wording. Others need fewer distractions. Some need audio support, larger text, or visual emphasis. Adaptation does not lower quality. It removes barriers so people can focus on ideas.',
  },
  {
    title: 'Learning at Your Pace',
    text: 'You can move section by section with clear progress and calm controls. You can pause, replay, and adjust text size. This helps build confidence and reduces cognitive fatigue over time.',
  },
];

const profileQuestions = [
  {
    key: 'readingMode',
    title: 'Preferred reading mode?',
    options: ['Normal', 'Dyslexia-friendly', 'ADHD Focus', 'Audio-first'],
  },
  {
    key: 'audioAssist',
    title: 'Need audio assistance?',
    options: ['Yes', 'No'],
  },
  {
    key: 'hearingAssist',
    title: 'Hearing assistance?',
    options: ['Captions emphasis', 'Visual cues', 'Sign-language ready placeholder'],
  },
  {
    key: 'focusDuration',
    title: 'Focus duration?',
    options: ['5 min', '10 min', '20 min'],
  },
  {
    key: 'difficulty',
    title: 'Text difficulty preference?',
    options: ['Simplified', 'Standard', 'Advanced'],
  },
];

const modeLabels = ['Normal', 'Dyslexia', 'ADHD Focus', 'Audio Mode', 'Hearing Support'];

function LargeButton({ children, active, ...props }) {
  return (
    <button
      className={`min-h-11 w-full rounded-2xl border-2 px-6 py-4 text-left text-lg font-semibold transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
        active
          ? 'border-black bg-black text-[#f8f4e8] dark:border-[#f8f4e8] dark:bg-[#f8f4e8] dark:text-black'
          : 'border-black bg-[#f8f4e8] text-black hover:bg-[#ece7d8] dark:border-[#f8f4e8] dark:bg-[#111] dark:text-[#f8f4e8] dark:hover:bg-[#222]'
      }`}
      {...props}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [lessonText, setLessonText] = useState(demoSections);
  const [profile, setProfile] = useState({});

  const [activeMode, setActiveMode] = useState('Normal');
  const [fontSize, setFontSize] = useState(22);
  const [highContrast, setHighContrast] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [sectionIndex, setSectionIndex] = useState(0);

  const [showHelper, setShowHelper] = useState(false);
  const [helperQuestion, setHelperQuestion] = useState('');
  const [helperAnswer, setHelperAnswer] = useState('');

  const maxSection = lessonText.length;
  const section = lessonText[sectionIndex];

  const paragraphChunks = useMemo(() => section.text.split('. ').filter(Boolean), [section]);
  const highlightedSentence = paragraphChunks[0] ? `${paragraphChunks[0]}.` : section.text;

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    if (mode === 'Hearing Support') {
      setCaptionsOn(true);
    }
    if (mode === 'Audio Mode') {
      setAudioPlaying(true);
    }
  };

  const submitHelper = () => {
    if (!helperQuestion.trim()) return;
    setHelperAnswer('Simple explanation: Break the section into one key idea. Read one sentence slowly, then pause. Repeat the main idea in your own words. Move forward only when it feels clear.');
  };

  const onKeyAudioPause = (event) => {
    if (event.code === 'Space') {
      event.preventDefault();
      setAudioPlaying((previous) => !previous);
    }
  };

  const themeClasses = `${darkMode ? 'dark bg-black text-[#f8f4e8]' : 'bg-[#f8f4e8] text-black'} ${highContrast ? 'contrast-125' : ''}`;

  return (
    <div className={`${themeClasses} min-h-screen font-accessible leading-relaxed`} onKeyDown={onKeyAudioPause}>
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-8 sm:px-8">
        {screen === 'landing' && (
          <section className="m-auto flex w-full max-w-[700px] flex-col items-center gap-8 text-center">
            <h1 className="text-5xl font-bold">Calm Learning</h1>
            <p className="text-2xl">Education that adapts to you.</p>
            <div className="flex w-full flex-col gap-4">
              <LargeButton aria-label="Upload lesson" onClick={() => setScreen('profile')}>
                Upload Lesson
              </LargeButton>
              <LargeButton aria-label="Paste text" onClick={() => setScreen('profile')}>
                Paste Text
              </LargeButton>
              <LargeButton
                aria-label="Try demo lesson"
                onClick={() => {
                  setLessonText(demoSections);
                  setScreen('learning');
                }}
              >
                Try Demo Lesson
              </LargeButton>
            </div>
          </section>
        )}

        {screen === 'profile' && (
          <section className="mx-auto flex w-full max-w-[700px] flex-col gap-6">
            <h2 className="text-3xl font-bold">Learner Profile Setup</h2>
            {profileQuestions.map((question) => (
              <article key={question.key} className="rounded-2xl border-2 border-black p-6 dark:border-[#f8f4e8]">
                <h3 className="mb-4 text-xl font-semibold">{question.title}</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {question.options.map((option) => (
                    <LargeButton
                      key={option}
                      active={profile[question.key] === option}
                      aria-label={`${question.title} ${option}`}
                      onClick={() => setProfile((prev) => ({ ...prev, [question.key]: option }))}
                    >
                      {option}
                    </LargeButton>
                  ))}
                </div>
              </article>
            ))}
            <LargeButton aria-label="Start lesson" onClick={() => setScreen('learning')}>
              Start Lesson
            </LargeButton>
          </section>
        )}

        {screen === 'learning' && (
          <section className="mx-auto flex w-full max-w-[700px] flex-1 flex-col gap-8">
            <header className="rounded-2xl border-2 border-black p-4 dark:border-[#f8f4e8]">
              <div className="mb-4 grid gap-3 sm:grid-cols-2">
                {modeLabels.map((mode) => (
                  <LargeButton
                    key={mode}
                    active={activeMode === mode}
                    aria-label={`Switch to ${mode}`}
                    onClick={() => handleModeChange(mode)}
                  >
                    {mode}
                  </LargeButton>
                ))}
              </div>

              <div className="space-y-4">
                <label className="flex min-h-11 flex-col gap-2 text-lg font-semibold" htmlFor="fontSize">
                  Font Size: {fontSize}px
                  <input
                    id="fontSize"
                    aria-label="Adjust font size"
                    className="h-4 accent-black dark:accent-[#f8f4e8]"
                    type="range"
                    min="18"
                    max="34"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                  />
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  <LargeButton aria-label="Toggle high contrast" onClick={() => setHighContrast((prev) => !prev)}>
                    Contrast Toggle
                  </LargeButton>
                  <LargeButton aria-label="Toggle dark mode" onClick={() => setDarkMode((prev) => !prev)}>
                    Dark Mode Toggle
                  </LargeButton>
                  <LargeButton aria-label="Read aloud" onClick={() => setAudioPlaying(true)}>
                    Read Aloud
                  </LargeButton>
                  <LargeButton aria-label="Show captions" onClick={() => setCaptionsOn((prev) => !prev)}>
                    Show Captions
                  </LargeButton>
                  <LargeButton aria-label="Pause audio" onClick={() => setAudioPlaying(false)}>
                    Pause Audio (Spacebar)
                  </LargeButton>
                </div>
              </div>
            </header>

            <article
              aria-live="polite"
              className={`rounded-2xl border-2 border-black p-6 transition-all dark:border-[#f8f4e8] ${
                activeMode === 'Dyslexia' ? 'bg-[#f3ecdc] tracking-widest dark:bg-[#211d15]' : ''
              } ${activeMode === 'ADHD Focus' ? 'bg-black/10 dark:bg-white/10' : ''}`}
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
            >
              <h2 className="mb-4 text-3xl font-bold">{section.title}</h2>

              {activeMode === 'ADHD Focus' ? (
                <div className="space-y-4">
                  <p className="rounded-xl bg-[#fff9ec] p-4 dark:bg-[#1a1a1a]">{section.text}</p>
                  <p className="rounded-xl border-2 border-black p-4 font-semibold dark:border-[#f8f4e8]">
                    Highlighted sentence: {highlightedSentence}
                  </p>
                  <p className="font-semibold">
                    Section {sectionIndex + 1} of {maxSection}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className={`${activeMode === 'Audio Mode' && audioPlaying ? 'rounded-lg bg-yellow-200 p-2 text-black' : ''}`}>
                    {section.text}
                  </p>

                  {(captionsOn || activeMode === 'Hearing Support') && (
                    <div className="rounded-xl border-2 border-black p-4 font-semibold dark:border-[#f8f4e8]">
                      Captions: Inclusive learning removes barriers so everyone can understand clearly.
                    </div>
                  )}

                  {activeMode === 'Hearing Support' && (
                    <div className="space-y-3 rounded-xl bg-[#fff9ec] p-4 dark:bg-[#1a1a1a]">
                      <p>
                        <strong>Key Terms:</strong> Inclusive learning, adaptation, confidence.
                      </p>
                      <p>Visual cue: ==== New idea starts here ====</p>
                      <p>Vibration cue placeholder: [available on supported devices]</p>
                    </div>
                  )}
                </div>
              )}
            </article>

            <footer className="space-y-4 rounded-2xl border-2 border-black p-4 dark:border-[#f8f4e8]">
              <div className="grid gap-3 sm:grid-cols-2">
                <LargeButton
                  aria-label="Previous section"
                  onClick={() => setSectionIndex((prev) => Math.max(prev - 1, 0))}
                >
                  Previous Section
                </LargeButton>
                <LargeButton
                  aria-label="Next section"
                  onClick={() => setSectionIndex((prev) => Math.min(prev + 1, maxSection - 1))}
                >
                  Next Section
                </LargeButton>
              </div>
              <div>
                <p className="mb-2 text-lg font-semibold">
                  Section {sectionIndex + 1} of {maxSection}
                </p>
                <div className="h-6 w-full rounded-full border-2 border-black p-1 dark:border-[#f8f4e8]">
                  <div
                    className="h-full rounded-full bg-black transition-all dark:bg-[#f8f4e8]"
                    style={{ width: `${((sectionIndex + 1) / maxSection) * 100}%` }}
                  />
                </div>
              </div>
            </footer>

            <div className="fixed bottom-4 right-4 w-[320px] max-w-[90vw]">
              <LargeButton aria-label="Need simpler explanation" onClick={() => setShowHelper((prev) => !prev)}>
                Need simpler explanation?
              </LargeButton>
              {showHelper && (
                <div className="mt-3 space-y-3 rounded-2xl border-2 border-black bg-[#f8f4e8] p-4 dark:border-[#f8f4e8] dark:bg-[#111]">
                  <label className="block text-lg font-semibold" htmlFor="helper-question">
                    Ask one question
                  </label>
                  <textarea
                    id="helper-question"
                    aria-label="Ask for simpler explanation"
                    className="min-h-24 w-full rounded-xl border-2 border-black p-3 text-base text-black focus-visible:outline focus-visible:outline-4 focus-visible:outline-blue-500 dark:border-[#f8f4e8]"
                    value={helperQuestion}
                    onChange={(e) => setHelperQuestion(e.target.value)}
                  />
                  <LargeButton aria-label="Get simpler explanation" onClick={submitHelper}>
                    Simplify
                  </LargeButton>
                  {helperAnswer && <p className="rounded-xl bg-[#fff9ec] p-3 text-black dark:bg-[#1a1a1a] dark:text-[#f8f4e8]">{helperAnswer}</p>}
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
