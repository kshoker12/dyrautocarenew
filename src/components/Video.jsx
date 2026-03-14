'use client';

/**
 * Reusable video component with optional priority (preload) and poster.
 * Use priority={true} for above-the-fold hero videos.
 */
export default function Video({ src, poster, className = '', priority = false, ...props }) {
  return (
    <video
      src={src}
      poster={poster}
      className={className}
      preload={priority ? 'auto' : 'metadata'}
      playsInline
      {...props}
    />
  );
}
