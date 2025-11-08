import { useRef, useState, useCallback } from "react";

type UseRemoteSoundReturn = {
  playSound: () => Promise<void>;
  enableSound: () => void;
  disableSound: () => void;
  setVolume: (v: number) => void;
  prefetch: () => Promise<void>;
  isEnabled: boolean;
  volume: number;
};

export function useRemoteSoundNotification(
  soundUrl: string = 'https://conversu-plugin.s3.sa-east-1.amazonaws.com/assets/notification.mp3',
  initialVolume: number = 1
): UseRemoteSoundReturn {
  const baseAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [volume, setVolumeState] = useState(initialVolume);

  const ensureBase = useCallback(() => {
    if (!baseAudioRef.current) {
      const a = new Audio(soundUrl);
      a.preload = "auto";
      a.crossOrigin = "anonymous"; // habilita uso com CDN/CORS
      a.volume = volume;
      baseAudioRef.current = a;
    }
  }, [soundUrl, volume]);

  const prefetch = useCallback(async () => {
    // Pré-carrega no Cache Storage do navegador (opcional)
    try {
      if ("caches" in window) {
        const cache = await caches.open("audio-cache-v1");
        await cache.add(soundUrl);
      } else {
        // fallback: apenas force o browser a baixar
        await fetch(soundUrl, { mode: "cors", cache: "force-cache" });
      }
    } catch {
      // ignora erros de prefetch
    }
    ensureBase();
  }, [soundUrl, ensureBase]);

  const playSound = useCallback(async () => {
    if (!isEnabled) return;
    ensureBase();

    const base = baseAudioRef.current;
    if (!base) return;

    // Clona para permitir sobreposição
    const clone = base.cloneNode(true) as HTMLAudioElement;
    clone.volume = volume;

    try {
      await clone.play();
    } catch {
      // Provável bloqueio de autoplay: tente tocar após um gesto do usuário
      // Você pode enfileirar para tocar no próximo clique do usuário, se quiser
    }
  }, [isEnabled, ensureBase, volume]);

  const enableSound = () => setIsEnabled(true);
  const disableSound = () => setIsEnabled(false);

  const setVolume = (v: number) => {
    setVolumeState(v);
    if (baseAudioRef.current) baseAudioRef.current.volume = v;
  };

  return { playSound, enableSound, disableSound, setVolume, prefetch, isEnabled, volume };
}
