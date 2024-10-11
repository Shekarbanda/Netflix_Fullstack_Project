import { createSlice } from "@reduxjs/toolkit";

const first =await JSON.parse(process.env.REACT_APP_POPULAR);

const VideoSlice = createSlice({
    name:'video',
    initialState:{
        id:first.results[Math.floor(Math.random()*19)+1]
    },
    reducers:{
        getvideoid:(state,action)=>{
            state.id = action.payload;
        }
    }

})

export const {getvideoid} = VideoSlice.actions;
export default VideoSlice.reducer;