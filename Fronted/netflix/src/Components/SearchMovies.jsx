import React, { useContext, useState } from 'react'
import axios from 'axios';
import RenderMovies from './RenderMovies';
import './SearchMovies.css'
import { LoginContext } from '../LoginContext';
import { useDispatch } from 'react-redux';
import { getHistory } from '../Redux/Slices/HistorySlice';

export default function SearchMovies() {
    const context = useContext(LoginContext);
    const dispatch = useDispatch();

    const [moviename,setmoviename] = useState("");
    const [mdata,setmdata] = useState(null);
    const [loading,setloading] = useState(false);

    const btnhandler=async()=>{
        setloading(true);
        const m = moviename.split(" ").join("+");
        const res = await axios.get(`https://www.omdbapi.com/?s=${m}&apikey=${process.env.REACT_APP_SEARCH_API}`);
        res.data.Search===undefined?setmdata("null"):setmdata(res.data.Search);
        setloading(false);

              try{
                const movie = JSON.stringify(res.data.Search[0]);
                const email = context.user.email;
                const data = {email:email,details:movie};
                const msg = await axios.post("http://localhost:8000/api/history",data);
                dispatch(getHistory(msg.data.history));
                
              }
              catch(e){
                console.log(e);
              }
    }
    const keyhandler=(e)=>{
      if(e.code==="Enter"){
        btnhandler();
      }
    
    }


  return (
    
    <div className='flex flex-col justify-center gap-3'>
      <div className='flex justify-center gap-3'>
      <input type='text' onKeyDown={keyhandler} className='text-[1rem] p-[5px] rounded-md md:w-[30rem] w-[10rem] h-[3rem]' placeholder='Enter Movie Name' value={moviename} onChange={(e)=>setmoviename(e.target.value)}/>
      <button  onClick={btnhandler} className='text-[white] text-[1.2rem] font-bold bg-[red] w-[5rem] h-[3rem] rounded-md'>search</button>
      </div> 
      {
        loading? <div className=" arc-spinner py-[20%]">
        <div className="arc"></div>
    </div>:
        <div className=' overflow-x-auto gap-[10px] p-[10px] hide'>
          { mdata&&mdata!=="null"?<RenderMovies movies={mdata}></RenderMovies> :<p className='text-[white] text-[2rem]'>{mdata!=="null"?"":"Movie Not Found"}</p> }   
      </div>
      }
    </div>
  )
}
