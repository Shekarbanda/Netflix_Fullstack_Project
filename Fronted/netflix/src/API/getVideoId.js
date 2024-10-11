import axios from "axios"


export default async function getVideoId(title){
    

    try{
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${title}+trailer&type=video&key=${process.env.REACT_APP_API_KEY}`)
        return (res.data.items[1].id.videoId);
        
    }
   catch(err){
    console.error("Video Not Found")
   }
}