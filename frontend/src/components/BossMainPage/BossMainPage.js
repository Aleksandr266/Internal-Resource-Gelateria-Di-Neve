import React from 'react';
import './style.css'
import video from './4.mp4'

function BossMainPage() {
  return (
    <div className='boss-main-page'>


<video loop muted autoplay poster="/uploads/video-bg-alt.jpg" class="fullscreen-bg__video" >
        <source src={video} type="video/mp4" />
        {/* <source src="/uploads/video.webm" type="video/webm" /> */}
    </video>

    </div>

  );
}

export default BossMainPage;
