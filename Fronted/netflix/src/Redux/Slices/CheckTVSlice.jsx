import { createSlice } from "@reduxjs/toolkit";


export const CheckTVSlice = createSlice({
    name:'tv',
    initialState:{
        check:false
    },
    reducers:{
        isCheck:(state,action)=>{
            state.check = action.payload
        }
    }
})

export const {isCheck} = CheckTVSlice.actions;
export default CheckTVSlice.reducer;