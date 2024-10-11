import { createSlice } from "@reduxjs/toolkit";


const BackendLink = createSlice({
    name:'backend',
    initialState:{
        url:"https://netflix-clone-qx62.onrender.com"
    },
    reducers:{
        getLink:(state)=>{
            state.url = "https://netflix-clone-qx62.onrender.com"
        }
    }
})

export const {getLink} = BackendLink.actions;
export default BackendLink.reducer;