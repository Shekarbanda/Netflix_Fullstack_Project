import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { LoginContext } from '../LoginContext';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getHistory } from '../Redux/Slices/HistorySlice';
import toast from 'react-hot-toast';

export default function SearchHistory(props) {
    const context = useContext(LoginContext);
    const dispatch = useDispatch();
    const historyMovies = useSelector((state)=>state.history.historyList);
    const url = useSelector((state)=>state.backend.url);
    const [deleteloading,setdeleteloading] = useState(false);

    const [movies, setMovies] = useState(context.user.movieHistory || []); // Set initial state from context

    // Use effect to watch for changes in movieHistory
    useEffect(() => {
        setMovies(historyMovies || []);

    }, [historyMovies]); // Watch the movieHistory directly

    const scrollContainer = useRef(null);

    const scroll = (direction) => {
        if (scrollContainer.current) {
            const { scrollLeft, clientWidth } = scrollContainer.current;
            const scrollAmount = direction === 'left' ? -clientWidth / 5 : clientWidth / 5;
            scrollContainer.current.scrollTo({
                left: scrollLeft + scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const btnDelete=async(key)=>{
        try{
            setdeleteloading(true);
            const email  = context.user.email;
            const data = {email:email,index:key};
            const msg =await axios.post(`${url}/api/history/delete`,data);
            dispatch(getHistory(msg.data.history));
        }
        catch(e){
             toast.error("Not Found");
        }
        finally{
            setdeleteloading(false);
            toast.success("Successfully Deleted")
        }
        
    }

    return (
        <div className="relative group">
            <h3 className="text-[white] sm:text-[2rem] text-[1rem] px-[10px] mt-8 mb-2 mx-2 underlined">
                <b>History</b>
            </h3>

            <button
                className="group-hover:block hidden absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-300 p-2 rounded-full shadow-lg hover:bg-gray-400 transition"
                onClick={() => scroll('left')}
            >
                <img width={20} height={20} src='https://static.vecteezy.com/system/resources/previews/017/177/779/original/directional-arrow-on-transparent-background-free-png.png' />
            </button>

            <div
                ref={scrollContainer}
                className="flex overflow-x-auto gap-[10px] p-[12px] hide scrolling"
            >
                {
                    movies?.length > 0 ? (
                        movies?.map((d, key) => {
                            let movie;
                            try {
                                movie = JSON.parse(d); // Ensure parsing is safe
                            } catch (error) {
                                console.error("Invalid movie object", error);
                                return null;
                            }
                            const posterSrc = movie?.Poster ? (movie.Poster !== "N/A" ? movie.Poster : "") : "";

                            if (!posterSrc) return null;

                            return (
                                <div key={key} className="flex gap-3 items-center justify-between flex-col items-center overflow border-[1px] rounded-lg p-2 px-3 bg-gray-800 mx-2 mb-10 sm:max-w-[15rem] max-w-[15rem]">
                                    <div className='flex justify-center gap-2'>
                                    <img
                                        className='text-[white] sm:h-[100px] h-[100px] sm:min-w-[100px] min-w-[100px] rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer' 
                                        src={posterSrc}
                                        alt='movie poster'
                                    />
                                    <div className='sm:text-[1rem] text-[0.8rem]'>
                                        <p className="text-white sm:text-[1rem] text-[0.8rem]"><b>Title : </b>{movie?.Title}</p>
                                        <p className='text-[white]'><b>Date : </b>{context.user.updatedAt.split('T')[0]}</p>
                                        
                                    </div>
                                    </div>
                                    <button className='search' onClick={()=>{btnDelete(key);}}>{deleteloading?"deleting...":"delete"}</button>
                                </div>
                            );
                        })
                    ) : (
                        <h3 className="text-[white] sm:text-[1.5rem] text-[1rem] px-[10px] sm:mt-8 mt-2 mb-2">
                            <b>No Movies/Shows Searched</b>
                        </h3>
                    )
                }
            </div>

            <button
                className="group-hover:block hidden absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-300 p-2 rounded-full shadow-lg hover:bg-gray-400 transition"
                onClick={() => scroll('right')}
            >
                <img width={20} height={20} src='https://static.vecteezy.com/system/resources/previews/017/178/286/non_2x/directional-arrow-on-transparent-background-free-png.png' />
            </button>
        </div>
    );
}
