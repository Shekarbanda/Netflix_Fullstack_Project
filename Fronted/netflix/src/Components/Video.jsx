import React, { useEffect, useState } from 'react';
import getVideoId from '../API/getVideoId';
import { useSelector } from 'react-redux';
import './Video.css';
import { useNavigate } from 'react-router-dom';

export default function Video() {
    const nav = useNavigate();
    const video = useSelector((state) => state.playing.details);
    const [videoid, setvideoid] = useState('');
    const t = video?.title ? video.title : (video?.Title?video.Title:video.name); // Handle the undefined case

    useEffect(() => {
        async function fetching() {
            const id = await getVideoId(t);
            setvideoid(id);
        }

        if (t) {
            fetching();
        }
    }, [video, t]);

    return (
        <div
            className='poster-Image xl:h-[100vh] h-auto lg:items-center'
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: 'black', 
              
                width: '100%', 
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            {videoid ? (
                <div className="video-wrapper">
                    <button onClick={() => {nav('/home');window.scrollTo(0, 0);}} className='w-[28px] sm:w-[37px] fixed top-[2rem] left-[1rem] z-10 text-[white] text-[3rem]'>
                        <img src='https://cdn-icons-png.flaticon.com/512/6188/6188669.png' alt="back" />
                    </button>
                    <iframe
                        className='video-iframe sm:h-[100%] h-[40vh]'
                        src={`https://www.youtube.com/embed/${videoid}?autoplay=1&mute=1&showinfo=0&controls=1&rel=0`}
                        title="YouTube video player"
                        allowFullScreen
                        style={{
                            width: '100%',
                           
                            border: 'none',
                        }}
                    />
                </div>
            ) : (
                <div
                    className='loading-placeholder sm:h-[50vh] h-[30vh]'
                    style={{
                        width: '20%',
                  
                        color: 'white',
                        textAlign: 'center',
                        border: '1px solid black',
                    }}
                >
                    Loading video...
                </div>
            )}
        </div>
    );
}
