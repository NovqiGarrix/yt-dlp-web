'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, Loader2, Terminal } from 'lucide-react';
import { HTMLAttributes, SubmitEvent, useState } from 'react';

interface InputAreaProps extends HTMLAttributes<HTMLDivElement> {
  onUrlSubmit: (url: string) => void;
  disabled?: boolean;
  isSubmitting?: boolean;
}

function isValidUrl(url: string) {
  const pattern =
    /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|v\/|embed\/|shorts\/))([a-zA-Z0-9_-]{11})(?:[?&].*)?$/;
  return pattern.test(url);
}

export function InputArea({ className, disabled, isSubmitting, onUrlSubmit, ...props }: InputAreaProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string>();
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = isValidUrl(url);
    if (!isValid) {
      setError('Invalid URL');
      return;
    }

    setError(undefined);
    onUrlSubmit(url);
  };

  return (
    <div className={cn('w-full max-w-2xl mx-auto flex flex-col gap-2', className)} {...props}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          'relative flex items-center bg-background border rounded-sm',
          isFocused ? 'border-primary ring-1 ring-primary/20' : 'border-border hover:border-input'
        )}
      >
        <div className="pl-4 pr-2 text-primary">
          <Terminal className="size-5" />
        </div>

        <input
          type="text"
          value={url}
          onChange={e => {
            const value = e.target.value;
            setUrl(value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Paste YouTube URL..."
          disabled={disabled}
          className="flex-1 bg-transparent border-none outline-none h-14 text-lg font-medium text-foreground placeholder:text-muted-foreground font-sans"
        />

        <div className="flex items-center pr-2 gap-2">
          <Button
            type="submit"
            disabled={!url.trim() || disabled}
            variant="input-addon"
            size="icon"
            className="transition-all"
          >
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
          </Button>
        </div>
      </form>

      <div className="flex justify-between px-1 text-[11px] font-mono text-muted-foreground min-h-[17px]">
        {error ? (
          <span className="text-destructive font-bold">{`> Error: ${error}`}</span>
        ) : (
          <span>ready for input</span>
        )}
        <span>↵ to submit</span>
      </div>
    </div>
  );
}
