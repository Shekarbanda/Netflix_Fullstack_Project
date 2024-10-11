import { createSlice } from "@reduxjs/toolkit";


export const PlayingSlice = createSlice({
    name:'playing',
    initialState:{
            details:JSON.parse(localStorage.getItem('videoDetails')) || {}
    },
    reducers:{
        playingid:(state,action)=>{
            state.details = action.payload;
            localStorage.setItem('videoDetails', JSON.stringify(state.details));
        }
    }

})

export const {playingid} = PlayingSlice.actions;
export default PlayingSlice.reducer;