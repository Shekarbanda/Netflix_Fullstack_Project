import { createSlice } from "@reduxjs/toolkit";


const HistorySlice = createSlice({
    name:'history',
    initialState:{
        historyList:null
    },
    reducers:{
        getHistory:(state,action)=>{
            state.historyList = action.payload
        }
    }
})

export const {getHistory} = HistorySlice.actions;
export default HistorySlice.reducer;