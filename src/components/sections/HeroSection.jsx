// src/components/sections/HeroSection.jsx
import { useEffect, useRef } from 'react';
import '../../styles/hero.css';

/* ─────────────────────────────────────────────
   16 TECH ICONS — SVGs exactos del diseño v7
   Orden: React · Flutter · AWS · Firebase · Azure · TypeScript · Figma · Docker
          Dart  · Node   · Python · MySQL · VSCode · Postman · Jira · Git
───────────────────────────────────────────── */
const TECH_ICONS = [
  /* 1 — React */
  { label:'React', dur:'3.4s', del:'0s', ic:'rgba(97,218,251,.5)', ig:'rgba(97,218,251,.18)',
    svg: <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.05" fill="#61DAFB"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" fill="none"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" fill="none" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" fill="none" transform="rotate(120 12 12)"/>
    </svg> },

  /* 2 — Flutter */
  { label:'Flutter', dur:'3.8s', del:'.25s', ic:'rgba(84,197,248,.5)', ig:'rgba(84,197,248,.18)',
    svg: <svg viewBox="0 0 24 24">
      <path d="M14.314 0L2.3 12 6 15.7 21.684.012z" fill="#54C5F8"/>
      <path d="M14.314 11.986L6.3 20l3.71 3.7 1.34-1.36 5.66-5.66z" fill="#01579B"/>
      <path d="M6.3 20l5.67-5.67 2.7 2.7L11.99 20l-2.7 2.7z" fill="#29B6F6"/>
    </svg> },

  /* 3 — AWS (SVG completo del original) */
  { label:'AWS', dur:'3.2s', del:'.5s', ic:'rgba(255,153,0,.5)', ig:'rgba(255,153,0,.15)',
    svg: <svg viewBox="0 0 24 24" fill="#FF9900">
      <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 01-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 01-.287-.375 6.18 6.18 0 01-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 01-.28.104.488.488 0 01-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 01.224-.167c.279-.144.614-.264 1.005-.36A4.84 4.84 0 013.8 7.52c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 00-.735-.136 6.02 6.02 0 00-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 01-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 01.32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 01.311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 01-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 01-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 01-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 00.415-.758.777.777 0 00-.215-.559c-.144-.151-.416-.287-.806-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 01-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.311.088.455.136.144.048.256.096.336.144a.69.69 0 01.24.2.43.43 0 01.071.263v.375c0 .168-.064.256-.184.256a.83.83 0 01-.303-.096 3.652 3.652 0 00-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/>
      <path d="M21.342 15.622c-2.566 1.9-6.29 2.909-9.498 2.909-4.491 0-8.536-1.661-11.593-4.423-.24-.216-.024-.51.263-.343 3.305 1.924 7.388 3.079 11.608 3.079 2.845 0 5.975-.59 8.854-1.813.431-.191.798.279.366.591z"/>
      <path d="M22.44 14.368c-.327-.42-2.167-.2-2.997-.1-.25.031-.289-.191-.063-.351 1.469-1.03 3.877-.734 4.155-.39.279.352-.072 2.76-1.453 3.912-.215.183-.415.088-.32-.151.311-.774.998-2.503.678-2.92z"/>
    </svg> },

  /* 4 — Firebase */
  { label:'Firebase', dur:'4.1s', del:'.75s', ic:'rgba(255,202,40,.5)', ig:'rgba(255,202,40,.14)',
    svg: <svg viewBox="0 0 24 24">
      <path d="M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771z" fill="#FFA000"/>
      <path d="M16.326 9.785l-2.257-4.497a.542.542 0 00-.96 0L3.53 17.984z" fill="#F57C00"/>
      <path d="M20.684 19.376l-2.25-14a.54.54 0 00-.919-.295L3.316 19.367l7.856 4.427a1.621 1.621 0 001.588 0z" fill="#FFCA28"/>
    </svg> },

  /* 5 — Azure */
  { label:'Azure', dur:'3.6s', del:'1s', ic:'rgba(0,120,212,.6)', ig:'rgba(0,120,212,.2)',
    svg: <svg viewBox="0 0 24 24">
      <path d="M13.05 4.24L6.56 18.05l-4.53.01 5.32-9.25z" fill="#0078D4"/>
      <path d="M13.75 3.54l3.65 10.76-6.99 1.93 7.39.01L21.97 19H13.8z" fill="#0078D4"/>
    </svg> },

  /* 6 — TypeScript */
  { label:'TypeScript', dur:'3.3s', del:'1.25s', ic:'rgba(49,120,198,.6)', ig:'rgba(49,120,198,.2)',
    svg: <svg viewBox="0 0 24 24">
      <rect width="24" height="24" rx="2" fill="#3178C6"/>
      <path d="M14.5 11H19v1.5h-2V18h-2v-5.5h-2V11h1.5z" fill="white"/>
      <path d="M11.5 13.5c0-.8-.5-1.5-1.5-1.5H7v6h2v-2h.5l1 2H13l-1.2-2.3c.4-.4.7-1 .7-1.7v-.5zm-2 1H9v-1h.5c.3 0 .5.2.5.5s-.2.5-.5.5z" fill="white"/>
    </svg> },

  /* 7 — Figma */
  { label:'Figma', dur:'3.5s', del:'1.5s', ic:'rgba(162,89,255,.5)', ig:'rgba(162,89,255,.16)',
    svg: <svg viewBox="0 0 24 24">
      <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83"/>
      <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF"/>
      <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E"/>
      <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262"/>
      <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE"/>
    </svg> },

  /* 8 — Docker (SVG completo del original) */
  { label:'Docker', dur:'3.9s', del:'1.75s', ic:'rgba(36,150,237,.5)', ig:'rgba(36,150,237,.16)',
    svg: <svg viewBox="0 0 24 24">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.084-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288-.29-.216z" fill="#2496ED"/>
    </svg> },

  /* 9 — Dart */
  { label:'Dart', dur:'3.7s', del:'2s', ic:'rgba(0,180,216,.5)', ig:'rgba(0,180,216,.16)',
    svg: <svg viewBox="0 0 24 24">
      <path d="M4.105 4.105S9.158 1.58 11.684.316a3.079 3.079 0 011.481-.315c.766.047 1.677.788 1.677.788L24 9.948v9.789l-8.075 4.137L4.105 4.105z" fill="#00B4D8"/>
      <path d="M.137 9.949S-.316 6.58 1.053 5.211L4.105 4.105l11.82 19.769-4.052 2.079a3.717 3.717 0 01-1.9.047L.137 9.949z" fill="#0077B6"/>
    </svg> },

  /* 10 — Node.js (SVG completo del original) */
  { label:'Node.js', dur:'3.6s', del:'2.25s', ic:'rgba(104,160,99,.5)', ig:'rgba(104,160,99,.16)',
    svg: <svg viewBox="0 0 24 24">
      <path d="M11.998 24a1.36 1.36 0 01-.679-.18L8.556 22.16c-.404-.226-.207-.306-.073-.352.54-.188.648-.23 1.22-.557.06-.036.14-.022.2.013l2.106 1.25c.077.042.185.042.254 0l8.207-4.738c.077-.045.127-.136.127-.23V6.451c0-.097-.05-.185-.13-.232L12.26 1.485c-.077-.044-.18-.044-.254 0L3.8 6.219c-.082.047-.133.138-.133.232v9.472c0 .092.051.182.13.226l2.249 1.3c1.22.61 1.967-.109 1.967-.832V7.204c0-.133.106-.236.238-.236h1.038c.13 0 .237.103.237.236v9.413c0 1.629-.887 2.563-2.43 2.563-.474 0-.847 0-1.893-.515l-2.154-1.24a1.364 1.364 0 01-.679-1.181V6.452c0-.487.26-.939.679-1.184L11.32.528a1.414 1.414 0 011.36 0l8.208 4.74c.419.245.679.697.679 1.184v9.472c0 .487-.26.936-.679 1.18l-8.208 4.74a1.358 1.358 0 01-.682.156zm2.532-6.52c-3.596 0-4.347-1.65-4.347-3.038 0-.133.107-.236.238-.236h1.06c.118 0 .217.085.235.201.16 1.08.638 1.624 2.814 1.624 1.732 0 2.468-.392 2.468-1.313 0-.53-.21-.924-2.904-1.189-2.252-.222-3.644-.72-3.644-2.521 0-1.663 1.4-2.652 3.748-2.652 2.635 0 3.942.914 4.107 2.876a.237.237 0 01-.237.257h-1.064a.236.236 0 01-.23-.183c-.257-1.139-.882-1.504-2.576-1.504-1.897 0-2.117.66-2.117 1.156 0 .6.26.775 2.816 1.113 2.529.335 3.727.81 3.727 2.588-.003 1.796-1.498 2.82-4.093 2.82z" fill="#68A063"/>
    </svg> },

  /* 11 — Python */
  { label:'Python', dur:'4.2s', del:'2.5s', ic:'rgba(55,118,171,.5)', ig:'rgba(55,118,171,.16)',
    svg: <svg viewBox="0 0 24 24">
      <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.912S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.031v-2.867s-.109-3.402 3.35-3.402h5.769s3.24.052 3.24-3.13V3.13S18.28 0 11.914 0zm-3.24 1.814a1.05 1.05 0 110 2.1 1.05 1.05 0 010-2.1z" fill="#3776AB"/>
      <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.109S24 18.211 24 12.031c0-6.18-3.403-5.96-3.403-5.96h-2.031v2.867s.109 3.402-3.35 3.402H9.447s-3.24-.052-3.24 3.13V20.87S5.72 24 12.086 24zm3.24-1.814a1.05 1.05 0 110-2.1 1.05 1.05 0 010 2.1z" fill="#FFD43B"/>
    </svg> },

  /* 12 — MySQL (SVG completo del original) */
  { label:'MySQL', dur:'3.4s', del:'2.75s', ic:'rgba(0,117,143,.5)', ig:'rgba(0,117,143,.16)',
    svg: <svg viewBox="0 0 24 24" fill="#00758F">
      <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.19.248.274l.055.036.015-.015c.049-.044.08-.109.066-.181-.026-.108-.113-.16-.124-.16zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 1.966.378 3.882.428 5.53zM9.81 14.58H8.217v1.673h1.47v.633H8.217v2.146H9.87v.663H7.462v-5.775h2.348zm5.501 5.53h-.96l-2.613-4.492h-.01c.04.867.057 1.728.054 2.587v1.905h-.82v-5.775h.99l2.576 4.449h.012c-.036-.826-.05-1.646-.044-2.466v-1.983h.815zm4.007.099c-1.32 0-2.218-.912-2.218-2.99 0-1.84.863-3.009 2.274-3.009.43 0 .774.068 1.068.193v.726a2.058 2.058 0 00-.984-.26c-.946 0-1.46.799-1.46 2.296 0 1.547.536 2.33 1.467 2.33.382 0 .742-.104 1.031-.278v.715c-.3.178-.667.277-1.178.277zm4.52-.099h-.961l-2.614-4.492h-.01c.04.867.057 1.728.054 2.587v1.905h-.82v-5.775h.991l2.576 4.449h.012c-.036-.826-.051-1.646-.045-2.466v-1.983h.817z"/>
    </svg> },

  /* 13 — VSCode */
  { label:'VSCode', dur:'3.3s', del:'3s', ic:'rgba(0,120,212,.6)', ig:'rgba(0,120,212,.2)',
    svg: <svg viewBox="0 0 24 24">
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 00-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 00-1.276.057L.327 7.261A1 1 0 00.326 8.74L3.899 12 .326 15.26a1 1 0 00.001 1.479L1.65 17.94a.999.999 0 001.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 001.704.29l4.942-2.377A1.5 1.5 0 0024 20.06V3.939a1.5 1.5 0 00-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" fill="#007ACC"/>
    </svg> },

  /* 14 — Postman (SVG completo del original) */
  { label:'Postman', dur:'4.0s', del:'3.25s', ic:'rgba(255,108,55,.5)', ig:'rgba(255,108,55,.16)',
    svg: <svg viewBox="0 0 24 24">
      <path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.934 14.29l-4.79-4.79 5.963-5.963 3.347 3.347-4.52 7.406zM11.39 10.17l4.81 4.81-7.624 1.616 2.814-6.426zm-.234-.44L7.52 6.093 6.2 3.453l6.624 5.543-1.668 1.668-.001-.001-.001.001zM7.272 6.31l3.474 3.474-2.88 6.574-2.39-1.005L7.273 6.31zM11.8 10.43l.96-.96 4.57 4.57-.527.863L11.8 10.43zm3.986 5.56l.527-.863L19.55 18.3a13.33 13.33 0 01-3.764 2.152l-2.834-2.834 2.834-2.833.001-.001-.001.001z" fill="#FF6C37"/>
    </svg> },

  /* 15 — Jira (SVG correcto del original) */
  { label:'Jira', dur:'3.8s', del:'3.5s', ic:'rgba(38,132,255,.5)', ig:'rgba(38,132,255,.16)',
    svg: <svg viewBox="0 0 24 24">
      <path d="M11.571 11.513H0a5.218 5.218 0 005.232 5.215h2.13v2.057A5.215 5.215 0 0012.575 24V12.518a1.005 1.005 0 00-1.004-1.005zm5.723-5.756H5.757a5.215 5.215 0 005.215 5.214h2.129v2.058a5.218 5.218 0 005.215 5.214V6.762a1.005 1.005 0 00-1.022-1.005zM23.013 0H11.485a5.215 5.215 0 005.215 5.215h2.129v2.057A5.215 5.215 0 0024 12.483V1.005A1.005 1.005 0 0023.013 0z" fill="#2684FF"/>
    </svg> },

  /* 16 — Git */
  { label:'Git', dur:'3.6s', del:'3.75s', ic:'rgba(240,80,50,.5)', ig:'rgba(240,80,50,.16)',
    svg: <svg viewBox="0 0 24 24">
      <path d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.327 2.341l2.658 2.66a1.838 1.838 0 011.9 3.039 1.837 1.837 0 01-2.6 0 1.846 1.846 0 01-.404-2.013l-2.48-2.48v6.522a1.843 1.843 0 01.48 3.59 1.838 1.838 0 01-1.635-3.271v-6.59a1.838 1.838 0 01-1.001-2.406L8.042 4.197.454 11.783a1.55 1.55 0 000 2.188l10.48 10.478a1.55 1.55 0 002.187 0l10.425-10.426a1.55 1.55 0 000-2.093z" fill="#F05032"/>
    </svg> },
];

/* ─────────────────────────────────────────────
   IDE TYPEWRITER LINES
───────────────────────────────────────────── */
const IDE_LINES = [
  { raw: "import React,{useState} from 'react'",
    html: `<span class="cb">import</span> <span class="cw">React</span><span class="cgr">,{useState}</span> <span class="cb">from</span> <span class="cg">'react'</span>` },
  { raw: "import { db } from './firebase'",
    html: `<span class="cb">import</span> <span class="cw">{ db }</span> <span class="cb">from</span> <span class="cg">'./firebase'</span>` },
  { raw: "// ✦ Portfolio · Leonardo Daniel",
    html: `<span class="cgr">// ✦ Portfolio · Leonardo Daniel</span>` },
  { raw: "", html: `` },
  { raw: "const HeroSection = () => {",
    html: `<span class="cb">const</span> <span class="co">HeroSection</span> <span class="cw">= () => {</span>` },
  { raw: "  return (",
    html: `&nbsp;&nbsp;<span class="cp">return</span> <span class="cw">(</span>` },
  { raw: '    <section id="hero">',
    html: `&nbsp;&nbsp;&nbsp;&nbsp;<span class="cr2">&lt;section</span> <span class="cy">id</span><span class="cw">=</span><span class="cg">"hero"</span><span class="cr2">&gt;</span>` },
  { raw: '      <Dev name="Leonardo"/>',
    html: `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cr2">&lt;Dev</span> <span class="cy">name</span><span class="cw">=</span><span class="cg">"Leonardo"</span><span class="cr2">/&gt;</span>`,
    active: true },
];

/* ─────────────────────────────────────────────
   ANIMATED KEYBOARD
   39 teclas (13×3). Las azules y rojas se
   "presionan" aleatoriamente con CSS + JS.
───────────────────────────────────────────── */
// Índices de las teclas de color
const BLUE_KEYS = [3, 9, 16, 22, 30];   // 5 teclas azules
const RED_KEYS  = [19];                  // 1 tecla roja

function AnimatedKeyboard() {
  const keysRef = useRef([]);

  useEffect(() => {
    const all = [...BLUE_KEYS, ...RED_KEYS];
    const timers = [];

    const pressKey = idx => {
      const el = keysRef.current[idx];
      if (!el) return;
      el.classList.add('key-pressed');
      const t = setTimeout(() => el.classList.remove('key-pressed'), 180);
      timers.push(t);
    };

    const loop = () => {
      // Presiona 1 ó 2 teclas aleatorias
      const shuffled = [...all].sort(() => Math.random() - 0.5);
      const count = Math.random() > 0.55 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        const t = setTimeout(() => pressKey(shuffled[i]), i * 110);
        timers.push(t);
      }
      const t = setTimeout(loop, 380 + Math.random() * 620);
      timers.push(t);
    };

    const start = setTimeout(loop, 1400);
    timers.push(start);
    return () => timers.forEach(clearTimeout);
  }, []);

  const getClass = i => {
    if (RED_KEYS.includes(i))  return 'key key-red';
    if (BLUE_KEYS.includes(i)) return 'key key-blue';
    if ([6,13,26,33].includes(i)) return 'key key-lit';
    return 'key';
  };

  return (
    <div className="d-kbd">
      {Array.from({ length: 39 }, (_, i) => (
        <div key={i} className={getClass(i)} ref={el => keysRef.current[i] = el} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function HeroSection() {
  const codeAreaRef = useRef(null);
  const lnumsRef    = useRef(null);
  const typeTimer   = useRef(null);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  /* ── Typewriter helpers ── */
  const escHtml = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  const sliceColoredHTML = (html, n) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    let visible = 0, result = '';
    const proc = node => {
      if (visible >= n) return;
      if (node.nodeType === 3) {
        const sl = node.textContent.slice(0, n - visible);
        result += escHtml(sl); visible += sl.length;
      } else if (node.nodeType === 1) {
        const t = node.tagName.toLowerCase(), c = node.getAttribute('class') || '';
        result += `<${t}${c ? ` class="${c}"` : ''}>`;
        node.childNodes.forEach(proc);
        result += `</${t}>`;
      }
    };
    div.childNodes.forEach(proc);
    return result;
  };

  const buildLineNums = count => {
    if (!lnumsRef.current) return;
    lnumsRef.current.innerHTML = '';
    for (let i = 1; i <= count; i++) {
      const d = document.createElement('div'); d.textContent = i;
      lnumsRef.current.appendChild(d);
    }
  };

  const typewriteAll = () => {
    clearTimeout(typeTimer.current);
    if (!codeAreaRef.current) return;
    codeAreaRef.current.innerHTML = '';
    buildLineNums(IDE_LINES.length);
    const rows = [], SPEED = 28;
    let lineIdx = 0, charIdx = 0;

    IDE_LINES.forEach(l => {
      const row = document.createElement('div');
      row.className = 'cl' + (l.active ? ' aline' : '');
      codeAreaRef.current.appendChild(row);
      rows.push(row);
    });

    const tick = () => {
      if (!codeAreaRef.current || lineIdx >= IDE_LINES.length) return;
      const line = IDE_LINES[lineIdx], rawLen = line.raw.length;
      if (rawLen === 0) { lineIdx++; charIdx = 0; typeTimer.current = setTimeout(tick, SPEED * 3); return; }
      charIdx++;
      if (charIdx <= rawLen) {
        rows[lineIdx].innerHTML = sliceColoredHTML(line.html, charIdx) + '<span class="hcursor"></span>';
        typeTimer.current = setTimeout(tick, SPEED);
      } else {
        rows[lineIdx].innerHTML = line.html;
        lineIdx++; charIdx = 0;
        typeTimer.current = setTimeout(tick, SPEED * 8);
      }
    };
    typeTimer.current = setTimeout(tick, 400);
  };

  useEffect(() => {
    typewriteAll();
    const iv = setInterval(() => {
      if (!codeAreaRef.current || !lnumsRef.current) return;
      codeAreaRef.current.style.cssText += 'transition:opacity .35s;opacity:0';
      lnumsRef.current.style.cssText    += 'transition:opacity .35s;opacity:0';
      setTimeout(() => {
        if (!codeAreaRef.current || !lnumsRef.current) return;
        codeAreaRef.current.style.opacity = '1';
        lnumsRef.current.style.opacity    = '1';
        typewriteAll();
      }, 380);
    }, 9000);
    return () => { clearTimeout(typeTimer.current); clearInterval(iv); };
  }, []);

  /* ── JSX ── */
  return (
    <section id="hero">
      <div className="hero-inner">

        {/* ══════ LEFT COLUMN ══════ */}
        <div>
          <h1 className="hero-name">
            <span className="n-white">Leonardo </span>
            <span className="n-grad">Daniel</span>
          </h1>

          <div className="hero-role-wrap">
            <div className="hero-role">
              <span className="r-br">&lt;</span>
              <span className="r-fe">Frontend</span>
              <span className="r-amp">&amp;</span>
              <span className="r-mob">Mobile Dev</span>
              <span className="r-sep">·</span>
              <span className="r-ux">UX</span>
              <span className="r-dot">·</span>
              <span className="r-qa">QA</span>
              <span className="r-br">/&gt;</span>
            </div>
            <div className="role-underline">
              <div className="role-underline-track" />
            </div>
          </div>

          <div className="role-divider" />

          <p className="hero-desc">
            Apasionado por crear experiencias digitales que combinan{' '}
            <strong>estética</strong> y <strong>funcionalidad</strong>.
            Especializado en <strong>React</strong>, <strong>Flutter</strong> y{' '}
            <strong>AWS</strong>, con enfoque en calidad y detalle pixel a pixel.
          </p>

          <div className="cta-group">
            <button className="btn-projects" onClick={() => scrollTo('proyectos')}>
              🚀 Ver Proyectos
            </button>
            <button className="btn-contact" onClick={() => scrollTo('contacto')}>
              ✉ Contacto
            </button>
          </div>

          {/* Tech icons 8×2 */}
          <div className="tech-grid">
            {TECH_ICONS.map((t, i) => (
              <div
                key={i}
                className="ti"
                title={t.label}
                style={{ '--dur': t.dur, '--del': t.del, '--ic': t.ic, '--ig': t.ig }}
              >
                <div className="ti-icon">{t.svg}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════ RIGHT COLUMN — MONITOR SCENE ══════ */}
        <div className="hero-right">
          <div className="mon-glow" />
          <div className="scene">

            {/* Monitor */}
            <div className="mon-wrap">
              <div className="mon-3d">
                <div className="mon-screen">

                  {/* IDE top bar */}
                  <div className="ide-top">
                    <div className="dot2 dr" />
                    <div className="dot2 dy" />
                    <div className="dot2 dg" />
                    <div className="ide-tabs">
                      <div className="tab2 tab-a">App.jsx</div>
                      <div className="tab2">firebase.js</div>
                    </div>
                  </div>

                  {/* Typewriter body */}
                  <div className="ide-body">
                    <div className="lnums" ref={lnumsRef} />
                    <div className="ide-code" ref={codeAreaRef} />
                  </div>

                  {/* Status bar */}
                  <div className="ide-status">
                    <span><span className="s-err">✓</span> 0 errors</span>
                    <span className="s-br">main ⎇</span>
                    <span>JSX · UTF-8</span>
                  </div>
                </div>
                <div className="mon-neck" />
                <div className="mon-base" />
              </div>
            </div>

            {/* ── Desk objects ── */}
            <div className="d-lamp">
              <div className="lamp-cone" />
              <svg viewBox="0 0 48 80" fill="none" width="42">
                <rect x="21" y="38" width="6" height="36" rx="3" fill="#2a3450"/>
                <ellipse cx="24" cy="74" rx="10" ry="4" fill="#1e2840"/>
                <path d="M8 8 L40 8 L32 34 L16 34 Z" fill="#f0c040" opacity=".9"/>
                <path d="M8 8 L40 8 L36 12 L12 12 Z" fill="#e0a020"/>
                <rect x="10" y="4" width="28" height="5" rx="2.5" fill="#333d55"/>
              </svg>
            </div>

            <div className="d-hp">
              <svg viewBox="0 0 52 52" fill="none" width="44">
                <path d="M8 28a18 18 0 0136 0" stroke="#4a5568" strokeWidth="3" fill="none"/>
                <rect x="4" y="26" width="8" height="14" rx="4" fill="#2563eb"/>
                <rect x="40" y="26" width="8" height="14" rx="4" fill="#2563eb"/>
                <rect x="2" y="30" width="6" height="8" rx="3" fill="#1d4ed8"/>
                <rect x="44" y="30" width="6" height="8" rx="3" fill="#1d4ed8"/>
              </svg>
            </div>

            <div className="d-sticky">
              <svg viewBox="0 0 52 52" fill="none" width="44">
                <rect x="4" y="4" width="44" height="44" rx="4" fill="#fde68a"/>
                <rect x="4" y="4" width="44" height="8" rx="4" fill="#fbbf24"/>
                <rect x="10" y="18" width="28" height="2.5" rx="1.2" fill="#92400e" opacity=".5"/>
                <rect x="10" y="25" width="22" height="2.5" rx="1.2" fill="#92400e" opacity=".4"/>
                <rect x="10" y="32" width="18" height="2.5" rx="1.2" fill="#92400e" opacity=".3"/>
              </svg>
            </div>

            <div className="d-phone">
              <svg viewBox="0 0 32 56" fill="none" width="28">
                <rect x="1" y="1" width="30" height="54" rx="5" fill="#1e293b" stroke="rgba(120,160,255,.4)" strokeWidth="1.5"/>
                <rect x="3" y="6" width="26" height="40" rx="2" fill="#0f172a"/>
                <rect x="9" y="2" width="14" height="3" rx="1.5" fill="#334155"/>
                <circle cx="16" cy="50" r="3" fill="#334155"/>
                <rect x="5" y="8" width="22" height="36" rx="1.5" fill="#1e3a5f" opacity=".8"/>
                <rect x="7" y="10" width="18" height="3" rx="1" fill="rgba(97,218,251,.4)"/>
                <rect x="7" y="16" width="14" height="2" rx="1" fill="rgba(255,255,255,.15)"/>
              </svg>
            </div>

            <div className="d-plant">
              <svg viewBox="0 0 70 75" fill="none" width="68">
                <rect x="24" y="54" width="22" height="16" rx="3" fill="#6D4C41"/>
                <rect x="22" y="50" width="26" height="7" rx="2" fill="#5D4037"/>
                <rect x="33" y="36" width="3" height="17" fill="#388E3C"/>
                <ellipse cx="34" cy="32" rx="8" ry="14" fill="#2E7D32" transform="rotate(-18 34 32)"/>
                <ellipse cx="34" cy="32" rx="8" ry="14" fill="#43A047" transform="rotate(18 34 32)"/>
                <ellipse cx="34" cy="26" rx="6" ry="10" fill="#66BB6A"/>
                <ellipse cx="28" cy="38" rx="5" ry="8" fill="#388E3C" transform="rotate(-30 28 38)"/>
                <ellipse cx="40" cy="38" rx="5" ry="8" fill="#43A047" transform="rotate(30 40 38)"/>
              </svg>
            </div>

            <div className="d-mug">
              <div className="stgrp">
                <div className="st" /><div className="st" /><div className="st" />
              </div>
              <svg viewBox="0 0 58 58" fill="none" width="58">
                <rect x="6" y="20" width="32" height="28" rx="5" fill="#1565C0"/>
                <rect x="6" y="20" width="32" height="8" rx="4" fill="#1E88E5"/>
                <path d="M38 26h6a6 6 0 010 12h-6" stroke="#1976D2" strokeWidth="2.5" strokeLinecap="round"/>
                <rect x="4" y="48" width="36" height="5" rx="2" fill="#0D47A1"/>
                <ellipse cx="22" cy="36" rx="8" ry="3.2" stroke="#61DAFB" strokeWidth="1" fill="none"/>
                <ellipse cx="22" cy="36" rx="8" ry="3.2" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60 22 36)"/>
                <ellipse cx="22" cy="36" rx="8" ry="3.2" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(120 22 36)"/>
                <circle cx="22" cy="36" r="1.6" fill="#61DAFB"/>
              </svg>
            </div>

            {/* Animated keyboard */}
            <AnimatedKeyboard />

            {/* Bug */}
            <div style={{ position:'absolute', top:'-10px', left:'50%', transform:'translateX(-50%)' }}>
              <div className="d-bug">🐛</div>
              <div className="d-bugx">×</div>
            </div>

            <div className="desk-surface" />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint" onClick={() => scrollTo('proyectos')}>
        <span className="sh-t">scroll</span>
        <div className="sh-a">↓</div>
      </div>
    </section>
  );
}