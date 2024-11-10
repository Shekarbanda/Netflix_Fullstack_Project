import { createSlice } from "@reduxjs/toolkit";


const lanslice = createSlice({
    name:'lanslice',
    initialState:{
        lan:true
    },
    reducers:{
        getlan:(state,action)=>{
            if(action.payload==="Hindi"){
                state.lan = false;
            }
            else{
                state.lan = true;
            }
        }
    }
})

 export const {getlan} = lanslice.actions;
 export default  lanslice.reducer;