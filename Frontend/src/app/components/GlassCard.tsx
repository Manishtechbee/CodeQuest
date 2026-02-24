import { ReactNode, HTMLAttributes } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({
  children,
  className = '',
  hover = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      {...props}
      className={`
        rounded-xl bg-white/60 dark:bg-gray-900/60 
        backdrop-blur-xl border border-white/20 dark:border-gray-800/50
        shadow-lg shadow-black/5 dark:shadow-black/20
        ${hover ? 'transition-all hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1 cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}