// Admin form controls in the site's glass style. Native browser widgets (checkbox, select,
// range, month/color pickers, confirm dialogs) are never used in the admin panel.
import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';

type Lang = 'EN' | 'TR';

const fieldClass = 'w-full flex items-center justify-between gap-2 rounded-xl border px-3 py-3 text-sm text-left transition-all bg-white/70 border-black/[0.08] text-gray-900 hover:border-black/15 dark:bg-white/[0.06] dark:border-white/10 dark:text-white dark:hover:border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:opacity-40 disabled:pointer-events-none';
const panelClass = 'rounded-2xl border border-black/[0.08] bg-white/90 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-[#0d0d0d]/90';
const optionClass = 'w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-left transition-colors';

export const inputClass = 'w-full rounded-xl border px-3 py-3 text-sm transition-all bg-white/70 border-black/[0.08] text-gray-900 placeholder-gray-400 hover:border-black/15 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-white/[0.06] dark:border-white/10 dark:text-white dark:placeholder-gray-500 dark:hover:border-white/25';

// ==================== LAYOUT ====================

export const Card: React.FC<{
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, description, action, children }) => (
  <section className="p-6 rounded-3xl border border-black/[0.08] bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
    {(title || action) && (
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          {title && <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">{title}</h3>}
          {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
        {action}
      </div>
    )}
    <div className="space-y-5">{children}</div>
  </section>
);

export const Field: React.FC<{
  label: React.ReactNode;
  hint?: React.ReactNode;
  children: React.ReactNode;
}> = ({ label, hint, children }) => (
  <div>
    <label className="block mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{label}</label>
    {children}
    {hint && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>}
  </div>
);

// ==================== POPOVER ====================

// Floating panel anchored to a trigger, portaled to <body> so card overflow never clips it
const useAnchoredPopover = (open: boolean, onClose: () => void, minWidth = 0) => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties | null>(null);

  useLayoutEffect(() => {
    if (!open) {
      setStyle(null);
      return;
    }
    const update = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (!rect) return;
      const width = Math.max(rect.width, minWidth);
      const spaceBelow = window.innerHeight - rect.bottom;
      const above = spaceBelow < 320 && rect.top > spaceBelow;
      setStyle({
        position: 'fixed',
        left: Math.max(8, Math.min(rect.left, window.innerWidth - width - 8)),
        width,
        ...(above ? { bottom: window.innerHeight - rect.top + 8 } : { top: rect.bottom + 8 }),
      });
    };
    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !anchorRef.current?.contains(target)) onClose();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        anchorRef.current?.focus();
      }
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return { anchorRef, panelRef, style };
};

const PopoverPanel: React.FC<{
  panelRef: React.RefObject<HTMLDivElement | null>;
  style: React.CSSProperties | null;
  className?: string;
  role?: string;
  children: React.ReactNode;
}> = ({ panelRef, style, className = '', role, children }) =>
  style ? createPortal(
    <div ref={panelRef} role={role} style={style} className={`z-[10001] animate-fade-in-up [animation-duration:150ms] ${panelClass} ${className}`}>
      {children}
    </div>,
    document.body
  ) : null;

// ==================== TOGGLE ====================

export const Toggle: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}> = ({ checked, onChange, label, description, className = '' }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`group inline-flex items-center gap-3 text-left rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${className}`}
  >
    <span className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
      checked ? 'bg-primary' : 'bg-black/10 group-hover:bg-black/15 dark:bg-white/10 dark:group-hover:bg-white/15'
    }`}>
      <span className={`absolute top-[3px] left-[3px] h-[18px] w-[18px] rounded-full bg-white shadow-md transition-transform duration-200 ${
        checked ? 'translate-x-5' : ''
      }`} />
    </span>
    {(label || description) && (
      <span className="flex flex-col">
        {label && <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</span>}
        {description && <span className="text-xs text-gray-500">{description}</span>}
      </span>
    )}
  </button>
);

// ==================== SELECT ====================

export interface SelectOption<T extends string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

export function Select<T extends string>({ value, options, onChange, placeholder, className = '' }: {
  value: T | undefined;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const { anchorRef, panelRef, style } = useAnchoredPopover(open, () => setOpen(false), 200);
  const selectedIndex = options.findIndex(o => o.value === value);
  const selected = options[selectedIndex];

  const choose = (option: SelectOption<T>) => {
    onChange(option.value);
    setOpen(false);
    anchorRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        setActive(Math.max(0, selectedIndex));
        setOpen(true);
      }
      return;
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(i => (i + 1) % options.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(i => (i - 1 + options.length) % options.length); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(options[active]); }
    else if (e.key === 'Tab') setOpen(false);
  };

  return (
    <>
      <button
        ref={anchorRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => { setActive(Math.max(0, selectedIndex)); setOpen(o => !o); }}
        onKeyDown={handleKeyDown}
        className={`${fieldClass} ${open ? 'border-primary/50 dark:border-primary/50' : ''} ${className}`}
      >
        <span className="flex items-center gap-2 min-w-0 truncate">
          {selected?.icon}
          {selected ? selected.label : <span className="text-gray-400 dark:text-gray-500">{placeholder}</span>}
        </span>
        <ChevronDown size={16} className={`shrink-0 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <PopoverPanel panelRef={panelRef} style={style} role="listbox" className="p-1.5 max-h-72 overflow-y-auto">
        {options.map((option, i) => (
          <button
            key={option.value}
            type="button"
            role="option"
            aria-selected={option.value === value}
            onMouseEnter={() => setActive(i)}
            onClick={() => choose(option)}
            className={`${optionClass} ${i === active ? 'bg-black/[0.05] dark:bg-white/[0.08]' : ''} ${
              option.value === value ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            {option.icon}
            <span className="flex-1 truncate">{option.label}</span>
            {option.value === value && <Check size={14} className="text-primary shrink-0" />}
          </button>
        ))}
      </PopoverPanel>
    </>
  );
}

// ==================== SEGMENTED ====================

export function Segmented<T extends string>({ value, options, onChange }: {
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
}) {
  return (
    <div role="radiogroup" className="inline-flex flex-wrap gap-1 p-1 rounded-2xl border border-black/[0.08] bg-white/60 dark:border-white/10 dark:bg-white/[0.04]">
      {options.map(option => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={option.value === value}
          onClick={() => onChange(option.value)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
            option.value === value
              ? 'bg-black text-white shadow-md dark:bg-white dark:text-black'
              : 'text-gray-600 hover:text-gray-900 hover:bg-black/[0.04] dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/[0.06]'
          }`}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}

// ==================== SLIDER ====================

export const Slider: React.FC<{
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  ariaLabel?: string;
}> = ({ value, min, max, step, onChange, ariaLabel }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const snap = (n: number) => Number(clamp(Math.round((n - min) / step) * step + min).toFixed(4));
  const percent = ((clamp(value) - min) / (max - min)) * 100;

  const setFromPointer = (clientX: number) => {
    const rect = trackRef.current!.getBoundingClientRect();
    onChange(snap(min + ((clientX - rect.left) / rect.width) * (max - min)));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const delta = { ArrowRight: step, ArrowUp: step, ArrowLeft: -step, ArrowDown: -step }[e.key];
    if (delta !== undefined) { e.preventDefault(); onChange(snap(value + delta)); }
    else if (e.key === 'Home') { e.preventDefault(); onChange(min); }
    else if (e.key === 'End') { e.preventDefault(); onChange(max); }
  };

  return (
    <div
      ref={trackRef}
      role="slider"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setFromPointer(e.clientX); }}
      onPointerMove={(e) => { if (e.currentTarget.hasPointerCapture(e.pointerId)) setFromPointer(e.clientX); }}
      onKeyDown={handleKeyDown}
      className="group relative flex items-center h-7 cursor-pointer touch-none select-none rounded-full focus:outline-none"
    >
      <div className="h-1.5 w-full rounded-full bg-black/10 dark:bg-white/10" />
      <div className="absolute left-0 h-1.5 rounded-full bg-primary" style={{ width: `${percent}%` }} />
      <div
        className="absolute w-5 h-5 -ml-2.5 rounded-full bg-white border-2 border-primary shadow-lg transition-transform group-active:scale-110 group-focus-visible:ring-4 group-focus-visible:ring-primary/30"
        style={{ left: `${percent}%` }}
      />
    </div>
  );
};

// ==================== NUMBER ====================

export const NumberStepper: React.FC<{
  value: number | undefined;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}> = ({ value, onChange, min = 0, max = Number.MAX_SAFE_INTEGER, step = 1 }) => {
  const current = value ?? 0;
  const set = (n: number) => onChange(Math.min(max, Math.max(min, n)));
  const stepButton = 'p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-black/[0.05] dark:hover:text-white dark:hover:bg-white/[0.08] disabled:opacity-30 disabled:pointer-events-none transition-colors';
  return (
    <div className={`${fieldClass} !p-1.5`}>
      <button type="button" onClick={() => set(current - step)} disabled={current <= min} className={stepButton} aria-label="−">
        <Minus size={14} />
      </button>
      <input
        type="text"
        inputMode="numeric"
        value={current}
        onChange={(e) => {
          const digits = e.target.value.replace(/[^\d]/g, '');
          set(digits === '' ? min : parseInt(digits, 10));
        }}
        className="w-full bg-transparent text-center font-semibold tabular-nums focus:outline-none"
      />
      <button type="button" onClick={() => set(current + step)} disabled={current >= max} className={stepButton} aria-label="+">
        <Plus size={14} />
      </button>
    </div>
  );
};

// ==================== MONTH PICKER ====================

const MONTHS: Record<Lang, string[]> = {
  EN: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  TR: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
};

// Value format matches the old <input type="month">: "YYYY-MM"
export const MonthPicker: React.FC<{
  value: string | undefined;
  onChange: (value: string) => void;
  lang: Lang;
  placeholder?: string;
  disabled?: boolean;
}> = ({ value, onChange, lang, placeholder, disabled }) => {
  const [open, setOpen] = useState(false);
  const { anchorRef, panelRef, style } = useAnchoredPopover(open, () => setOpen(false), 280);
  const match = /^(\d{4})-(\d{2})/.exec(value || '');
  const year = match ? Number(match[1]) : null;
  const month = match ? Number(match[2]) - 1 : null;
  const now = new Date();
  const [viewYear, setViewYear] = useState(year ?? now.getFullYear());

  useEffect(() => {
    if (open) setViewYear(year ?? now.getFullYear());
  }, [open]);

  const pick = (y: number, m: number) => {
    onChange(`${y}-${String(m + 1).padStart(2, '0')}`);
    setOpen(false);
    anchorRef.current?.focus();
  };

  const navButton = 'p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-black/[0.05] dark:hover:text-white dark:hover:bg-white/[0.08] transition-colors';
  const footerButton = 'px-3 py-1.5 rounded-full text-xs font-semibold transition-colors';

  return (
    <>
      <button
        ref={anchorRef}
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className={`${fieldClass} ${open ? 'border-primary/50 dark:border-primary/50' : ''}`}
      >
        <span className={match ? '' : 'text-gray-400 dark:text-gray-500'}>
          {match ? `${MONTHS[lang][month!]} ${year}` : (placeholder ?? (lang === 'TR' ? 'Ay seçin' : 'Pick a month'))}
        </span>
        <CalendarDays size={16} className="shrink-0 text-gray-400" />
      </button>
      <PopoverPanel panelRef={panelRef} style={style} role="dialog" className="p-3">
        <div className="flex items-center justify-between mb-3">
          <button type="button" onClick={() => setViewYear(y => y - 1)} className={navButton} aria-label={lang === 'TR' ? 'Önceki yıl' : 'Previous year'}>
            <ChevronLeft size={16} />
          </button>
          <span className="font-display font-bold text-gray-900 dark:text-white tabular-nums">{viewYear}</span>
          <button type="button" onClick={() => setViewYear(y => y + 1)} className={navButton} aria-label={lang === 'TR' ? 'Sonraki yıl' : 'Next year'}>
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {MONTHS[lang].map((name, m) => {
            const isSelected = year === viewYear && month === m;
            const isNow = now.getFullYear() === viewYear && now.getMonth() === m;
            return (
              <button
                key={name}
                type="button"
                onClick={() => pick(viewYear, m)}
                className={`py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : `hover:bg-black/[0.05] dark:hover:bg-white/[0.08] ${isNow ? 'text-primary font-bold' : 'text-gray-700 dark:text-gray-300'}`
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
        <div className="flex justify-between mt-3 pt-3 border-t border-black/[0.06] dark:border-white/10">
          <button type="button" onClick={() => { onChange(''); setOpen(false); }} className={`${footerButton} text-gray-500 hover:text-red-500`}>
            {lang === 'TR' ? 'Temizle' : 'Clear'}
          </button>
          <button type="button" onClick={() => pick(now.getFullYear(), now.getMonth())} className={`${footerButton} text-primary hover:bg-primary/10`}>
            {lang === 'TR' ? 'Bu ay' : 'This month'}
          </button>
        </div>
      </PopoverPanel>
    </>
  );
};

// ==================== COLOR PICKER ====================

const toHex = (rgb: string) => {
  const [r, g, b] = rgb.split(' ').map(Number);
  return `#${[r, g, b].map(n => (n || 0).toString(16).padStart(2, '0')).join('')}`;
};
const fromHex = (hex: string) => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  return m ? `${parseInt(m[1], 16)} ${parseInt(m[2], 16)} ${parseInt(m[3], 16)}` : null;
};

const EXTENDED_COLORS = [
  '244 63 94', '236 72 153', '168 85 247', '99 102 241', '14 165 233', '20 184 166',
  '16 185 129', '132 204 22', '245 158 11', '251 146 60', '120 113 108', '100 116 139',
];

// Value is space-separated RGB ("6 182 212"), the format of the --primary CSS variable
export const ColorPicker: React.FC<{
  value: string;
  onChange: (rgb: string) => void;
  lang: Lang;
  trigger: React.ReactNode;
  triggerClassName?: string;
}> = ({ value, onChange, lang, trigger, triggerClassName = '' }) => {
  const [open, setOpen] = useState(false);
  const [hex, setHex] = useState(toHex(value));
  const { anchorRef, panelRef, style } = useAnchoredPopover(open, () => setOpen(false), 248);

  useEffect(() => setHex(toHex(value)), [value]);

  return (
    <>
      <button ref={anchorRef} type="button" onClick={() => setOpen(o => !o)} className={triggerClassName} aria-label={lang === 'TR' ? 'Özel renk' : 'Custom color'}>
        {trigger}
      </button>
      <PopoverPanel panelRef={panelRef} style={style} role="dialog" className="p-4 !w-[248px]">
        <div className="grid grid-cols-6 gap-2 mb-4">
          {EXTENDED_COLORS.map(color => (
            <button
              key={color}
              type="button"
              onClick={() => onChange(color)}
              className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${value === color ? 'ring-2 ring-offset-2 ring-gray-900 ring-offset-white dark:ring-white dark:ring-offset-[#0d0d0d]' : ''}`}
              style={{ backgroundColor: `rgb(${color})` }}
              aria-label={`rgb(${color})`}
            />
          ))}
        </div>
        <label className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-gray-500">HEX</label>
        <div className="flex items-center gap-2">
          <span className="w-10 h-10 shrink-0 rounded-xl border border-black/[0.08] dark:border-white/10" style={{ backgroundColor: `rgb(${value})` }} />
          <input
            type="text"
            value={hex}
            onChange={(e) => {
              setHex(e.target.value);
              const rgb = fromHex(e.target.value);
              if (rgb) onChange(rgb);
            }}
            spellCheck={false}
            maxLength={7}
            className="w-full rounded-xl border px-3 py-2.5 font-mono text-sm uppercase bg-white/70 border-black/[0.08] text-gray-900 focus:outline-none focus:border-primary dark:bg-white/[0.06] dark:border-white/10 dark:text-white"
          />
        </div>
      </PopoverPanel>
    </>
  );
};

// ==================== CONFIRM DIALOG ====================

export interface ConfirmOptions {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'danger' | 'default';
}

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn>(async () => false);

export const useConfirm = () => useContext(ConfirmContext);

export const ConfirmProvider: React.FC<{ lang: Lang; children: React.ReactNode }> = ({ lang, children }) => {
  const [request, setRequest] = useState<(ConfirmOptions & { resolve: (ok: boolean) => void }) | null>(null);

  const confirm = useCallback<ConfirmFn>(
    (options) => new Promise(resolve => setRequest({ ...options, resolve })),
    []
  );

  const close = (ok: boolean) => {
    request?.resolve(ok);
    setRequest(null);
  };

  useEffect(() => {
    if (!request) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  const danger = request?.tone !== 'default';

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {request && createPortal(
        <div className="fixed inset-0 z-[10002] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => close(false)} />
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            className={`relative w-full max-w-sm p-6 !rounded-3xl animate-fade-in-up [animation-duration:200ms] ${panelClass}`}
          >
            <div className={`w-11 h-11 mb-4 rounded-2xl flex items-center justify-center ${danger ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
              <AlertTriangle size={20} />
            </div>
            <h3 id="confirm-title" className="font-display text-lg font-bold text-gray-900 dark:text-white">{request.title}</h3>
            {request.message && <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">{request.message}</p>}
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => close(false)}
                className="px-4 py-2.5 rounded-full text-sm font-semibold border border-black/[0.08] text-gray-700 hover:bg-black/[0.04] dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/[0.06] transition-colors"
              >
                {request.cancelLabel ?? (lang === 'TR' ? 'Vazgeç' : 'Cancel')}
              </button>
              <button
                type="button"
                autoFocus
                onClick={() => close(true)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold shadow-lg transition-transform hover:scale-[1.03] ${
                  danger ? 'bg-red-500 text-white' : 'bg-black text-white dark:bg-white dark:text-black'
                }`}
              >
                {request.confirmLabel ?? (lang === 'TR' ? 'Onayla' : 'Confirm')}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </ConfirmContext.Provider>
  );
};
