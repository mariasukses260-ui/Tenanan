import { useCallback, useEffect, useMemo, useState } from 'react';
import LoginGate from './LoginGate';
import { getQuestionsForPerson } from './lib/debate';
import { useSpeech } from './hooks/useSpeech';

const PERSONS = ['Edi', 'Ridwan', 'Susanto', 'Suprapti', 'Eka', 'Jumiati'];
type Phase = 'idle' | 'question' | 'waitAnswer' | 'result' | 'done';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState('Edi');
  const [questions, setQuestions] = useState(() => getQuestionsForPerson('Edi'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const { speak } = useSpeech();

  const currentQuestion = questions[currentIndex] ?? null;
  const totalQuestions = questions.length;

  const choosePerson = useCallback((person: string) => {
    const nextQuestions = getQuestionsForPerson(person);
    setSelectedPerson(person);
    setQuestions(nextQuestions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setCorrectCount(0);
    setWrongCount(0);
    setPhase('idle');
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (questions.length === 0) {
      setPhase('done');
      return;
    }

    if (phase === 'idle') {
      const q = questions[currentIndex];
      if (!q) return;
      setPhase('question');
      speak(q.text, () => setPhase('waitAnswer'));
    }
  }, [isAuthenticated, currentIndex, phase, questions, speak]);

  const submitAnswer = useCallback(
    (answer: 1 | 2) => {
      if (!currentQuestion || phase !== 'waitAnswer') return;

      const correctAnswer = (currentQuestion.setIndex ?? 0) + 1;
      const isCorrect = answer === correctAnswer;

      setSelectedAnswer(answer);
      setPhase('result');

      if (isCorrect) {
        setCorrectCount((v) => v + 1);
      } else {
        setWrongCount((v) => v + 1);
      }

      window.setTimeout(() => {
        const nextIndex = currentIndex + 1;

        if (nextIndex < questions.length) {
          setCurrentIndex(nextIndex);
          setSelectedAnswer(null);
          setPhase('idle');
        } else {
          setPhase('done');
        }
      }, 1200);
    },
    [currentIndex, currentQuestion, phase, questions.length]
  );

  const scoreSummary = useMemo(
    () => `${correctCount} benar / ${wrongCount} salah`,
    [correctCount, wrongCount]
  );

  if (!isAuthenticated) {
    return <LoginGate onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #020617 0%, #0f172a 100%)',
        color: '#f8fafc',
        fontFamily: 'system-ui, sans-serif',
        padding: '24px 16px 48px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
            marginBottom: 24,
            padding: '18px 20px',
            borderRadius: 18,
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.35)',
          }}
        >
          <div>
            <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: '#7dd3fc', opacity: 0.8 }}>
              Sidang Sengketa Tegal Soka
            </div>
            <h1 style={{ margin: '8px 0 0', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
              Pusat Debat & Persidangan
            </h1>
          </div>

          <div
            style={{
              padding: '10px 16px',
              borderRadius: 999,
              background: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(34, 197, 94, 0.35)',
              color: '#bbf7d0',
              fontWeight: 700,
            }}
          >
            {scoreSummary}
          </div>
        </header>

        <section
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            marginBottom: 28,
            justifyContent: 'center',
          }}
        >
          {PERSONS.map((person) => {
            const active = person === selectedPerson;
            return (
              <button
                key={person}
                type="button"
                onClick={() => choosePerson(person)}
                style={{
                  border: active ? '1px solid #67e8f9' : '1px solid rgba(148,163,184,0.35)',
                  background: active ? 'linear-gradient(135deg, rgba(14,165,233,0.3), rgba(59,130,246,0.1))' : 'rgba(15, 23, 42, 0.7)',
                  color: '#f8fafc',
                  padding: '10px 16px',
                  borderRadius: 999,
                  fontWeight: 700,
                  cursor: 'pointer',
                  minWidth: 110,
                }}
              >
                {person}
              </button>
            );
          })}
        </section>

        <main
          style={{
            borderRadius: 24,
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(148, 163, 184, 0.18)',
            boxShadow: '0 20px 50px rgba(15, 23, 42, 0.35)',
            padding: '24px 18px',
          }}
        >
          {questions.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#cbd5e1', padding: '36px 0' }}>
              Tidak ada pertanyaan untuk peserta ini.
            </div>
          ) : currentQuestion && phase !== 'done' ? (
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
              <div
                style={{
                  textAlign: 'center',
                  padding: '18px',
                  background: 'rgba(15, 118, 110, 0.18)',
                  borderRadius: 16,
                  border: '1px solid rgba(45, 212, 191, 0.2)',
                  marginBottom: 18,
                }}
              >
                <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: '#a7f3d0' }}>
                  Pertanyaan {currentIndex + 1} / {totalQuestions}
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.4, marginTop: 10 }}>
                  {currentQuestion.text}
                </div>
              </div>

              {phase === 'question' || phase === 'waitAnswer' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
                  <button
                    type="button"
                    onClick={() => submitAnswer(1)}
                    disabled={phase !== 'waitAnswer'}
                    style={{
                      width: '100%',
                      borderRadius: 14,
                      border: '1px solid #22d3ee',
                      background: phase === 'waitAnswer' ? 'rgba(34, 211, 238, 0.12)' : 'rgba(15, 23, 42, 0.7)',
                      color: '#a5f3fc',
                      padding: '18px 16px',
                      fontWeight: 700,
                      fontSize: 18,
                      cursor: phase === 'waitAnswer' ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Jawaban 1
                  </button>

                  <button
                    type="button"
                    onClick={() => submitAnswer(2)}
                    disabled={phase !== 'waitAnswer'}
                    style={{
                      width: '100%',
                      borderRadius: 14,
                      border: '1px solid #f472b6',
                      background: phase === 'waitAnswer' ? 'rgba(244, 114, 182, 0.12)' : 'rgba(15, 23, 42, 0.7)',
                      color: '#fbcfe8',
                      padding: '18px 16px',
                      fontWeight: 700,
                      fontSize: 18,
                      cursor: phase === 'waitAnswer' ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Jawaban 2
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    marginTop: 18,
                    borderRadius: 16,
                    padding: '18px 16px',
                    background: selectedAnswer === (currentQuestion.setIndex ?? 0) + 1 ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.12)',
                    border: `1px solid ${selectedAnswer === (currentQuestion.setIndex ?? 0) + 1 ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.45)'}`,
                    color: selectedAnswer === (currentQuestion.setIndex ?? 0) + 1 ? '#bbf7d0' : '#fecaca',
                    fontSize: 18,
                    fontWeight: 700,
                    textAlign: 'center',
                  }}
                >
                  {selectedAnswer === (currentQuestion.setIndex ?? 0) + 1 ? 'Benar' : 'Salah'}
                  {' — Jawaban benar: ' + ((currentQuestion.setIndex ?? 0) + 1)}
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '46px 16px' }}>
              <h2 style={{ margin: 0, fontSize: 30 }}>Sesi selesai</h2>
              <p style={{ marginTop: 12, fontSize: 18, color: '#cbd5e1' }}>
                Skor akhir: {scoreSummary}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
