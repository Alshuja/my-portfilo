/**
 * Mechanical keyboard sound effects.
 * Uses authentic press.mp3 and release.mp3 audio assets from saher-qaid-portfolio,
 * with Web Audio API synthetic fallback.
 */

let soundEnabled = false;
let audioCtx: AudioContext | null = null;
let pressAudio: HTMLAudioElement | null = null;
let releaseAudio: HTMLAudioElement | null = null;

export function isSoundEnabled(): boolean {
    if (typeof window === 'undefined') return false;
    return (
        soundEnabled ||
        localStorage.getItem('alshujaa_sound_enabled') === 'true'
    );
}

export function toggleSound(): boolean {
    const next = !isSoundEnabled();
    soundEnabled = next;
    if (typeof window !== 'undefined') {
        localStorage.setItem('alshujaa_sound_enabled', String(next));
    }
    if (next) {
        playMechanicalPress();
    }
    return next;
}

export function playMechanicalPress(): void {
    if (!isSoundEnabled() || typeof window === 'undefined') return;

    try {
        if (!pressAudio) {
            pressAudio = new Audio('/assets/sounds/press.mp3');
            pressAudio.volume = 0.4;
        }
        pressAudio.currentTime = 0;
        pressAudio.play().catch(() => {
            playSyntheticClick(800, 0.04);
        });
    } catch {
        playSyntheticClick(800, 0.04);
    }
}

export function playMechanicalRelease(): void {
    if (!isSoundEnabled() || typeof window === 'undefined') return;

    try {
        if (!releaseAudio) {
            releaseAudio = new Audio('/assets/sounds/release.mp3');
            releaseAudio.volume = 0.35;
        }
        releaseAudio.currentTime = 0;
        releaseAudio.play().catch(() => {
            playSyntheticClick(500, 0.03);
        });
    } catch {
        playSyntheticClick(500, 0.03);
    }
}

export function playClickSound(freq = 600, duration = 0.03): void {
    playMechanicalPress();
}

function playSyntheticClick(freq = 600, duration = 0.03): void {
    try {
        const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
                .webkitAudioContext;
        if (!audioCtx) {
            audioCtx = new AudioContextClass();
        }
        if (audioCtx.state === 'suspended') {
            void audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(
            120,
            audioCtx.currentTime + duration,
        );

        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioCtx.currentTime + duration,
        );

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch {
        // Fallback silently if audio context unavailable
    }
}
