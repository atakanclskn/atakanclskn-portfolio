import React, { useState, useRef, KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  theme: 'light' | 'dark';
  inputClass: string;
}

export const TagInput: React.FC<TagInputProps> = ({ tags, onChange, placeholder, theme, inputClass }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInputValue('');
  };

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        // Support comma-separated paste: "React, Node.js, TypeScript"
        const parts = inputValue.split(',').map(s => s.trim()).filter(Boolean);
        const newTags = [...tags];
        parts.forEach(part => {
          if (!newTags.includes(part)) {
            newTags.push(part);
          }
        });
        onChange(newTags);
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text');
    if (pasted.includes(',')) {
      e.preventDefault();
      const parts = pasted.split(',').map(s => s.trim()).filter(Boolean);
      const newTags = [...tags];
      parts.forEach(part => {
        if (!newTags.includes(part)) {
          newTags.push(part);
        }
      });
      onChange(newTags);
      setInputValue('');
    }
  };

  return (
    <div>
      <div
        className={`flex flex-wrap gap-2 border rounded-xl p-2.5 min-h-[44px] cursor-text transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/50 ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
            : 'bg-white border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tag}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeTag(i);
              }}
              className={`rounded-full p-0.5 transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-gray-500 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-300 text-gray-500 hover:text-gray-700'
              }`}
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={() => {
            if (inputValue.trim()) {
              addTag(inputValue);
            }
          }}
          placeholder={tags.length === 0 ? placeholder : ''}
          className={`flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm ${
            theme === 'dark'
              ? 'text-white placeholder-gray-500'
              : 'text-gray-900 placeholder-gray-400'
          }`}
        />
      </div>
      <p className={`text-[10px] mt-1.5 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
        Press Enter or comma to add • Backspace to remove last
      </p>
    </div>
  );
};
