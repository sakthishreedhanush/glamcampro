import React, { useRef, useEffect } from 'react';
import { getAssetUrl } from '../utils/assets';

export default function InlineReelVideo({ src, poster, className = "", loopDuration }) {
  const videoRef = useRef(null);

  const resolvedSrc = getAssetUrl(src);
  const resolvedPoster = getAssetUrl(poster);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const playVideo = () => {
      video.muted = true;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Autoplay handled by browser policy
        });
      }
    };

    playVideo();

    video.addEventListener('loadeddata', playVideo);
    video.addEventListener('canplay', playVideo);

    return () => {
      video.removeEventListener('loadeddata', playVideo);
      video.removeEventListener('canplay', playVideo);
    };
  }, [resolvedSrc]);

  const handleTimeUpdate = (e) => {
    if (loopDuration && e.currentTarget.currentTime >= loopDuration) {
      e.currentTarget.currentTime = 0;
      if (e.currentTarget.paused) {
        e.currentTarget.play().catch(() => {});
      }
    }
  };

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
      x5-playsinline="true"
      disablePictureInPicture
      controlsList="nodownload nofullscreen noremoteplayback"
      preload="auto"
      onTimeUpdate={handleTimeUpdate}
      className={className}
    >
      <source src={resolvedSrc} type="video/mp4" />
    </video>
  );
}
