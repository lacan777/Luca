import { useEffect, useMemo, useRef, useState } from 'react';
import { pages } from './data/pages.js';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const EMPTY_CLUES = [];

function App() {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [activeClueId, setActiveClueId] = useState('');
  const [lensPosition, setLensPosition] = useState({ x: 50, y: 50 });
  const [voices, setVoices] = useState([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('');
  const [hasFlipSound, setHasFlipSound] = useState(false);
  const flipAudioRef = useRef(null);
  const narrationAudioRef = useRef(null);
  const audioContextRef = useRef(null);

  const page = pages[pageIndex];
  const totalPages = pages.length;
  const pageClues = page.clues || EMPTY_CLUES;
  const canGoBack = pageIndex > 0;
  const canGoForward = pageIndex < totalPages - 1;
  const preferredVoice = useMemo(
    () => voices.find((voice) => voice.voiceURI === selectedVoiceURI) || getPreferredVoice(voices),
    [selectedVoiceURI, voices]
  );

  const progress = useMemo(() => {
    if (totalPages <= 1) return 100;
    return ((pageIndex + 1) / totalPages) * 100;
  }, [pageIndex, totalPages]);

  const playGeneratedFlip = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const context = audioContextRef.current || new AudioContext();
    audioContextRef.current = context;

    const now = context.currentTime;
    const noiseLength = 0.16;
    const buffer = context.createBuffer(1, context.sampleRate * noiseLength, context.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < output.length; i += 1) {
      const fade = 1 - i / output.length;
      output[i] = (Math.random() * 2 - 1) * fade * 0.28;
    }

    const noise = context.createBufferSource();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();

    noise.buffer = buffer;
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(650, now);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + noiseLength);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);
    noise.start(now);
  };

  const playFlipSound = () => {
    if (hasFlipSound && flipAudioRef.current) {
      const audio = flipAudioRef.current;
      audio.currentTime = 0;
      audio.play().catch(playGeneratedFlip);
      return;
    }

    playGeneratedFlip();
  };

  const goToPage = (nextIndex) => {
    const safeIndex = clamp(nextIndex, 0, totalPages - 1);
    if (safeIndex === pageIndex) return;

    setDirection(safeIndex > pageIndex ? 'next' : 'previous');
    setPageIndex(safeIndex);
    playFlipSound();
  };

  const goBack = () => goToPage(pageIndex - 1);
  const goForward = () => goToPage(pageIndex + 1);

  const playRecordedNarration = async () => {
    const src = `/narration/${page.id}.mp3`;
    const response = await fetch(src, { method: 'HEAD' }).catch(() => null);

    if (!response?.ok) return false;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const audio = narrationAudioRef.current;
    if (!audio) return false;

    audio.src = src;
    audio.currentTime = 0;
    await audio.play();
    return true;
  };

  const narratePage = async () => {
    const playedRecording = await playRecordedNarration().catch(() => false);
    if (playedRecording) return;

    if (!('speechSynthesis' in window)) return;

    narrationAudioRef.current?.pause();
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(page.narration || page.title);
    utterance.lang = 'es-MX';
    utterance.rate = 0.86;
    utterance.pitch = 1.04;
    utterance.volume = 1;

    if (preferredVoice) {
      utterance.voice = preferredVoice;
      utterance.lang = preferredVoice.lang;
    }

    window.speechSynthesis.speak(utterance);
  };

  const moveLens = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 24, 76);
    const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 24, 76);
    setLensPosition({ x, y });
  };

  useEffect(() => {
    fetch('/sfx/page-flip.mp3', { method: 'HEAD' })
      .then((response) => setHasFlipSound(response.ok))
      .catch(() => setHasFlipSound(false));
  }, []);

  useEffect(() => {
    if (!('speechSynthesis' in window)) return undefined;

    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());

    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  useEffect(() => {
    const nextVoice = getPreferredVoice(voices);
    setSelectedVoiceURI((current) => current || nextVoice?.voiceURI || '');
  }, [voices]);

  useEffect(() => {
      [page.image, ...pageClues.map((clue) => clue.image)].forEach((src) => {
        if (!src) return;
        const image = new Image();
        image.src = src;
      });
  }, [page.image, pageClues]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') goBack();
      if (event.key === 'ArrowRight') goForward();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pageIndex]);

  useEffect(() => {
    setActiveClueId('');
    setLensPosition({ x: 50, y: 50 });
  }, [pageIndex]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <main className="app-shell">
      <section className="reader" aria-label="Libro interactivo">
        <header className="reader-header">
          <div>
            <p className="eyebrow">Libro interactivo</p>
            <h1>Dr. LUPA</h1>
          </div>

          <div className="reader-tools">
            {voices.length > 0 && (
              <select
                className="voice-select"
                aria-label="Voz de narracion"
                value={preferredVoice?.voiceURI || ''}
                onChange={(event) => setSelectedVoiceURI(event.target.value)}
              >
                {voices.map((voice) => (
                  <option key={voice.voiceURI} value={voice.voiceURI}>
                    {voice.name}
                  </option>
                ))}
              </select>
            )}

            <button className="narration-button" type="button" onClick={narratePage}>
              Narrar paginas
            </button>
          </div>
        </header>

        <div className="book-stage">
          <button
            className="nav-button nav-button-left"
            type="button"
            onClick={goBack}
            disabled={!canGoBack}
            aria-label="Pagina anterior"
          >
            {'<'}
          </button>

          <figure
            className={`page-frame page-frame-${page.kind} page-frame-${direction}`}
            key={page.id}
          >
            <img src={page.image} alt={page.title} draggable="false" loading="eager" decoding="async" />

            {pageClues.map((clue) => {
              const isActive = activeClueId === clue.id;

              return (
                <button
                  className={`clue-hotspot ${isActive ? 'clue-hotspot-active' : ''}`}
                  type="button"
                  key={clue.id}
                  style={{
                    left: `${clue.x}%`,
                    top: `${clue.y}%`,
                    width: `${clue.width}%`,
                    height: `${clue.height}%`,
                    '--origin-x': `${clue.originX}%`,
                    '--origin-y': `${clue.originY}%`,
                    '--lens-x': `${lensPosition.x}%`,
                    '--lens-y': `${lensPosition.y}%`,
                  }}
                  onPointerEnter={(event) => {
                    if (event.pointerType === 'mouse' || event.pointerType === 'pen') {
                      setActiveClueId(clue.id);
                      moveLens(event);
                    }
                  }}
                  onPointerMove={moveLens}
                  onPointerLeave={(event) => {
                    if (event.pointerType === 'mouse') {
                      setActiveClueId('');
                    }
                  }}
                  onPointerDown={(event) => {
                    setActiveClueId(clue.id);
                    moveLens(event);
                  }}
                  onFocus={() => setActiveClueId(clue.id)}
                  onBlur={() => setActiveClueId('')}
                  aria-label={clue.label}
                  aria-pressed={isActive}
                >
                  <span className="magnifier" aria-hidden="true">
                    <span className="magnifier-lens">
                      <img src={clue.image} alt="" draggable="false" />
                    </span>
                    <span className="magnifier-handle" />
                  </span>
                </button>
              );
            })}
          </figure>

          <button
            className="nav-button nav-button-right"
            type="button"
            onClick={goForward}
            disabled={!canGoForward}
            aria-label="Pagina siguiente"
          >
            {'>'}
          </button>
        </div>

        <footer className="reader-footer">
          <span>Pagina {pageIndex + 1} de {totalPages}</span>
          <div className="progress-track" aria-hidden="true">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </footer>
      </section>

      {hasFlipSound && <audio ref={flipAudioRef} src="/sfx/page-flip.mp3" preload="auto" />}
      <audio ref={narrationAudioRef} preload="auto" />
    </main>
  );
}

function getPreferredVoice(voices) {
  const spanishVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith('es'));
  const candidates = spanishVoices.length > 0 ? spanishVoices : voices;
  const qualityHints = ['natural', 'online', 'google', 'microsoft', 'premium', 'enhanced'];
  const friendlyHints = ['paulina', 'sabina', 'monica', 'helena', 'lucia', 'laura', 'maria', 'elvira', 'paloma', 'dalia'];
  const highQuality = candidates.find((voice) => {
    const name = voice.name.toLowerCase();
    return qualityHints.some((hint) => name.includes(hint));
  });
  const friendly = candidates.find((voice) => {
    const name = voice.name.toLowerCase();
    return friendlyHints.some((hint) => name.includes(hint));
  });

  return highQuality || friendly || candidates[0] || null;
}

export default App;
