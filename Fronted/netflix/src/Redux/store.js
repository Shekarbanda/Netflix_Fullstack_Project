import {configureStore} from '@reduxjs/toolkit'
import videoslice from './Slices/ApiSlice';
import playingslice from './Slices/VideoSlice';
import checkSlice from './Slices/CheckTVSlice';
import historyslice from './Slices/HistorySlice'
import backendslice from './Slices/BackendLink';
import lanslice from './Slices/LanguageSlice';

export const store = configureStore({
    reducer:{
        video:videoslice,
        playing:playingslice,
        tv:checkSlice,
        history:historyslice,
        backend:backendslice,
        Language:lanslice
    }
})
