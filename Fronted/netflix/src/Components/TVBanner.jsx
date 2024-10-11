import React, { useState, useEffect } from 'react';
import RenderMovies from './RenderMovies';
import Poster from './Poster';

export default function TVBanner() {
    

    const [popularShows,setpopularShows] = useState(null);
    const [nowplayingShows,setnowplayingShows] = useState(null);
    const [topratedShows,settopratedShows] = useState(null);
    const [upcomingShows,setupcomingShows] = useState(null);

    //getting id from redux
   

    useEffect(()=>{
     
        const fetching = async()=>{
            const popular = await JSON.parse(process.env.REACT_APP_TV_POPULAR);
            const nowplaying = await JSON.parse(process.env.REACT_APP_TV_NOWPLAYING);
            const toprated = await JSON.parse(process.env.REACT_APP_TV_TOPRATED);
            const upcoming = await JSON.parse(process.env.REACT_APP_TV_UPCOMING);

            setpopularShows(popular.results);
            setnowplayingShows(nowplaying.results);
            settopratedShows(toprated.results);
            setupcomingShows(upcoming.results);

          
        }

        fetching();
    },[])

   


    return (
       
        <div>
            <Poster></Poster>

            <div>
                <h3 className='text-[white] px-[10px] mt-3 '><b>Popular Shows</b></h3>
            {
                popularShows&&<RenderMovies movies={popularShows}></RenderMovies>
            }
            </div>
            <div>
                <h3 className='text-[white] px-[10px]'><b>NowPlaying Shows</b></h3>
                {
                nowplayingShows&&<RenderMovies movies={nowplayingShows}></RenderMovies>
            }
            </div>
            
            <div>
                <h3 className='text-[white] px-[10px]'><b>TopRated Shows</b></h3>
                {
                topratedShows&&<RenderMovies movies={topratedShows}></RenderMovies>
                }
            </div>
           
            <div>
                <h3 className='text-[white] px-[10px]'><b>Upcoming Shows</b></h3>
                {
                upcomingShows&&<RenderMovies movies={upcomingShows}></RenderMovies>
                }
            </div>
            
            
        </div>
    );
}
