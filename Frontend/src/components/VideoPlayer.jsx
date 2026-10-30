import React from "react";

const getEmbedUrl = (url) => {
  if (!url) return null;

  // 1. Already an embed URL (Vimeo, Cloudinary Player, YouTube Embed)
  if (
    url.includes("/embed/") ||
    url.includes("player.vimeo.com") ||
    url.includes("player.cloudinary.com")
  ) {
    return url;
  }

  // 2. Standard YouTube link (youtube.com/watch?v=... or youtu.be/...)
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    let videoId = null;
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else {
      try {
        const urlObj = new URL(url);
        videoId = urlObj.searchParams.get("v");
      } catch (e) {
        // Ignore URL parsing errors
      }
    }
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  }

  // 3. Standard Vimeo link (vimeo.com/...)
  if (url.includes("vimeo.com/") && !isNaN(url.split("vimeo.com/")[1]?.split("?")[0])) {
    const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }

  return null; // Not a known embed URL
};

const VideoPlayer = ({ src, title = "Video", className = "" }) => {
  if (!src) return null;

  const embedUrl = getEmbedUrl(src);

  // If it's a YouTube/Vimeo link, render an iframe
  if (embedUrl) {
    return (
      <iframe
        src={embedUrl}
        title={title}
        className={className}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  // Otherwise, it's a direct file (like a Cloudinary MP4 upload)
  return (
    <video
      src={src}
      controls
      className={`${className} bg-black`}
      preload="metadata"
      playsInline
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;