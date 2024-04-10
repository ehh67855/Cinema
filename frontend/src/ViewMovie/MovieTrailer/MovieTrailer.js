import React, { useState } from 'react';
import '../MovieDetails/MovieDetails.css';

function MovieTrailer({ trailerVideoURL, trailerPictureURL, title }) {
  // Assuming trailerVideoURL is something like 'https://www.youtube.com/watch?v=VIDEO_ID'
  const videoId = trailerVideoURL.split('watch?v=')[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  const handlePlayVideo = (videoRef) => {
    const videoIframe = videoRef.current;
    videoIframe.style.display = 'block'; // Show the iframe
    videoIframe.setAttribute('src', embedUrl); // Start loading the video
    videoIframe.previousSibling.style.display = 'none'; // Hide the placeholder image
  }

  const videoRef = React.useRef(null);

  return (
    <div className="video-container" onClick={() => handlePlayVideo(videoRef)}>
      <img 
        src={trailerPictureURL} 
        alt={`Trailer for ${title}`}
        style={{cursor: 'pointer', display: 'block'}} // Ensure the placeholder is initially visible
      />
      <iframe 
        ref={videoRef}
        title={`Trailer for ${title}`}
        src="" // Initially, src is empty
        allowFullScreen
        style={{display: 'none'}} // Initially hide the iframe
      ></iframe>
      <div className="play-icon"></div> {/* Play icon container */}
    </div>
  );
}



export default MovieTrailer;
