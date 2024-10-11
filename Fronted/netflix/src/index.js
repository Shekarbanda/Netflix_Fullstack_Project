import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin'
import {LoginProvider} from './LoginContext'
import Home from './Pages/Home';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import NotFound from './Pages/NotFound';
import Streaming from './Pages/Streaming';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
 <Provider store={store}>
  <LoginProvider>
<BrowserRouter>
  <Toaster></Toaster>
      <Routes>
        <Route path='/' element={<App></App>}/>
        <Route path='/signup' element= {<Signup></Signup>}/>
        <Route path='signin' element={<Signin></Signin>}/>
        <Route path='/home' element={<Home></Home>}/>
        <Route path='/video/streaming' element={<Streaming></Streaming>}/>
        <Route path='*' element={<NotFound></NotFound>}/>
        <Route path='/home/shows' element={<Home></Home>}/>
        <Route path='/home/history' element={<Home></Home>}/>
      </Routes>    
      </BrowserRouter>
      </LoginProvider>
      </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
