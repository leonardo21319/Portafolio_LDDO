// src/hooks/useTypewriter.js
import { useEffect, useRef } from 'react';

/* ── Líneas del IDE ─────────────────────────────────────────── */
const IDE_LINES = [
  {
    raw:  "import React,{useState} from 'react'",
    html: `<span class="cb">import</span> <span class="cw">React</span><span class="cgr">,{useState}</span> <span class="cb">from</span> <span class="cg">'react'</span>`,
  },
  {
    raw:  "import { db } from './firebase'",
    html: `<span class="cb">import</span> <span class="cw">{ db }</span> <span class="cb">from</span> <span class="cg">'./firebase'</span>`,
  },
  {
    raw:  "// ✦ Portfolio · Leonardo Daniel",
    html: `<span class="cgr">// ✦ Portfolio · Leonardo Daniel</span>`,
  },
  { raw: '', html: '' },
  {
    raw:  "const HeroSection = () => {",
    html: `<span class="cb">const</span> <span class="co">HeroSection</span> <span class="cw">= () => {</span>`,
  },
  {
    raw:  "  return (",
    html: `&nbsp;&nbsp;<span class="cp">return</span> <span class="cw">(</span>`,
  },
  {
    raw:  '    <section id="hero">',
    html: `&nbsp;&nbsp;&nbsp;&nbsp;<span class="cr2">&lt;section</span> <span class="cy">id</span><span class="cw">=</span><span class="cg">"hero"</span><span class="cr2">&gt;</span>`,
  },
  {
    raw:    '      <Dev name="Leonardo"/>',
    html:   `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cr2">&lt;Dev</span> <span class="cy">name</span><span class="cw">=</span><span class="cg">"Leonardo"</span><span class="cr2">/&gt;</span>`,
    active: true,
  },
];

const SPEED = 28; // ms por carácter

/* Devuelve el HTML coloreado pero solo hasta n chars visibles */
function sliceColoredHTML(html, n) {
  const div = document.createElement('div');
  div.innerHTML = html;
  let visible = 0;
  let result  = '';

  const escHtml = s =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  function processNode(node) {
    if (visible >= n) return;
    if (node.nodeType === 3) {
      const slice = node.textContent.slice(0, n - visible);
      result  += escHtml(slice);
      visible += slice.length;
    } else if (node.nodeType === 1) {
      const tag = node.tagName.toLowerCase();
      const cls = node.getAttribute('class') || '';
      result += `<${tag}${cls ? ` class="${cls}"` : ''}>`;
      node.childNodes.forEach(processNode);
      result += `</${tag}>`;
    }
  }

  div.childNodes.forEach(processNode);
  return result;
}

/**
 * useTypewriter
 * @param {React.RefObject} codeRef  — ref al div .ide-code
 * @param {React.RefObject} lnumsRef — ref al div .lnums
 *
 * Maneja: escritura inicial + reinicio cada ~9 s con fade.
 */
export function useTypewriter(codeRef, lnumsRef) {
  const timerRef = useRef(null);

  const typewriteAll = () => {
    clearTimeout(timerRef.current);
    if (!codeRef.current) return;

    /* Limpiar área de código */
    codeRef.current.innerHTML = '';

    /* Regenerar números de línea */
    if (lnumsRef.current) {
      lnumsRef.current.innerHTML = '';
      for (let i = 1; i <= IDE_LINES.length; i++) {
        const d  = document.createElement('div');
        d.textContent = i;
        lnumsRef.current.appendChild(d);
      }
    }

    /* Crear filas vacías */
    const rows = IDE_LINES.map(line => {
      const row       = document.createElement('div');
      row.className   = 'cl' + (line.active ? ' aline' : '');
      codeRef.current.appendChild(row);
      return row;
    });

    let lineIdx = 0;
    let charIdx = 0;

    const tick = () => {
      if (!codeRef.current || lineIdx >= IDE_LINES.length) return;

      const line   = IDE_LINES[lineIdx];
      const rawLen = line.raw.length;

      /* Línea vacía → saltar */
      if (rawLen === 0) {
        lineIdx++;
        charIdx = 0;
        timerRef.current = setTimeout(tick, SPEED * 3);
        return;
      }

      charIdx++;

      if (charIdx <= rawLen) {
        rows[lineIdx].innerHTML =
          sliceColoredHTML(line.html, charIdx) +
          '<span class="hcursor"></span>';
        timerRef.current = setTimeout(tick, SPEED);
      } else {
        /* Línea completada */
        rows[lineIdx].innerHTML = line.html;
        lineIdx++;
        charIdx = 0;
        timerRef.current = setTimeout(tick, SPEED * 8);
      }
    };

    timerRef.current = setTimeout(tick, 400);
  };

  useEffect(() => {
    typewriteAll();

    /* Reiniciar con fade cada 9 s */
    const iv = setInterval(() => {
      const code  = codeRef.current;
      const lnums = lnumsRef.current;
      if (!code || !lnums) return;

      code.style.cssText  += 'transition:opacity .35s;opacity:0';
      lnums.style.cssText += 'transition:opacity .35s;opacity:0';

      setTimeout(() => {
        if (!codeRef.current || !lnumsRef.current) return;
        codeRef.current.style.opacity  = '1';
        lnumsRef.current.style.opacity = '1';
        typewriteAll();
      }, 380);
    }, 9000);

    return () => {
      clearTimeout(timerRef.current);
      clearInterval(iv);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}