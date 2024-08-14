import React from 'react';

const YouTubeVideo = () => {
  return (
    <div className="youtube-container">
      <h2>Watch Us in Action</h2>
      <iframe
        width="100%"
        height="500"
        src="https://www.youtube.com/embed/gxZGIoveinM?autoplay=1&loop=1&playlist=gxZGIoveinM&t=20&mute=1&playsinline=1&controls=0&showinfo=0&autohide=1&allowfullscreen=true&mode=transparent"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="YouTube Video"
      ></iframe>
    </div>
  );
};

export default YouTubeVideo;
