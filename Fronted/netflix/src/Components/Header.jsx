import React, { useContext, useState } from 'react'
import './header.css';
import logo from '../Images/logo.png';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../LoginContext';
import { useDispatch, useSelector } from 'react-redux';
import { getlan } from '../Redux/Slices/LanguageSlice';

export default function Header() {
  const nav = useNavigate();
  const context = useContext(LoginContext);
  
  const lan = useSelector((state)=>state.Language.lan);
    const dispatch = useDispatch();

  const ToggleLan = (e)=>{
    dispatch(getlan(e));
  }

  return (
    <div className="back mb-[0.9rem]">
      <div className="div2 bg">
        <div className="div3">
          <div className="mx-auto md:px-[0.5rem]">
            <img className="logo lg:w-[10rem] w-[6rem] mt-0" src={logo} />
          </div>
          <div className="div4">
          <select className="div5" onChange={(e) => ToggleLan(e.target.value)}>
              {lan?(<><option className="text-black" selected value={"English"} name={"English"}>English</option>
                <option className="text-black" value={"Hindi"} name={"Hindi"}>हिंदी</option></>):(<>
                  <option className="text-black"  value={"English"} name={"English"}>English</option>
                  <option className="text-black" value={"Hindi"} selected name={"Hindi"}>हिंदी</option></>)}
            </select>
            <button onClick={() => nav('/signin')} className="btn">{lan?"Sign in":"साइन इन करें"}</button>
          </div>
        </div>
        <div className="unlimited_movies">
          <h1 className="unlimited_msg">
            {lan ? "Unlimited movies, TV shows and more" : "अनलिमिटेड मूवीज, टीवी शोज़ और बहुत कुछ"}
          </h1>
          <h3 className="watch">
            {lan ? "Watch anywhere. Cancel anytime." : "कहीं भी देखें। कभी भी कैंसल करें।"}
          </h3>
          <h3 className="ready">
            {lan ? "Ready to watch? Enter your email to create or restart your membership." : "देखने के लिए तैयार हैं? अपनी मेंबरशिप बनाने या रीस्टार्ट करने के लिए अपना ईमेल डालें।"}
          </h3>

          <div className="div6 relative">
            <input
              className="input align-bottom"
              type="email"
              placeholder={lan ? 'Enter Email to Register' : 'रजिस्टर करने के लिए ईमेल डालें'}
              value={context.email}
              onChange={(e) => context.setemail(e.target.value)}
            />

            <button onClick={() => nav('/signup')} className="get_started">
              {lan ? "Get Started >" : "आरंभ करें >"}
            </button>
          </div>
        </div>

      </div>
    </div>

  )
}
