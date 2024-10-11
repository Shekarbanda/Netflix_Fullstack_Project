import React, { useState, useEffect } from 'react';
import RenderMovies from './RenderMovies';
import Poster from './Poster';

export default function Banner() {


    const [popularMovies,setpopularMovies] = useState(null);
    const [nowplayingMovies,setnowplayingMovies] = useState(null);
    const [topratedMovies,settopratedMovies] = useState(null);
    const [upcomingMovies,setupcomingMovies] = useState(null);

    //getting id from redux
  

    useEffect(()=>{
     
        const fetching = async()=>{
            const popular = await JSON.parse(process.env.REACT_APP_POPULAR);
            const nowplaying = await JSON.parse(process.env.REACT_APP_NOWPLAYING);
            const toprated = await JSON.parse(process.env.REACT_APP_TOPRATED);
            const upcoming = await JSON.parse(process.env.REACT_APP_UPCOMING);

            setpopularMovies(popular.results);
            setnowplayingMovies(nowplaying.results);
            settopratedMovies(toprated.results);
            setupcomingMovies(upcoming.results);
        }

        fetching();
    },[])


    return (
       
        <div>
            <Poster></Poster>

            <div>
                <h3 className='text-[white] px-[10px] mt-3 '><b>Popular Movies</b></h3>
            {
                popularMovies&&<RenderMovies movies={popularMovies}></RenderMovies>
            }
            </div>
            <div>
                <h3 className='text-[white] px-[10px]'><b>NowPlaying Movies</b></h3>
                {
                nowplayingMovies&&<RenderMovies movies={nowplayingMovies}></RenderMovies>
            }
            </div>
            
            <div>
                <h3 className='text-[white] px-[10px]'><b>TopRated Movies</b></h3>
                {
                topratedMovies&&<RenderMovies movies={topratedMovies}></RenderMovies>
                }
            </div>
           
            <div>
                <h3 className='text-[white] px-[10px]'><b>Upcoming Movies</b></h3>
                {
                upcomingMovies&&<RenderMovies movies={upcomingMovies}></RenderMovies>
                }
            </div>
            
            
        </div>
    );
}
