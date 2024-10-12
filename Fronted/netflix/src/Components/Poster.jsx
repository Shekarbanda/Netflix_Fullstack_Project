import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import './Poster.css';
import VideoTitle from './VideoTitle';

export default function Poster() {
  const d = useSelector((state) => state.video.id);
  const [isLoaded, setIsLoaded] = useState(false);

  setTimeout(() => {
    setIsLoaded(true);
  }, 3000);

    const imageUrl = `https://image.tmdb.org/t/p/original/${d.backdrop_path}`;

    const handleImageLoad = () => {
        setIsLoaded(true);
    };

  return (
    <>
      <img 
                src={imageUrl} 
                alt="Preload" 
                onLoad={handleImageLoad} 
                style={{ display: 'none' }} 
            />
          {
            !isLoaded&&(
              <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer-z-10'></div>
            )
          }
      <div 
        className='poster-image sm:h-[100vh] h-[60vh]' 
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%', 
        }}
      />
      <div className='video-title-overlay'>
      <VideoTitle></VideoTitle>
      </div>
      
    </>
  );
}
