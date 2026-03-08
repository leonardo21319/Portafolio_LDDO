// src/admin/HeroManager.jsx
import { useState, useEffect, useRef } from 'react';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EMPTY = {
  name: '',
  title: '',
  subtitle: '',
  description: '',
  ctaText: 'Ver Proyectos',
  ctaLink: '#proyectos',
  avatarUrl: '',
  cv_url: '',
  badges: [],
};

export default function HeroManager() {
  const [form, setForm]             = useState(EMPTY);
  const [badgeInput, setBadgeInput] = useState('');
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [uploading, setUploading]   = useState(false);
  const [status, setStatus]         = useState(null); // { type: 'success'|'error', msg }
  const fileRef                     = useRef();

  // ── Cargar documento único hero/main ──────────────────────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'hero', 'main'));
        if (!cancelled && snap.exists()) setForm({ ...EMPTY, ...snap.data() });
      } catch (e) {
        console.error('HeroManager load error:', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // ── Helpers ───────────────────────────────────────────────────────
  const setField = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const addBadge = () => {
    const v = badgeInput.trim();
    if (!v || form.badges.includes(v)) return;
    setField('badges', [...form.badges, v]);
    setBadgeInput('');
  };

  const removeBadge = (b) => setField('badges', form.badges.filter(x => x !== b));

  // ── Upload imagen a Firebase Storage ──────────────────────────────
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setStatus(null);
    try {
      const storage    = getStorage();
      const storageRef = ref(storage, `hero/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setField('avatarUrl', url);
      setStatus({ type: 'success', msg: 'Imagen subida correctamente ✓' });
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', msg: 'Error al subir imagen: ' + err.message });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  // ── Guardar con setDoc merge ───────────────────────────────────────
  const handleSave = async () => {
    if (!form.name.trim() || !form.title.trim()) {
      setStatus({ type: 'error', msg: 'Nombre y título son obligatorios.' });
      return;
    }
    setSaving(true);
    setStatus(null);
    try {
      await setDoc(
        doc(db, 'hero', 'main'),
        { ...form, updatedAt: serverTimestamp() },
        { merge: true }
      );
      setStatus({ type: 'success', msg: 'Hero guardado correctamente ✓' });
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', msg: 'Error al guardar: ' + err.message });
    } finally {
      setSaving(false);
    }
  };

  // ── Loading ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent-blue mx-auto" />
          <p className="mt-4 text-text-secondary text-sm">Cargando Hero…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">

      {/* ── Header ── */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Hero Section</h2>
        <p className="text-text-secondary text-sm mt-1">
          Documento único ·{' '}
          <span className="font-mono text-accent-blue/70">hero/main</span>
        </p>
      </div>

      {/* ── Identidad ── */}
      <SectionTitle>Identidad</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Field label="Nombre completo" required>
          <Input
            value={form.name}
            onChange={e => setField('name', e.target.value)}
            placeholder="Leonardo Daniel"
          />
        </Field>

        <Field label="Título principal" required>
          <Input
            value={form.title}
            onChange={e => setField('title', e.target.value)}
            placeholder="Full Stack Developer"
          />
        </Field>

        <Field label="Subtítulo">
          <Input
            value={form.subtitle}
            onChange={e => setField('subtitle', e.target.value)}
            placeholder="& Mobile Engineer"
          />
        </Field>

        <Field label="URL del CV">
          <Input
            value={form.cv_url}
            onChange={e => setField('cv_url', e.target.value)}
            placeholder="https://drive.google.com/…"
          />
        </Field>

        <Field label="Descripción" className="sm:col-span-2">
          <textarea
            value={form.description}
            onChange={e => setField('description', e.target.value)}
            placeholder="Breve descripción que aparece en el hero…"
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-lg text-white text-sm
                       placeholder-text-secondary/50 px-4 py-2.5 resize-y
                       focus:outline-none focus:border-accent-blue/60 focus:ring-1 focus:ring-accent-blue/30
                       transition-colors"
          />
        </Field>
      </div>

      <Divider />

      {/* ── CTA ── */}
      <SectionTitle>Botón CTA</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Field label="Texto del botón">
          <Input
            value={form.ctaText}
            onChange={e => setField('ctaText', e.target.value)}
            placeholder="Ver Proyectos"
          />
        </Field>
        <Field label="Enlace del botón">
          <Input
            value={form.ctaLink}
            onChange={e => setField('ctaLink', e.target.value)}
            placeholder="#proyectos"
          />
        </Field>
      </div>

      <Divider />

      {/* ── Avatar ── */}
      <SectionTitle>Avatar / Foto de perfil</SectionTitle>
      <div className="flex items-start gap-6 flex-wrap mb-8">
        {/* Preview */}
        <div className="w-20 h-20 rounded-full border border-white/10 bg-white/5
                        flex items-center justify-center overflow-hidden flex-shrink-0 text-3xl">
          {form.avatarUrl
            ? <img src={form.avatarUrl} alt="avatar preview" className="w-full h-full object-cover" />
            : '👤'}
        </div>

        {/* Controls */}
        <div className="flex-1 min-w-[220px] space-y-3">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                       bg-accent-blue/10 hover:bg-accent-blue/20 border border-accent-blue/30
                       text-accent-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? <><Spinner /> Subiendo…</> : '📷 Subir imagen'}
          </button>
          <p className="text-xs text-text-secondary">PNG, JPG, WEBP · máx. 5 MB</p>
          <Field label="O pegar URL directamente">
            <Input
              value={form.avatarUrl}
              onChange={e => setField('avatarUrl', e.target.value)}
              placeholder="https://…"
            />
          </Field>
        </div>
      </div>

      <Divider />

      {/* ── Badges ── */}
      <SectionTitle>Badges de tecnologías</SectionTitle>
      <div className="mb-8 space-y-3">
        {/* Lista actual */}
        <div className="flex flex-wrap gap-2 min-h-[32px]">
          {form.badges.length === 0
            ? <span className="text-sm text-text-secondary/50">Sin badges aún</span>
            : form.badges.map(b => (
              <span
                key={b}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm
                           bg-accent-blue/10 border border-accent-blue/25 text-accent-blue"
              >
                {b}
                <button
                  onClick={() => removeBadge(b)}
                  className="text-text-secondary hover:text-red-400 transition-colors leading-none ml-0.5"
                >
                  ✕
                </button>
              </span>
            ))}
        </div>

        {/* Input agregar */}
        <div className="flex gap-2">
          <Input
            value={badgeInput}
            onChange={e => setBadgeInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addBadge())}
            placeholder="React, Flutter, Node.js… (Enter para agregar)"
          />
          <button
            onClick={addBadge}
            className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                       bg-accent-blue/10 hover:bg-accent-blue/20 border border-accent-blue/30
                       text-accent-blue transition-colors"
          >
            + Agregar
          </button>
        </div>
      </div>

      {/* ── Status + Guardar ── */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-white/5">
        <span className={`text-sm ${
          status?.type === 'success' ? 'text-green-400' :
          status?.type === 'error'   ? 'text-red-400'   : 'invisible'
        }`}>
          {status?.msg || '·'}
        </span>

        <button
          onClick={handleSave}
          disabled={saving || uploading}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm
                     bg-accent-blue hover:bg-accent-blue/90 text-white
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? <><Spinner /> Guardando…</> : '💾 Guardar Hero'}
        </button>
      </div>

    </div>
  );
}

// ── Componentes de UI reutilizables ───────────────────────────────────

function SectionTitle({ children }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-widest text-text-secondary mb-4">
      {children}
    </h3>
  );
}

function Field({ label, required, children, className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-medium text-text-secondary">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function Input({ className = '', ...props }) {
  return (
    <input
      {...props}
      className={`w-full bg-white/5 border border-white/10 rounded-lg text-white text-sm
                  placeholder-text-secondary/50 px-4 py-2.5
                  focus:outline-none focus:border-accent-blue/60 focus:ring-1 focus:ring-accent-blue/30
                  transition-colors ${className}`}
    />
  );
}

function Divider() {
  return <hr className="border-white/5 mb-6 mt-2" />;
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z
           m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}