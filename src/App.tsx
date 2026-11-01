import { useCallback, useEffect, useMemo, useState } from 'react';
import LoginGate from './LoginGate';
import { duelSets } from './data/duelMode';
import { pendalamanSets } from './data/pendalaman';
import { allPersonSets as sidangSets } from './data/sidangNyata';
import { getQuestionsForPerson as getPersonQuestions } from './lib/debate';
import { useSpeech } from './hooks/useSpeech';

type ModeKey = 'sidang' | 'pendalaman' | 'duel' | 'person';
type Phase = 'idle' | 'reading' | 'answer' | 'result' | 'done';
type ResultState = 'correct' | 'wrong' | null;

type FlatQuestion = {
  id: number;
  role: string;
  text: string;
  person: string;
  setIndex: number;
};

const MODES: { key: ModeKey; label: string }[] = [
  { key: 'sidang', label: 'SIDANG' },
  { key: 'pendalaman', label: 'PENDALAMAN' },
  { key: 'duel', label: 'DUEL' },
  { key: 'person', label: 'PERSON' },
];

const PERSONS = ['Edi', 'Ridwan', 'Susanto', 'Suprapti', 'Eka', 'Jumiati'];

function flattenModeSets(
  entries: Array<{ person: string; sets: Array<Array<{ id: number; role: string; text: string }>> }>
): FlatQuestion[] {
  const flat: FlatQuestion[] = [];

  entries.forEach((personEntry) => {
    personEntry.sets.forEach((set, setIndex) => {
      set.forEach((question) => {
        flat.push({
          ...question,
          person: personEntry.person,
          setIndex,
        });
      });
    });
  });

  return flat;
}

function buildQuestionsForMode(mode: ModeKey, person: string): FlatQuestion[] {
  if (mode === 'sidang') return flattenModeSets(sidangSets as any);
  if (mode === 'pendalaman') return flattenModeSets((pendalamanSets as any) ?? []);
  if (mode === 'duel') return flattenModeSets(duelSets as any);

  return getPersonQuestions(person).map((q) => ({
    id: q.id,
    role: q.role,
    text: q.text,
    person: q.person,
    setIndex: q.setIndex,
  }));
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedMode, setSelectedMode] = useState<ModeKey>('sidang');
  const [selectedPerson, setSelectedPerson] = useState('Edi');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [resultState, setResultState] = useState<ResultState>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const { speak, isSpeaking } = useSpeech();

  const questions = useMemo(
    () => buildQuestionsForMode(selectedMode, selectedPerson),
    [selectedMode, selectedPerson]
  );

  const currentQuestion = questions[currentIndex] ?? null;

  const resetSession = useCallback((mode: ModeKey, person: string) => {
    setSelectedMode(mode);
    setSelectedPerson(person);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setResultState(null);
    setCorrectCount(0);
    setWrongCount(0);
    setPhase('idle');
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !questions.length) {
      return;
    }

    if (phase === 'idle' && currentQuestion) {
      setPhase('reading');
      speak(currentQuestion.text, () => setPhase('answer'));
    }
  }, [isAuthenticated, currentQuestion, phase, questions.length, speak]);

  const moveToNextQuestion = useCallback(() => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setResultState(null);
      setPhase('idle');
      return;
    }

    setPhase('done');
  }, [currentIndex, questions.length]);

  const submitAnswer = useCallback(
    (answer: 1 | 2) => {
      if (!currentQuestion || phase !== 'answer') return;

      const correctAnswer = currentQuestion.id % 2 === 0 ? 2 : 1;
      const isCorrect = answer === correctAnswer;

      setSelectedAnswer(answer);
      setResultState(isCorrect ? 'correct' : 'wrong');
      setPhase('result');

      if (isCorrect) {
        setCorrectCount((prev) => prev + 1);
        speak(`Jawaban benar. ${currentQuestion.text}`, () => {
          window.setTimeout(() => moveToNextQuestion(), 1200);
        });
      } else {
        setWrongCount((prev) => prev + 1);
        speak(`Jawaban salah. Jawaban yang benar adalah jawaban ${correctAnswer}.`, () => {
          window.setTimeout(() => moveToNextQuestion(), 1400);
        });
      }
    },
    [currentQuestion, moveToNextQuestion, phase, speak]
  );

  if (!isAuthenticated) {
    return <LoginGate onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      <style>{`
        :root {
          color-scheme: dark;
        }

        * { box-sizing: border-box; }
        html, body, #root {
          margin: 0;
          min-height: 100%;
          background: #020617;
        }

        body {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        @keyframes driftSlow {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(16px, -20px, 0) scale(1.08); }
          100% { transform: translate3d(-12px, 8px, 0) scale(1); }
        }

        @keyframes pulseSoft {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        .living-bg {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(circle at 20% 15%, rgba(34, 211, 238, 0.25), transparent 18%),
            radial-gradient(circle at 78% 18%, rgba(168, 85, 247, 0.2), transparent 24%),
            radial-gradient(circle at 52% 72%, rgba(59, 130, 246, 0.16), transparent 26%),
            linear-gradient(180deg, #020617 0%, #0b1120 38%, #111827 100%);
          color: #f8fafc;
        }

        .living-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(16px);
          animation: driftSlow 18s ease-in-out infinite alternate;
          opacity: 0.75;
        }

        .orb-1 {
          width: 280px;
          height: 280px;
          left: 5%;
          top: 8%;
          background: rgba(34, 211, 238, 0.2);
        }

        .orb-2 {
          width: 360px;
          height: 360px;
          right: 8%;
          top: 10%;
          background: rgba(168, 85, 247, 0.16);
          animation-delay: 1.5s;
        }

        .orb-3 {
          width: 300px;
          height: 300px;
          left: 30%;
          bottom: 4%;
          background: rgba(59, 130, 246, 0.14);
          animation-delay: 2.8s;
        }

        .glass-panel {
          position: relative;
          z-index: 1;
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.18);
          box-shadow: 0 24px 60px rgba(2, 6, 23, 0.5);
          backdrop-filter: blur(12px);
        }

        .status-pill {
          animation: pulseSoft 2.5s ease-in-out infinite;
        }
      `}</style>

      <div className="living-bg">
        <div className="living-orb orb-1" />
        <div className="living-orb orb-2" />
        <div className="living-orb orb-3" />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '24px 16px 48px' }}>
          <header
            className="glass-panel"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
              marginBottom: 22,
              padding: '18px 20px',
              borderRadius: 18,
            }}
          >
            <div>
              <div style={{ fontSize: 12, letterSpacing: 2, color: '#7dd3fc', opacity: 0.82, textTransform: 'uppercase' }}>
                Sidang Sengketa Tegal Soka
              </div>
              <h1 style={{ margin: '8px 0 0', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', lineHeight: 1.1 }}>
                Alur Debat Standar
              </h1>
            </div>

            <div
              className="status-pill"
              style={{
                padding: '10px 16px',
                borderRadius: 999,
                background: 'rgba(34, 197, 94, 0.12)',
                border: '1px solid rgba(34, 197, 94, 0.32)',
                color: '#bbf7d0',
                fontWeight: 700,
              }}
            >
              {correctCount} benar / {wrongCount} salah
            </div>
          </header>

          <section style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {MODES.map((mode) => (
              <button
                key={mode.key}
                type="button"
                onClick={() => resetSession(mode.key, selectedPerson)}
                style={{
                  padding: '10px 18px',
                  borderRadius: 999,
                  border: selectedMode === mode.key ? '1px solid #67e8f9' : '1px solid rgba(148, 163, 184, 0.25)',
                  background: selectedMode === mode.key ? 'linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(59, 130, 246, 0.12))' : 'rgba(15, 23, 42, 0.7)',
                  color: '#f8fafc',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {mode.label}
              </button>
            ))}
          </section>

          <section style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
            {PERSONS.map((person) => (
              <button
                key={person}
                type="button"
                onClick={() => resetSession(selectedMode, person)}
                style={{
                  padding: '9px 14px',
                  borderRadius: 999,
                  border: selectedPerson === person ? '1px solid #f9a8d4' : '1px solid rgba(148, 163, 184, 0.25)',
                  background: selectedPerson === person ? 'rgba(244, 114, 182, 0.12)' : 'rgba(15, 23, 42, 0.72)',
                  color: '#f8fafc',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {person}
              </button>
            ))}
          </section>

          <main
            className="glass-panel"
            style={{
              borderRadius: 24,
              padding: '24px 18px',
            }}
          >
            {questions.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#cbd5e1', padding: '36px 0' }}>
                Tidak ada pertanyaan untuk mode ini.
              </div>
            ) : currentQuestion && phase !== 'done' ? (
              <div style={{ maxWidth: 820, margin: '0 auto' }}>
                <div
                  style={{
                    textAlign: 'center',
                    padding: '20px 18px',
                    background: 'rgba(15, 118, 110, 0.14)',
                    border: '1px solid rgba(45, 212, 191, 0.2)',
                    borderRadius: 18,
                    marginBottom: 18,
                  }}
                >
                  <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: '#a7f3d0' }}>
                    {selectedMode.toUpperCase()} • {selectedPerson} • Pertanyaan {currentIndex + 1} / {questions.length}
                  </div>

                  <div
                    style={{
                      marginTop: 16,
                      fontSize: 'clamp(1.2rem, 2vw, 2.2rem)',
                      fontWeight: 800,
                      lineHeight: 1.45,
                      letterSpacing: '0.01em',
                    }}
                  >
                    {currentQuestion.text}
                  </div>

                  <div
                    style={{
                      marginTop: 14,
                      display: 'inline-block',
                      padding: '8px 12px',
                      borderRadius: 999,
                      background: 'rgba(14, 116, 144, 0.18)',
                      border: '1px solid rgba(34, 211, 238, 0.25)',
                      color: '#a5f3fc',
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: 1,
                    }}
                  >
                    {isSpeaking ? 'SUARA SEDANG MEMBACA' : phase === 'answer' ? 'PILIH JAWABAN' : phase === 'result' ? 'HASIL JAWABAN' : 'SIAP'}
                  </div>
                </div>

                {(phase === 'answer' || phase === 'result') && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <button
                      type="button"
                      onClick={() => submitAnswer(1)}
                      disabled={phase !== 'answer'}
                      style={{
                        width: '100%',
                        borderRadius: 14,
                        border: selectedAnswer === 1 ? '2px solid #22d3ee' : '1px solid #22d3ee',
                        background: selectedAnswer === 1 ? 'rgba(34, 211, 238, 0.18)' : 'rgba(34, 211, 238, 0.08)',
                        color: '#a5f3fc',
                        padding: '18px 16px',
                        fontWeight: 700,
                        fontSize: 18,
                        cursor: phase === 'answer' ? 'pointer' : 'default',
                      }}
                    >
                      Jawaban 1
                    </button>

                    <button
                      type="button"
                      onClick={() => submitAnswer(2)}
                      disabled={phase !== 'answer'}
                      style={{
                        width: '100%',
                        borderRadius: 14,
                        border: selectedAnswer === 2 ? '2px solid #f472b6' : '1px solid #f472b6',
                        background: selectedAnswer === 2 ? 'rgba(244, 114, 182, 0.18)' : 'rgba(244, 114, 182, 0.08)',
                        color: '#fbcfe8',
                        padding: '18px 16px',
                        fontWeight: 700,
                        fontSize: 18,
                        cursor: phase === 'answer' ? 'pointer' : 'default',
                      }}
                    >
                      Jawaban 2
                    </button>
                  </div>
                )}

                {phase === 'result' && resultState && (
                  <div
                    style={{
                      marginTop: 20,
                      borderRadius: 16,
                      padding: '18px 16px',
                      textAlign: 'center',
                      fontSize: 20,
                      fontWeight: 800,
                      background: resultState === 'correct' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                      border: `1px solid ${resultState === 'correct' ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.45)'}`,
                      color: resultState === 'correct' ? '#bbf7d0' : '#fecaca',
                    }}
                  >
                    {resultState === 'correct' ? 'BENAR' : 'SALAH'}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '46px 16px' }}>
                <h2 style={{ margin: 0, fontSize: 30 }}>Sesi selesai</h2>
                <p style={{ marginTop: 12, color: '#cbd5e1', fontSize: 20 }}>
                  Skor akhir: {correctCount} benar / {wrongCount} salah
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
