// src/components/sections/ContactoSection.jsx
import { useEffect, useRef } from 'react';
import { useIntersection } from '../../hooks/useIntersection';
import '../../styles/contacto.css';

const CONTACTS = [
  {
    id: 'email',
    href: 'mailto:leo14dany2011@gmail.com',
    platform: 'Email',
    value: 'leo14dany2011@gmail.com',
    hint: 'Respondo en menos de 24h',
    ctc: 'rgba(0,123,255,.85)',
    ctbg: 'linear-gradient(135deg,#001428,#000f1e)',
    crdel: '0s', osp: '4s', orSize: '34px',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(0,123,255,.95)" strokeWidth="1.8" strokeLinecap="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    id: 'phone',
    href: 'tel:+525618497690',
    platform: 'Teléfono',
    value: '56 1849 7690',
    hint: 'WhatsApp disponible',
    ctc: 'rgba(52,211,153,.85)',
    ctbg: 'linear-gradient(135deg,#041a10,#020e08)',
    crdel: '.3s', osp: '5s', orSize: '30px',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(52,211,153,.95)" strokeWidth="1.8" strokeLinecap="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63a19.79 19.79 0 01-3.07-8.73A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
      </svg>
    ),
  },
  {
    id: 'linkedin',
    href: 'https://linkedin.com/in/leodanieldom',
    target: '_blank',
    platform: 'LinkedIn',
    value: 'in/leodanieldom',
    hint: 'Red profesional',
    ctc: 'rgba(10,102,194,.95)',
    ctbg: 'linear-gradient(135deg,#001428,#000f1e)',
    crdel: '.6s', osp: '4.5s', orSize: '32px',
    icon: (
      <svg viewBox="0 0 24 24" fill="rgba(10,130,233,.95)">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    id: 'github',
    href: 'https://github.com/leodanieldom',
    target: '_blank',
    platform: 'GitHub',
    value: 'github.com/leodanieldom',
    hint: 'Ver mis repositorios',
    ctc: 'rgba(255,255,255,.7)',
    ctbg: 'linear-gradient(135deg,#0d1117,#010409)',
    crdel: '.9s', osp: '3.8s', orSize: '36px',
    icon: (
      <svg viewBox="0 0 24 24" fill="rgba(255,255,255,.85)">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
];

const MSGS = [
  { side: 'left',  avatar: '👋', text: '¡Hola! Vi tu portfolio y me pareció increíble...' },
  { side: 'right', avatar: '😄', text: '¡Gracias! ¿En qué puedo ayudarte?' },
  { side: 'left',  avatar: '👋', text: 'Tengo un proyecto en mente y creo que eres la persona indicada.' },
  { side: 'right', avatar: '😄', text: '¡Con gusto! Cuéntame más, estoy disponible ahora mismo 🚀' },
];

export default function ContactoSection() {
  const sectionRef = useIntersection(['.ct-header']);
  const chatRef    = useRef(null);
  const btnRef     = useRef(null);
  const ctaTopRef  = useRef(null);
  const gridRef    = useRef(null);
  const started    = useRef(false);

  const delay = ms => new Promise(r => setTimeout(r, ms));

  function makeBubble(msg, withCursor = false) {
    const wrap = document.createElement('div');
    wrap.className = `ct-bubble ${msg.side === 'right' ? 'right' : 'left'}`;
    const av = document.createElement('div');
    av.className = `ct-avatar ${msg.side === 'right' ? 'me' : 'them'}`;
    av.textContent = msg.avatar;
    const m = document.createElement('div');
    m.className = 'ct-msg';
    if (withCursor) m.innerHTML = msg.text + '<span class="ct-cursor"></span>';
    else m.textContent = msg.text;
    wrap.appendChild(msg.side === 'right' ? m : av);
    wrap.appendChild(msg.side === 'right' ? av : m);
    return wrap;
  }

  function makeTyping(side) {
    const wrap = document.createElement('div');
    wrap.className = `ct-bubble ${side === 'right' ? 'right' : 'left'}`;
    const av = document.createElement('div');
    av.className = `ct-avatar ${side === 'right' ? 'me' : 'them'}`;
    av.textContent = side === 'right' ? '😄' : '👋';
    const m = document.createElement('div');
    m.className = 'ct-msg';
    m.innerHTML = '<div class="ct-typing"><span></span><span></span><span></span></div>';
    wrap.appendChild(side === 'right' ? m : av);
    wrap.appendChild(side === 'right' ? av : m);
    return wrap;
  }

  async function runChat() {
    if (started.current || !chatRef.current) return;
    started.current = true;
    for (let i = 0; i < MSGS.length; i++) {
      const msg = MSGS[i];
      const typing = makeTyping(msg.side);
      chatRef.current.appendChild(typing);
      await delay(50);
      typing.classList.add('show');
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
      await delay(820 + msg.text.length * 15);
      typing.remove();
      const isLast = i === MSGS.length - 1;
      const bubble = makeBubble(msg, isLast);
      chatRef.current.appendChild(bubble);
      await delay(40);
      bubble.classList.add('show');
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
      if (!isLast) await delay(520);
    }
    await delay(420);
    if (btnRef.current) btnRef.current.classList.add('show');
  }

  useEffect(() => {
    if (!ctaTopRef.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        ctaTopRef.current.classList.add('vis');
        setTimeout(runChat, 450);
        obs.disconnect();
      }
    }, { threshold: 0.25 });
    obs.observe(ctaTopRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        gridRef.current.querySelectorAll('.cc-card').forEach((c, i) => {
          setTimeout(() => c.classList.add('vis'), i * 100);
        });
        obs.disconnect();
      }
    }, { threshold: 0.08 });
    obs.observe(gridRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contacto" ref={sectionRef}>
      <div className="section">

        {/* Header */}
        <div className="ct-header">
          <div className="ct-tagline">// hablemos</div>
          <div className="ct-title-big">¿Trabajamos juntos?</div>
          <p className="ct-sub">Estoy disponible para proyectos freelance, oportunidades de trabajo y colaboraciones.</p>
        </div>

        {/* Chat CTA */}
        <div className="ct-cta-top" ref={ctaTopRef}>
          <div className="ct-terminal">
            <div className="ct-term-bar">
              <div className="ct-term-dot" style={{ background: '#ff5f57' }} />
              <div className="ct-term-dot" style={{ background: '#febc2e' }} />
              <div className="ct-term-dot" style={{ background: '#28c840' }} />
              <div className="ct-term-title">chat_nuevo.js — listo para hablar</div>
            </div>
            <div className="ct-chat" ref={chatRef} />
          </div>
          <div className="ct-cta-top-btn">
            <a className="ct-cta-btn" ref={btnRef} href="mailto:leo14dany2011@gmail.com">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Escríbeme · leo14dany2011@gmail.com
            </a>
          </div>
        </div>

        {/* Contact cards */}
        <div className="ct-grid" ref={gridRef}>
          {CONTACTS.map(c => (
            <a
              key={c.id}
              className="cc-card"
              href={c.href}
              target={c.target}
              rel={c.target === '_blank' ? 'noopener noreferrer' : undefined}
              style={{ '--ctc': c.ctc, '--ctbg': c.ctbg, '--crdel': c.crdel, '--osp': c.osp }}
            >
              <div className="cc-banner">
                <div className="cc-ring" />
                <div className="cc-orbit o1" style={{ '--or': c.orSize }} />
                <div className="cc-orbit o2" style={{ '--or': c.orSize }} />
                <div className="cc-shine" />
                <div className="cc-icon-wrap">{c.icon}</div>
              </div>
              <div className="cc-body">
                <div className="cc-platform">{c.platform}</div>
                <div className="cc-value">{c.value}</div>
                <div className="cc-hint">{c.hint}</div>
              </div>
            </a>
          ))}
        </div>

        {/* ── SIN ct-footer aquí — el Footer.jsx ya lo maneja ── */}

      </div>
    </section>
  );
}