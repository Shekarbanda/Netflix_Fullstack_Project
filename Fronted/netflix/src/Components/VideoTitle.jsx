import React from 'react';
import { CiPlay1 } from "react-icons/ci";
import { FaInfoCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { playingid } from '../Redux/Slices/VideoSlice';
import { useNavigate } from 'react-router-dom';

export default function VideoTitle() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const details = useSelector((state) => state.video.id);

    const btnHandler = ()=>{
        dispatch(playingid(details));
        nav('/video/streaming');
        window.scrollTo(0, 0);
    }

    const infohandler=()=>{
        dispatch(playingid(details));
        nav('/video/streaming#movie-info');
        window.scrollTo({ top: 600, behavior: 'smooth' });
    }
   
    return (
        <div className="flex flex-col sm:max-w-[50%] max-w-[80%] justify-center mx-auto text-white p-4">
            <h1 className="mt-4 pb-1 sm:w-[100%] text-[20px] font-extrabold sm:text-5xl md:text-6xl">
                {details?.title? details?.title : details?.name}
            </h1>
            <p className="mt-4 text-[10px] sm:text-lg md:text-xl">
                {details ? details?.overview : "Details not found"}
            </p>
            <div className="flex flex-col md:flex-row mt-8 space-y-2 md:space-y-0 md:space-x-4">
                <button onClick={btnHandler} className="flex items-center h-10 px-2 bg-white border border-white text-black rounded-md hover:bg-gray-300">
                    <CiPlay1 />
                    <span className="ml-1">Play</span>
                </button>
                <button onClick={infohandler} className="flex items-center h-10 px-2 border border-white bg-[rgba(0,0,0,0.6)] text-white rounded-md hover:bg-black">
                    <FaInfoCircle />
                    <span className="ml-1">More info</span>
                </button>
            </div>
        </div>
    );
}
