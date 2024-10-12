import React, { useState } from 'react'
import Video from '../Components/Video'
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext,useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LoginContext } from '../LoginContext';
import { useSelector,useDispatch } from 'react-redux';
import Footer from '../Components/Footer';
import getSimilarMovies from '../API/getSimilarMovies';
import RenderMovies from '../Components/RenderMovies';
import { getHistory } from '../Redux/Slices/HistorySlice';


export default function Streaming() {
    const [similarmovies,setsimilarmovies] = useState(null);
    const [details,setdetails] = useState(null);
    const url = useSelector((state)=>state.backend.url);
    const video = useSelector((state)=>state.playing.details);
    const dispatch = useDispatch();
    useEffect(() => {
        is_login();
       
    }, [similarmovies]);

    useEffect(()=>{
        setdetails(video);
    },[video])
    
    const navigate = useNavigate();
    const context = useContext(LoginContext);
    
    async function is_login() {
        try {
            const is_user = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (!is_user.data.success) {
                navigate('/signin');
            } else {
                dispatch(getHistory(is_user.data.history));
                context.setuser(is_user.data.user);
            }
        } catch (err) {
            navigate('/signin');
            toast.error(err.message);
        }
    }

    const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL and scroll to that element
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);


    const moviename = video?.title?video.title:(video?.Title?video.Title:video.name);
    const m = moviename.split(" ")[0];
    console.log(m);

        useEffect(() => {
            async function fetching() {
                const list = await getSimilarMovies(m);
                setsimilarmovies(list);
                console.log(similarmovies)
            }
    
        
                fetching();
                
            
        }, [video]);
        
    


    return (
        <>
       <div className='flex flex-col gap-3'>
            <Video></Video>
                <div className="mt-[2rem] flex flex-col xl:max-w-[50%] max-w-[80%] text-white p-6 " id='movie-info'>
                <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl md:text-6xl">
                    Movie Name : {details?.title?details.title :(details?.Title?details?.Title:details?.name)}
                </h1>
                <div className='flex gap-5 sm:gap-10 flex-col sm:flex-row mt-[3rem]'>
                <img 
                    className='rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105' 
                    src={details?.poster_path?`https://image.tmdb.org/t/p/original/${details.poster_path}`:details?.Poster} 
                    height={100} 
                    width={200} 
                    />
                    <p className="sm:mt-4 text-base sm:text-lg md:text-xl">
                    <b>OverView</b> : {details?.overview?details.overview: "Details not found"}
                    </p>
                </div>
                </div>
                <div className='text-[white] text-base sm:text-lg md:text-xl px-6 pb-5'>
                {
                        details?.original_language?
                        <>
                            <p><b>Language : </b>{details?.original_language}</p>
                            <p><b>Release Date : </b>{details?.release_date?details?.release_date:details?.first_air_date}</p>
                            <p><b>Rating : </b>{details?.vote_average}</p>
                        </>:
                        <>
                            <p><b>Release Date : </b>{details?.Year}</p>
                        </>
                    }
                </div>
        </div>
        
        <div className='mt-3 p-3' > 
        <h3 className='text-[white] px-[10px] mt-3 sm:text-[1.5rem] text-[0.8rem]'><b>Similar Movies/Shows</b></h3>
        {
            similarmovies? <RenderMovies movies={similarmovies}></RenderMovies>:<h3 className='text-[white] px-[10px] h-[10rem] sm:h-[15rem] text-center mt-3 border-[1px] border-[white] sm:text-[2.5rem] text-[1rem]'><b>Not Found</b></h3>
        }
           
        </div>
        <div className='mt-3'>
        <Footer></Footer>
        </div>
        
        </>
    )
}
