let audioContext;

if (typeof window !== 'undefined') {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

export const playSound = (frequency) => {
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.1);
};

export const getFrequency = (value, min, max) => {
  const minFreq = 220; // A3
  const maxFreq = 880; // A5
  return minFreq + ((value - min) / (max - min)) * (maxFreq - minFreq);
};