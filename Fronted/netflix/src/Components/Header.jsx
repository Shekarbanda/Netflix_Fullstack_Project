import React, { useContext } from 'react'
import './header.css';
import logo from '../Images/logo.png';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../LoginContext';

export default function Header() {
    const nav = useNavigate();
    const context = useContext(LoginContext);
    
    return (
        <div className="back mb-[0.9rem]">
        <div className="div2 bg">
          <div className="div3">
            <div className="mx-auto md:px-[0.5rem]">
              <img className="logo lg:w-[10rem] w-[6rem] mt-0" src={logo}/>
            </div>
            <div className="div4">
              <select className="div5">
                <option className="text-black">English</option>
                <option className="text-black">Hindi</option>
                <option className="text-black">Telugu</option>
              </select>
              <button onClick={()=>nav('/signin')}  className="btn">Sign
                in</button>
            </div>
          </div>
          <div className="unlimited_movies">
            <h1 className="unlimited_msg">
                Unlimited movies, TV shows and more</h1>
            <h3 className="watch">
                Watch anywhere. Cancel anytime.</h3>
            <h3 className="ready">
                Ready to watch? Enter your email to create or restart your membership.</h3>


            <div className="div6 relative">
                <input className="input align-bottom" type="email" placeholder='Enter Email to Register' value={context.email} onChange={(e)=>context.setemail(e.target.value)}/>

                <button onClick={()=>nav('/signup')} className="get_started">Get
                    Started</button>
            </div>
        </div>
          </div>
          </div>
        
    )
}
