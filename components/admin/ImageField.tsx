import React, { useRef, useState } from 'react';
import { uploadPresigned } from '@vercel/blob/client';
import { ImagePlus, Link2, Loader2, Trash2, Upload } from 'lucide-react';
import { auth } from '../../lib/firebase';
import { apiUrl } from '../../lib/api';
import { inputClass } from './ui';

type Lang = 'EN' | 'TR';

const MAX_MB = 8;

// Blob pathnames are safest as plain ASCII: "Ekran görüntüsü (1).PNG" -> "ekran-goruntusu-1.png"
const safeFileName = (name: string) => {
  const dot = name.lastIndexOf('.');
  const ext = dot > 0 ? name.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, '') : '';
  const base = (dot > 0 ? name.slice(0, dot) : name)
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/ı/g, 'i').replace(/İ/g, 'I')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'image';
  return ext ? `${base}.${ext}` : base;
};

// Image input for the admin: drop or pick a file to upload it to Vercel Blob, or paste a URL
export const ImageField: React.FC<{
  value: string | undefined;
  onChange: (url: string) => void;
  lang: Lang;
  folder: string;
  hint?: string;
  previewClassName?: string;
  fit?: 'cover' | 'contain';
}> = ({ value, onChange, lang, folder, hint, previewClassName = 'h-40', fit = 'cover' }) => {
  const tr = lang === 'TR';
  const uploadUrl = apiUrl('upload');
  const fileRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [showUrl, setShowUrl] = useState(!uploadUrl);

  const uploadFile = async (file: File) => {
    setError('');
    if (!uploadUrl) return;
    if (!file.type.startsWith('image/')) {
      setError(tr ? 'Sadece görsel dosyaları yüklenebilir.' : 'Only image files can be uploaded.');
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(tr ? `Dosya en fazla ${MAX_MB} MB olabilir.` : `Files can be at most ${MAX_MB} MB.`);
      return;
    }
    try {
      setProgress(0);
      const idToken = await auth.currentUser?.getIdToken();
      const blob = await uploadPresigned(`portfolio/${folder}/${safeFileName(file.name)}`, file, {
        access: 'public',
        handleUploadUrl: uploadUrl,
        clientPayload: JSON.stringify({ idToken }),
        onUploadProgress: ({ percentage }) => setProgress(percentage),
      });
      onChange(blob.url);
    } catch (e) {
      console.error('Image upload failed:', e);
      const reason = e instanceof Error ? e.message.replace(/^Vercel Blob:\s*/, '') : '';
      setError(`${tr ? 'Yükleme başarısız' : 'Upload failed'}${reason ? `: ${reason}` : '.'}`);
    } finally {
      setProgress(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  const actionClass = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors';

  return (
    <div className="space-y-2">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadFile(file);
          e.target.value = '';
        }}
      />

      {value ? (
        <div className="group relative overflow-hidden rounded-2xl border border-black/[0.08] bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.03]">
          <img src={value} alt="" className={`w-full ${fit === 'contain' ? 'object-contain p-4' : 'object-cover'} ${previewClassName}`} />
          <div className="absolute inset-x-0 bottom-0 flex justify-end gap-2 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
            {uploadUrl && (
              <button type="button" onClick={() => fileRef.current?.click()} className={`${actionClass} bg-white text-gray-900 hover:bg-gray-100`}>
                <Upload size={13} /> {tr ? 'Değiştir' : 'Replace'}
              </button>
            )}
            <button type="button" onClick={() => onChange('')} className={`${actionClass} bg-black/60 text-white hover:bg-black/80`}>
              <Trash2 size={13} /> {tr ? 'Kaldır' : 'Remove'}
            </button>
          </div>
          {progress !== null && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-semibold text-white">
              <Loader2 size={16} className="animate-spin mr-2" /> {Math.round(progress)}%
            </div>
          )}
        </div>
      ) : uploadUrl && (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          disabled={progress !== null}
          className={`w-full flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-4 py-8 text-sm transition-colors ${previewClassName} ${
            isDragging
              ? 'border-primary bg-primary/5 text-gray-900 dark:text-white'
              : 'border-black/15 text-gray-500 hover:border-black/30 hover:text-gray-800 dark:border-white/15 dark:hover:border-white/30 dark:hover:text-gray-200'
          }`}
        >
          {progress !== null ? (
            <><Loader2 size={20} className="animate-spin" /><span className="tabular-nums">{Math.round(progress)}%</span></>
          ) : (
            <>
              <ImagePlus size={22} />
              <span className="font-medium">{tr ? 'Görseli sürükleyin ya da seçin' : 'Drop an image or click to choose'}</span>
              <span className="text-xs text-gray-400">{hint ?? `JPG, PNG, WebP, AVIF, SVG · ${MAX_MB} MB`}</span>
            </>
          )}
        </button>
      )}

      {showUrl ? (
        <input
          type="url"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
          placeholder="https://"
        />
      ) : (
        <button type="button" onClick={() => setShowUrl(true)} className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          <Link2 size={13} /> {tr ? 'Bunun yerine URL yapıştır' : 'Paste a URL instead'}
        </button>
      )}

      {error && <p className="text-xs text-red-500" role="alert">{error}</p>}
    </div>
  );
};
