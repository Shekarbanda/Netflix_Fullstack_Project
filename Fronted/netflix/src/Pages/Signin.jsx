import React, { useContext, useEffect, useRef, useState } from 'react'
import logo from '../Images/logo.png';
import './signin.css'
import { LoginContext } from '../LoginContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { getHistory } from '../Redux/Slices/HistorySlice';
import { getlan } from '../Redux/Slices/LanguageSlice';

export default function Signin() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const context = useContext(LoginContext);
  const [showpassword, setshowpassword] = useState(false);
  const [toggletext, settoggletext] = useState(false);
  const url = useSelector((state) => state.backend.url);
  const dispatch = useDispatch();

  const passwordInputRef = useRef(null); // Ref for password input
  const showHideButtonRef = useRef(null);

  const lan = useSelector((state) => state.Language.lan);

  useEffect(()=>{
    if(context.email=="guest123@gmail.com"){

      context.setemail("");
      loginhandler(false);
      
    }
  })

  const ToggleLan = (e) => {
    dispatch(getlan(e));
  }

  const guesthandler=()=>{
    loginhandler(false);
  }

  async function loginhandler(e) {
    context.setloading(true);
    if(e!==false){
      e?.preventDefault();
    }
    let user;
    if(!e){
      
      const mail = "guest123@gmail";
      const pass = "guest@123";
      setemail("guest123@gmail");
      setpassword("guest@123");
      user = { email:mail, password:pass };
    }
    else{
    user = { email, password };
    }
    try {
      const login = await axios.post(`${url}/api/login`, user, {
        withCredentials: true
      });

      if (login.data.success) {
        const user = login.data.user;
        dispatch(getHistory(login?.data?.user?.movieHistory));
        toast.success(`${login.data.message} ${user.name}`);
        navigate('/home');
      }
      else {
        toast.error(login.data.message);
      }
    }
    catch (err) {
      toast.error(err.message);
    }
    finally {
      context.setloading(false);
      setemail("");
      setpassword("");
    }
  }

 

  const handleBlur = (e) => {
    if (
      e.relatedTarget !== showHideButtonRef.current && // Make sure blur isn't caused by clicking on show/hide
      e.relatedTarget !== passwordInputRef.current
    ) {
      settoggletext(false); // Hide show/hide text on blur if it's not the related target
    }
  };


  return (

    <div className="back1 h-[100vh]">

      <div className="bg1 bg">
        <div className="content">
          <div className="mx-auto md:px-[0.5rem]">
            <img className="symbol lg:w-[10rem] w-[6rem] mt-0" src={logo} />
          </div>
          <div className="divvv4">
          <select className="div5" onChange={(e) => ToggleLan(e.target.value)}>
              {lan?(<><option className="text-black" selected value={"English"} name={"English"}>English</option>
                <option className="text-black" value={"Hindi"} name={"Hindi"}>हिंदी</option></>):(<>
                  <option className="text-black"  value={"English"} name={"English"}>English</option>
                  <option className="text-black" value={"Hindi"} selected name={"Hindi"}>हिंदी</option></>)}
            </select>

          </div>

        </div>
        <div className='h-[90vh] max-w-[100%] flex justify-center items-center'>
          <div className=' border-[1px] border-[black] m-[0.5rem] flex-col-1 justify-center p-[1rem] rounded-md bg-[rgba(0,0,0,0.9)] opacity-80'>
            <h1 className='text-center text-[2rem] text-[white] font-bold'>
              {lan ? "Sign In" : "साइन इन"}
            </h1>
            <div className='flex-col p-[1rem]'>
              <form onSubmit={loginhandler} className='max-w-[23rem] flex-col-1 relative'>
                <input
                  className='w-[100%] bg-[rgba(85,98,123,0.3)] mx-[auto] my-[0.8rem] text-white border-[black] border-[1px] rounded-md p-[10px] sm:text-[1.2rem]'
                  type='email'
                  placeholder={lan ? "Enter email" : "ईमेल दर्ज करें"}
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
                <input
                  ref={passwordInputRef}
                  onFocus={() => settoggletext(true)}
                  onBlur={handleBlur}
                  className='w-[100%] bg-[rgba(85,98,123,0.3)] mx-[auto] my-[0.8rem] text-white border-[black] border-[1px] rounded-md p-[10px] sm:text-[1.2rem]'
                  type={showpassword ? "text" : "password"}
                  placeholder={lan ? "Enter Password" : "पासवर्ड दर्ज करें"}
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
                {
                  toggletext &&
                  <span
                    ref={showHideButtonRef}
                    tabIndex={-1}
                    onClick={() => setshowpassword(!showpassword)}
                    className={`absolute text-[white] sm:top-[48%] top-[47%] right-[5%] ${!toggletext && 'hidden'}`}
                  >
                    {showpassword ? <IoEyeOff /> : <IoEye />}
                  </span>
                }

                <br />
                <button
                  className='w-[100%] font-bold bg-[red] mx-[auto] my-[0.8rem] text-white border-[black] border-[1px] rounded-md p-[8px] bg-[rgba(210,3,3,7] hover:opacity-80'
                  type='submit'
                >
                  {context.loading ? (lan ? "Loading... it may take upto 1min" : "लोड हो रहा है... इसमें 2 मिनट तक का समय लग सकता है") : (lan ? "Sign In" : "साइन इन")}
                </button>
              </form>
              <p className='text-white'>
                {lan ? "New to Netflix?" : "नेटफ्लिक्स पर नए?"}
                <span
                  onClick={() => navigate('/signup')}
                  className='text-[#5bb1c8] cursor-[pointer] hover:opacity-80 ml-1'
                >
                  {lan ? "Sign up now" : "अभी साइन अप करें"}
                </span>
              </p>
              <p className='text-white mt-[6px]'>{lan ? "Not ready to sign in?" : "साइन इन के लिए तैयार नहीं हैं?"} <span onClick={guesthandler} className='text-[#5bb1c8] cursor-[pointer] hover:opacity-80 ml-1'>{lan ? "Continue as Guest" : "गेस्ट के रूप में जारी रखें"}</span></p>

            </div>

          </div>
        </div>
      </div>
    </div>


  )
}
