import React, { useContext, useEffect, useState } from 'react';
import logo from '../Images/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import toast from 'react-hot-toast';
import { FaSearch } from "react-icons/fa";
import SearchMovies from '../Components/SearchMovies';
import { Link } from 'react-router-dom';
import './HomeNavbar.css';
import Banner from './Banner';
import { useDispatch } from 'react-redux';
import { isCheck } from '../Redux/Slices/CheckTVSlice';
import TVBanner from './TVBanner';
import { useSelector } from 'react-redux';
import { getvideoid } from '../Redux/Slices/ApiSlice';
import SearchHistory from './SearchHistory';

export default function HomeNavbar() {
    const [search, setsearch] = useState(false);
    const [isMobileMenuOpen, setIsMobileOpen] = useState(false);
    const [menu,setmenu] = useState(false);
    const isTV = useSelector((state)=>state.tv.check);
    const [history,sethistory] = useState(false);
    const nav =useNavigate();
    const url = useSelector((state)=>state.backend.url);
  
    useEffect(()=>{
        const movie =  JSON.parse(process.env.REACT_APP_POPULAR);
        if(!isTV){
            dispatch(getvideoid(movie?.results[Math.floor(Math.random()*19)+1]));
        }
        else{
            const tv =  JSON.parse(process.env.REACT_APP_TV_POPULAR);
            dispatch(getvideoid(tv?.results[Math.floor(Math.random()*19)+1]));
        }
     
    },[isTV])

    useEffect(()=>{
        if(!isTV && !history){
            nav('/home');
        }
    },[history,isTV])

    const dispatch = useDispatch();

    const toggleMobileMenu = () => {
        setIsMobileOpen(!isMobileMenuOpen);
        setmenu(!menu);
    }

    useEffect(() => {
        is_login();
    }, []);
    
    const navigate = useNavigate();
    const context = useContext(LoginContext);
    
    async function is_login() {
        try {
            const is_user = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (!is_user.data.success) {
                navigate('/signin');
            } else {
                dispatch(getHistory(is_user.data.history));
                context.setuser(is_user.data.user);
            }
        } catch (err) {
            navigate('/signin');
            toast.error(err.message);
        }
    }

    async function logouthandler() {
        try {
            const logout = await axios.get(`${url}/api/logout`);
            
            if (logout.data.success) {
                toast.success(logout.data.message);
                document.cookie.split(";").forEach((c) => {
                    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });
                navigate('/signin');
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <div>
            <header className='navbar sticky top-0 left-0 w-full text-white  mx-auto flex flex-wrap items-center justify-between p-4 h-15 z-50 bg-[rgba(0,0,0,0.7]'>
                <div className='flex items-center gap-10'>
                    <Link>
                        <img src={logo} alt='Netflix Logo' className='w-20 sm:w-40' />
                    </Link>

                    {/* Desktop Navbar Items */}
                    <div className='hidden lg:flex md:gap-5 gap-2 items-center'>
                        <Link to='/home' onClick={()=>{dispatch(isCheck(false));setsearch(false);sethistory(false)}} className='hover:underline'>Movies</Link>
                        <Link to='/home/shows' onClick={()=>{dispatch(isCheck(true));setsearch(false);sethistory(false)}} className='hover:underline'>TV Shows</Link>
                        <Link to={'/home/history'} className='hover:underline' onClick={()=>{setsearch(false);sethistory(true)}}>Search History</Link>
                    </div>
                </div>
                <div className='flex md:gap-7 gap-2 items-center'>
                    <button onClick={() => setsearch(!search)} className='search cursor-pointer'>{search ? "X" : <FaSearch />}</button>
                    <div className='hidden lg:flex flex gap-[5px] items-center'>
                        <img height={30} width={30} src='https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur-rouge.png' alt='User Icon' />
                        <p>{context.user?.name}</p>
                    </div>
                    <button className='hidden lg:block cursor-pointer search' onClick={logouthandler}>Logout</button>
                    <div className='lg:hidden flex items-center'>
                        <button className='size-6 cursor-pointer' onClick={toggleMobileMenu}>
                            {menu?"X":<img src='https://www.scheffer-international.com/assets/img/hamburger.png' alt='Menu' />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navbar Items */}
                {isMobileMenuOpen && (
                    <div className='text-white w-full lg:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
                        <div className='flex gap-[5px] items-center px-2 pt-2'>
                        <img height={20} width={20} src='https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur-rouge.png' alt='User Icon' />
                        <p>{context?.user?.name}</p>
                        </div>
                        <Link to='/home'  className='block hover:underline p-2' onClick={()=>{toggleMobileMenu();dispatch(isCheck(false));setsearch(false);sethistory(false)}}>Movies</Link>
                        <Link to='/home/shows' className='block hover:underline p-2' onClick={()=>{toggleMobileMenu();dispatch(isCheck(true));setsearch(false);sethistory(false)}}>TV Shows</Link>
                        <Link to='/home/history' className='block hover:underline p-2' onClick={()=>{toggleMobileMenu();setsearch(false);sethistory(true)}}>Search History</Link>
                        
                        <button className='cursor-pointer m-2 search' onClick={logouthandler}>Logout</button>
                    </div>
                )}
            </header>
            {search ? (
                <div className='flex mt-[10%] pb-[30%] justify-center'>
                    <SearchMovies />
                </div>
            ) : (
                isTV?(history?<SearchHistory date={Date.now}></SearchHistory>:<TVBanner></TVBanner>):(history?<SearchHistory></SearchHistory>:<Banner />)
            )}

            
        </div>
    );
}

