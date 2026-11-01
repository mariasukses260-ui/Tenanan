import { useCallback, useEffect, useMemo, useState } from 'react';
import LoginGate from './LoginGate';
import { duelSets } from './data/duelMode';
import { pendalamanSets } from './data/pendalaman';
import { allPersonSets as sidangSets } from './data/sidangNyata';
import { getQuestionsForPerson as getPersonQuestions } from './lib/debate';
import { useSpeech } from './hooks/useSpeech';

type ModeKey = 'sidang' | 'pendalaman' | 'duel' | 'person';
type Phase = 'idle' | 'reading' | 'answer' | 'result' | 'done';

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

function flattenModeSets(entries: { person: string; sets: { id: number; role: string; text: string }[][] }[]): FlatQuestion[] {
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
  if (mode === 'sidang') return flattenModeSets(sidangSets);
  if (mode === 'pendalaman') return flattenModeSets(pendalamanSets);
  if (mode === 'duel') return flattenModeSets(duelSets);
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
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const { speak } = useSpeech();

  const questions = useMemo(
    () => buildQuestionsForMode(selectedMode, selectedPerson),
    [selectedMode, selectedPerson]
  );

  const currentQuestion = questions[currentIndex] ?? null;

  const resetSession = useCallback((mode: ModeKey, person: string) => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setCorrectCount(0);
    setWrongCount(0);
    setPhase('idle');
    setSelectedMode(mode);
    setSelectedPerson(person);
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
      setPhase('reading');
      speak(q.text, () => setPhase('answer'));
    }
  }, [isAuthenticated, questions, currentIndex, phase, speak]);

  const submitAnswer = useCallback(
    (answer: 1 | 2) => {
      if (!currentQuestion || phase !== 'answer') return;

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
      }, 900);
    },
    [currentIndex, currentQuestion, phase, questions.length]
  );

  const scoreSummary = `${correctCount} benar / ${wrongCount} salah`;

  if (!isAuthenticated) {
    return <LoginGate onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #020617, #0f172a 40%, #111827)',
        color: '#f8fafc',
        fontFamily: 'system-ui, sans-serif',
        padding: '24px 16px 52px',
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
            background: 'rgba(15, 23, 42, 0.88)',
            border: '1px solid rgba(148, 163, 184, 0.18)',
            boxShadow: '0 18px 40px rgba(2, 6, 23, 0.45)',
          }}
        >
          <div>
            <div style={{ fontSize: 12, letterSpacing: 2, color: '#7dd3fc', opacity: 0.82, textTransform: 'uppercase' }}>
              Sidang Sengketa Tegal Soka
            </div>
            <h1 style={{ margin: '8px 0 0', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
              Alur Debat Standar Semua Mode
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
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 10,
            marginBottom: 22,
          }}
        >
          {MODES.map((mode) => (
            <button
              key={mode.key}
              type="button"
              onClick={() => {
                if (mode.key === 'person') {
                  resetSession('person', selectedPerson);
                  return;
                }
                resetSession(mode.key, selectedPerson);
              }}
              style={{
                border: selectedMode === mode.key ? '1px solid #67e8f9' : '1px solid rgba(148, 163, 184, 0.3)',
                background: selectedMode === mode.key ? 'linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(59, 130, 246, 0.12))' : 'rgba(15, 23, 42, 0.7)',
                color: '#f8fafc',
                padding: '10px 18px',
                borderRadius: 999,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {mode.label}
            </button>
          ))}
        </section>

        <section
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 10,
            marginBottom: 28,
          }}
        >
          {PERSONS.map((person) => (
            <button
              key={person}
              type="button"
              onClick={() => resetSession(selectedMode, person)}
              style={{
                border: selectedPerson === person ? '1px solid #f9a8d4' : '1px solid rgba(148, 163, 184, 0.28)',
                background: selectedPerson === person ? 'rgba(244, 114, 182, 0.12)' : 'rgba(15, 23, 42, 0.72)',
                color: '#f8fafc',
                padding: '9px 14px',
                borderRadius: 999,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {person}
            </button>
          ))}
        </section>

        <main
          style={{
            borderRadius: 24,
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(148, 163, 184, 0.18)',
            boxShadow: '0 20px 50px rgba(2, 6, 23, 0.38)',
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
                <div style={{ marginTop: 14, fontSize: 'clamp(1.2rem, 2vw, 2.2rem)', fontWeight: 800, lineHeight: 1.4 }}>
                  {currentQuestion.text}
                </div>
              </div>

              {phase === 'answer' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
                  <button
                    type="button"
                    onClick={() => submitAnswer(1)}
                    style={{
                      width: '100%',
                      borderRadius: 14,
                      border: '1px solid #22d3ee',
                      background: 'rgba(34, 211, 238, 0.12)',
                      color: '#a5f3fc',
                      padding: '18px 16px',
                      fontWeight: 700,
                      fontSize: 18,
                      cursor: 'pointer',
                    }}
                  >
                    Jawaban 1
                  </button>

                  <button
                    type="button"
                    onClick={() => submitAnswer(2)}
                    style={{
                      width: '100%',
                      borderRadius: 14,
                      border: '1px solid #f472b6',
                      background: 'rgba(244, 114, 182, 0.12)',
                      color: '#fbcfe8',
                      padding: '18px 16px',
                      fontWeight: 700,
                      fontSize: 18,
                      cursor: 'pointer',
                    }}
                  >
                    Jawaban 2
                  </button>
                </div>
              ) : phase === 'result' ? (
                <div
                  style={{
                    marginTop: 18,
                    borderRadius: 16,
                    padding: '18px 16px',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 800,
                    background: selectedAnswer === (currentQuestion.setIndex ?? 0) + 1 ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                    border: `1px solid ${selectedAnswer === (currentQuestion.setIndex ?? 0) + 1 ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.45)'}`,
                    color: selectedAnswer === (currentQuestion.setIndex ?? 0) + 1 ? '#bbf7d0' : '#fecaca',
                  }}
                >
                  {selectedAnswer === (currentQuestion.setIndex ?? 0) + 1 ? 'Benar' : 'Salah'}
                  {' — Jawaban benar: ' + ((currentQuestion.setIndex ?? 0) + 1)}
                </div>
              ) : null}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '46px 16px' }}>
              <h2 style={{ margin: 0, fontSize: 30 }}>Sesi selesai</h2>
              <p style={{ marginTop: 12, color: '#cbd5e1', fontSize: 20 }}>
                Skor akhir: {scoreSummary}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
