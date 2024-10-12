import React, { useRef, useState, useEffect } from 'react';
import './RenderMovies.css';
import { useDispatch } from 'react-redux';
import { getvideoid } from '../Redux/Slices/ApiSlice';
import { useNavigate } from 'react-router-dom';
import { playingid } from '../Redux/Slices/VideoSlice';

export default function RenderMovies(props) {
    const dispatch = useDispatch();
    const scrollContainer = useRef(null);
    const nav = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading delay (remove this in real-world use cases)
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const scroll = (direction) => {
        if (scrollContainer.current) {
            const { scrollLeft, clientWidth } = scrollContainer.current;
            const scrollAmount = direction === 'left' ? -clientWidth / 5 : clientWidth / 5;
            scrollContainer.current.scrollTo({
                left: scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleImageClick = (movie) => {
        dispatch(getvideoid(movie));
        dispatch(playingid(movie));
        nav('/video/streaming');
        window.scrollTo(0, 0);
    };

    return (
        <div className={`relative group`}>
            <button
                className='w-[25px] h-[25px] sm:w-[33px] sm:h-[33px] group-hover:block hidden absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-300 p-2 rounded-full shadow-lg hover:bg-gray-400 transition'
                onClick={() => scroll('left')}
            >
                <img alt='leftArrow' src='https://static.vecteezy.com/system/resources/previews/017/177/779/original/directional-arrow-on-transparent-background-free-png.png' />
            </button>

            <div ref={scrollContainer} className='scroll-container flex relative overflow-x-auto gap-[10px] p-[12px] scrolling'>
                {
                    isLoading ? (
                        [...Array(15)].map((_, index) => (
                            <div key={index} className='movie-skeleton sm:min-h-[280px] min-h-[200px] sm:min-w-[185px] min-w-[130px] rounded-lg' />
                        ))
                    ) : (
                        props.movies?.map((movie, key) => {
                            const posterSrc = movie.poster_path ?
                                `https://image.tmdb.org/t/p/original/${movie.poster_path}` :
                                (movie.Poster !== "N/A" ? movie.Poster : "");

                            if (!posterSrc) return null;

                            return (
                                <img
                                    key={key}
                                    onClick={() => handleImageClick(movie)}
                                    className='movie-poster text-[white] sm:h-[280px] h-[200px] sm:w-[380px] w-[300px] rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer'
                                    src={posterSrc}
                                    alt='movie poster'
                                />
                            );
                        })
                    )
                }
            </div>

            <button
                className='w-[25px] h-[25px] sm:w-[33px] sm:h-[33px] group-hover:block hidden absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-300 p-2 rounded-full shadow-lg hover:bg-gray-400 transition'
                onClick={() => scroll('right')}
            >
                <img alt='rightArrow' src='https://static.vecteezy.com/system/resources/previews/017/178/286/non_2x/directional-arrow-on-transparent-background-free-png.png' />
            </button>
        </div>
    );
}
