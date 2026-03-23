// src/components/sections/hero/AnimatedKeyboard.jsx
import { useEffect, useRef } from 'react';

const BLUE_KEYS = [3, 9, 16, 22, 30];
const RED_KEYS  = [12, 17, 19, 37];
const LIT_KEYS  = [0, 6, 13, 26, 27, 33];

function keyClass(i) {
  if (RED_KEYS.includes(i))  return 'key key-red';
  if (BLUE_KEYS.includes(i)) return 'key key-blue';
  if (LIT_KEYS.includes(i))  return 'key key-lit';
  return 'key';
}

export default function AnimatedKeyboard() {
  const keysRef = useRef([]);

  useEffect(() => {
    const allSpecial = [...BLUE_KEYS, ...RED_KEYS];
    const timers     = [];

    const pressKey = idx => {
      const el = keysRef.current[idx];
      if (!el) return;
      el.classList.add('key-pressed');
      timers.push(setTimeout(() => el.classList.remove('key-pressed'), 180));
    };

    const loop = () => {
      /* Mezcla aleatoria y presiona 1 o 2 teclas */
      const shuffled = [...allSpecial].sort(() => Math.random() - 0.5);
      const count    = Math.random() > 0.55 ? 2 : 1;

      for (let i = 0; i < count; i++) {
        timers.push(setTimeout(() => pressKey(shuffled[i]), i * 110));
      }

      timers.push(setTimeout(loop, 380 + Math.random() * 620));
    };

    timers.push(setTimeout(loop, 1400));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="d-kbd">
      {Array.from({ length: 39 }, (_, i) => (
        <div
          key={i}
          className={keyClass(i)}
          ref={el => (keysRef.current[i] = el)}
        />
      ))}
    </div>
  );
}