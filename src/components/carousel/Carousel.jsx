import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, CardMedia, Grid, Typography } from '@mui/material';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';

export const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalTime = 5000;
  const [videoEnded, setVideoEnded] = useState(true);
//   const [previewScreen, setPreviewScreen] = useState(false);
  const videoRef = useRef(null);

  const items = [
    { id: 1, src: '/rotonda.mp4', type: 'video', alt: 'Rotonda', title: 'Rotonda' },
    { id: 2, src: '/trabajo.mp4', type: 'video', alt: 'Trabajo', title: 'Trabajo' },
    { id: 3, src: '/FOTO1.jpg', type: 'image', alt: 'Planta Pilar 2', title: 'Foto Planta Pilar' },
    { id: 4, src: '/Planta-Zarate.mp4', type: 'video', alt: 'Planta Zarate 2', title: 'Video Planta Zarate' },
    { id: 5, src: '/Planta-Zarate.mp4', type: 'video', alt: 'Planta Zarate 2', title: 'Video Planta Zarate' },
    { id: 6, src: '/Planta-Pilar.mp4', type: 'video', alt: 'Planta Pilar', title: 'Video Planta Pilar' },
  ];

//   const handleEscapeKey = (event) => {
//     if (event.keyCode === 27) {
//       setPreviewScreen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('keydown', handleEscapeKey);
//     return () => {
//       document.removeEventListener('keydown', handleEscapeKey);
//     };
//   }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleVideoPlay = () => {
      setVideoEnded(false);
    };

    const handleVideoEnded = () => {
      setVideoEnded(true);
    };

    const handleTimeUpdate = () => {
      if (videoElement.currentTime >= videoElement.duration - 0.1) {
        setVideoEnded(true);
      }
    };

    if (videoElement) {
      videoElement.addEventListener('play', handleVideoPlay);
      videoElement.addEventListener('ended', handleVideoEnded);
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('play', handleVideoPlay);
        videoElement.removeEventListener('ended', handleVideoEnded);
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [videoRef]);

  useEffect(() => {
    const changeSlide = () => {
      if (videoEnded) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
      }
    };

    const interval = setInterval(changeSlide, intervalTime);

    return () => {
      clearInterval(interval);
    };
  }, [items.length, intervalTime, videoEnded]);

  return (
    <>
      <div className="bodyContent">
        <Grid container justifyContent="" alignItems="center" style={{ height: '95vh', backgroundColor: 'rgb(245, 245, 245, 0.8)' }}>
          <Grid item xs={12} textAlign="center" style={{ border: '1px solid blue', height: '90vh' }}>
            <div className="root">
              <div className="content">
                <div>
                  <div>
                    <Card>
                      <div className={videoEnded ? 'inactive' : 'active'}>
                        {items[activeIndex].type === 'image' ? (
                          <CardMedia
                            component="img"
                            alt={items[activeIndex].alt}
                            src={process.env.PUBLIC_URL + items[activeIndex].src}
                            title={items[activeIndex].title}
                            controls={false}
                            style={{ height: '95vh' }}
                            autoPlay
                            loop
                          />
                        ) : (
                          <div className="videoWrapper">
                            <video ref={videoRef} src={process.env.PUBLIC_URL + items[activeIndex].src} alt={items[activeIndex].alt} autoPlay muted style={{ height: '89vh' }} />
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
