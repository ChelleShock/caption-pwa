import React, { useEffect, useRef, useState } from "react";
import Layout from "./components/Layout";
import { useAuth } from "./context/AuthContext";
import { useTranscripts } from "./hooks/useTranscripts";
import { pushUnsynced } from "./lib/sync";
import SyncIndicator from "./components/SyncIndicator";

function ClosedCaptionPWA() {
  const { user } = useAuth();
  const { add } = useTranscripts();
  const [listening, setListening] = useState(false);
  const [captions, setCaptions] = useState("");
  const [interim, setInterim] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);
  const [level, setLevel] = useState(0); // 0..1 mic level
  const recognitionRef = useRef<any>(null);
  const manualStopRef = useRef(false);
  const listeningRef = useRef(false);

  // Audio visualization refs
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    listeningRef.current = listening;
  }, [listening]);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
    }
    if (!window.isSecureContext && location.hostname !== "localhost") {
      setError("Speech recognition requires HTTPS or localhost.");
    }
    const onVisibility = () => {
      if (!audioContextRef.current) return;
      if (document.visibilityState === 'visible' && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume().catch(() => {});
      }
      // Trigger sync on visibility
      if (user?.id) pushUnsynced(user.id).catch(() => {});
    };
    const onOnline = () => {
      if (user?.id) pushUnsynced(user.id).catch(() => {});
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('online', onOnline);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('online', onOnline);
      teardownAudio();
      stopRecognition();
    };
  }, [user?.id]);

  const attachHandlers = (recognition: any) => {
    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      let finalAppend = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        if (result.isFinal) {
          finalAppend += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }
      if (finalAppend) {
        setCaptions(prev => (prev ? prev + " " : "") + finalAppend.trim());
        // Save transcript locally with user id
        add(finalAppend.trim(), user?.id);
      }
      setInterim(interimTranscript);
    };

    recognition.onend = () => {
      if (!manualStopRef.current && listeningRef.current) {
        try { recognition.start(); } catch {}
      }
    };

    recognition.onerror = (evt: any) => {
      const name = evt?.error || "unknown";
      if (name === "not-allowed" || name === "service-not-allowed") {
        setError("Microphone access denied. Please allow mic permissions.");
      } else if (name === "no-speech") {
        setError("No speech detected. Try speaking louder or closer to the mic.");
      } else if (name === "network") {
        setError("Network error with speech service. Check your connection.");
      } else if (name !== "aborted") {
        setError(`Recognition error: ${name}`);
      }
    };
  };

  const startRecognition = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.maxAlternatives = 1;
    attachHandlers(recognition);
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopRecognition = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    try { rec.onresult = null; rec.onend = null; rec.onerror = null; } catch {}
    try { rec.abort && rec.abort(); } catch {}
    try { rec.stop && rec.stop(); } catch {}
    recognitionRef.current = null;
  };

  const setupAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true }, video: false });
      mediaStreamRef.current = stream;

      const Ctx: any = (window as any).AudioContext || (window as any).webkitAudioContext;
      const audioContext: AudioContext = new Ctx();
      audioContextRef.current = audioContext;
      if (audioContext.state === 'suspended') {
        await audioContext.resume().catch(() => {});
      }

      const source = audioContext.createMediaStreamSource(stream);
      sourceNodeRef.current = source;
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.85;
      analyserRef.current = analyser;
      source.connect(analyser);

      const dataArray: Uint8Array = new Uint8Array(analyser.frequencyBinCount);
      dataArrayRef.current = dataArray;

      const tick = () => {
        // Always schedule next frame first to keep the loop resilient
        rafIdRef.current = requestAnimationFrame(tick);

        const ctx = audioContextRef.current;
        if (ctx && ctx.state === 'suspended') {
          ctx.resume().catch(() => {});
        }

        const analyser = analyserRef.current;
        const data = dataArrayRef.current;
        if (!analyser || !data) {
          setLevel(0);
          return;
        }

        const s = mediaStreamRef.current;
        if (!s || s.getAudioTracks().length === 0) {
          setLevel(0);
          return;
        }

        // Ensure 'data' is a Uint8Array with ArrayBuffer backing for this analyzer API.
        // Create a new Uint8Array view copied from 'data' to guarantee an ArrayBuffer backing
        // so that TypeScript's DOM types are satisfied and the analyser can write into it.
        const view = new Uint8Array(data);
        analyser.getByteTimeDomainData(view);
        
        let sumSquares = 0;
        for (let i = 0; i < view.length; i++) {
          const v = (view[i] - 128) / 128;
          sumSquares += v * v;
        }
        const rms = Math.sqrt(sumSquares / data.length);
        const clamped = Math.min(1, Math.max(0, rms * 1.8));
        setLevel(prev => prev * 0.7 + clamped * 0.3);
      };
      rafIdRef.current = requestAnimationFrame(tick);
    } catch (e) {
      setError("Unable to access microphone for visualizer.");
    }
  };

  const teardownAudio = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (sourceNodeRef.current) {
      try { sourceNodeRef.current.disconnect(); } catch {}
      sourceNodeRef.current = null;
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch {}
      audioContextRef.current = null;
    }
    if (mediaStreamRef.current) {
      try { mediaStreamRef.current.getTracks().forEach(t => t.stop()); } catch {}
      mediaStreamRef.current = null;
    }
    analyserRef.current = null;
    dataArrayRef.current = null;
    setLevel(0);
  };

  const handleListen = async () => {
    setError(null);
    if (!listening) {
      manualStopRef.current = false;
      setCaptions("");
      setInterim("");
      try {
        await setupAudio();
        startRecognition();
        setListening(true);
      } catch (e: any) {
        setError("Unable to start microphone.");
        setListening(false);
        teardownAudio();
      }
    } else {
      manualStopRef.current = true;
      setInterim("");
      stopRecognition();
      setListening(false);
      teardownAudio();
    }
  };

  const handleClear = () => {
    setCaptions("");
    setInterim("");
  };

  const levelPercent = Math.round(level * 100);

  return (
    <Layout>
      <div className="min-h-dvh px-5 py-6 font-sans">
        <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold mb-4">Live Closed Captioning</h1>
        {!supported && (
          <div className="text-red-400 mb-3">
            SpeechRecognition API is not supported in this browser.
          </div>
        )}
        {error && (
          <div role="alert" className="text-red-400 mb-3">
            {error}
          </div>
        )}
        <div className="flex items-center gap-3 mb-5">
          <SyncIndicator />
          <button
            onClick={handleListen}
            disabled={!supported}
            className={`rounded-md px-5 py-3 text-white text-lg shadow transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${
              listening ? "bg-red-600 hover:bg-red-500 focus:ring-red-400" : "bg-emerald-600 hover:bg-emerald-500 focus:ring-emerald-400"
            } ${supported ? "cursor-pointer" : "cursor-not-allowed opacity-60"}`}
          >
            {listening ? "Stop Listening" : "Start Listening"}
          </button>
          <button
            onClick={handleClear}
            className="rounded-md px-4 py-3 text-gray-200 bg-gray-700 hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Clear
          </button>
          <div className="ml-auto w-48 h-3 rounded-full bg-gray-700 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-[width] duration-100"
              style={{ width: `${levelPercent}%` }}
            />
          </div>
        </div>
        <div
          aria-live="polite"
          className="min-h-[120px] rounded-lg bg-gray-800/80 p-4 text-gray-100 text-2xl shadow-lg leading-relaxed"
        >
          {captions
            ? (
              <>
                {captions}
                {interim && <span className="opacity-70"> {interim}</span>}
              </>
            )
            : interim
              ? <span className="opacity-70">{interim}</span>
              : "Captions will appear here..."
          }
        </div>
        <div className="mt-3 text-gray-400 text-sm">
          Start, grant mic permission, and speak into the microphone.
        </div>
        </div>
      </div>
    </Layout>
  );
}

export default ClosedCaptionPWA;
