import React, { useRef, useState, useEffect } from 'react';
import { getAssetUrl } from '../utils/assets';

export default function InlineReelVideo({ src, poster, className = "", loopDuration }) {
  const videoRef = useRef(null);
  const [loadFailed, setLoadFailed] = useState(false);

  const resolvedSrc = getAssetUrl(src);
  const resolvedPoster = getAssetUrl(poster) || getAssetUrl('cambot.jpeg');

  useEffect(() => {
    setLoadFailed(false);
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay may be deferred until user interaction or canplay
      });
    }
  }, [resolvedSrc]);

  const handleTimeUpdate = (e) => {
    if (loopDuration && e.currentTarget.currentTime >= loopDuration) {
      e.currentTarget.currentTime = 0;
      if (e.currentTarget.paused) {
        e.currentTarget.play().catch(() => {});
      }
    }
  };

  const handleCanPlay = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  };

  if (loadFailed) {
    return (
      <img
        src={resolvedPoster}
        alt="Reel preview"
        className={className}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={resolvedSrc}
      poster={resolvedPoster}
      autoPlay
      loop
      muted
      defaultMuted
      playsInline
      webkit-playsinline="true"
      disablePictureInPicture
      controlsList="nodownload nofullscreen noremoteplayback"
      preload="auto"
      onTimeUpdate={handleTimeUpdate}
      onCanPlay={handleCanPlay}
      onError={() => {
        console.warn('Video failed to load, falling back to poster:', resolvedSrc);
        setLoadFailed(true);
      }}
      className={className}
    />
  );
}
