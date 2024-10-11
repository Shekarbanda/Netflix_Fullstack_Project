import axios from "axios";


const getSimilarMovies=async(title)=>{
    
    try{
        const res = await axios.get(`https://www.omdbapi.com/?s=${title}&apikey=${process.env.REACT_APP_SEARCH_API}`);
        return res.data.Search;
    }
    
    catch(e){
        console.log(e);
    }
}

export default getSimilarMovies;