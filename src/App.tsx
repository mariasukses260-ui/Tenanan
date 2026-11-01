  const speakQuestionDirect = useCallback((index: number) => {
    const q = questionsRef.current[index];
    if (!q) return;
    setPhase('playing');
    setCurrentProlog(null);
    setDuelRound(null);
    speak(`Dari ${q.role}. ${q.text}`, () => setPhase('waitAnswer'));
  }, [speak]);

  const speakQuestion = useCallback((index: number) => {
    const qs = questionsRef.current;
    if (index >= qs.length) {
      setIsAutoPlaying(false);
      toast.success('Selesai semua pertanyaan.');
      return;
    }
    const q = qs[index];
    setLastResult(null);

    if (duelModeRef.current) {
      setPhase('playing');
      setCurrentProlog(null);
      setDuelRound(null);
      speak(`Dari ${q.role}. ${q.text}`, () => setPhase('waitAnswer'));
      return;
    }

    if (prologModeRef.current) {
      const prolog = getRandomProlog(index, q.person, ALL_PERSONS);
      setCurrentProlog(prolog);
      setPhase('prolog');
      speakFeedback(prolog, () => setTimeout(() => speakQuestionDirect(index), 600));
    } else {
      setPhase('playing');
      speak(`Dari ${q.role}. ${q.text}`, () => setPhase('waitAnswer'));
    }
  }, [speak, speakFeedback, speakQuestionDirect]);
