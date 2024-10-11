import React from 'react';
import logo from '../Images/logo.png';
import { NavLink} from 'react-router-dom';
import '../Components/Poster.css'
import { Link } from 'react-router-dom';
import '../Components/HomeNavbar.css';


export default function NotFound() {
    

    return (
        <div>
            <header className='navbar sticky top-0 left-0 w-full text-white  mx-auto flex flex-wrap items-center justify-between p-4 h-15 z-50 bg-black bg-opacity-70'>
                <div className='flex items-center gap-10'>
                    <Link to='/'>
                        <img src={logo} alt='Netflix Logo' className='w-32 sm:w-40' />
                    </Link>
                </div>
                <div>
                <button className='cursor-pointer search' ><NavLink to={'/home'}>Home</NavLink></button>
                </div>
            </header>
            <div 
        className='w-[100%] sm:h-[100vh] h-[50vh]' 
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url(https://w3-lab.com/wp-content/uploads/2022/09/Page-not-found.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',


     
        }}
      />
        </div>
    );
}
