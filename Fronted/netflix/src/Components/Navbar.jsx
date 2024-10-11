import React from 'react'
import './nav.css'
import logo from '../Images/logo.png'

export default function Navbar() {

    
  return (
    <>
    <div className="back md:w-[100%] lg:w-[100%] w-[500px]">
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
            <button className="btn">Sign
              in</button>
          </div>
        </div>
        </div>
        </div>
       
        </>
  )
}
