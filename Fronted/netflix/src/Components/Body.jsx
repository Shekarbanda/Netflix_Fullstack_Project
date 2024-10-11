import React, { useRef, useState } from 'react';
import './body.css';
import tv_video from '../Images/video-tv-in-0819.m4v';
import stranger from '../Images/stranger.jpg';
import small_stranger from "../Images/stranger_small.png";
import tv from "../Images/tv.png";
import download_logo from "../Images/download_logo.gif";
import device_pile from "../Images/device-pile-in.png";
import video_devices from "../Images/video-devices-in.mp4";
import children from "../Images/children.png";
import { useNavigate } from 'react-router-dom';


export default function Body() {
  const nav = useNavigate();
  const contentRef = useRef([]);
    const [activeIndex, setActiveIndex] =useState(null);
  
    const faqData = [
      {
        question: "What is Netflix?",
        answer: "Netflix is a streaming service that offers a wide variety of TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices."
      },
      {
        question: "How much does Netflix cost?",
        answer: "Netflix offers different pricing plans based on the region. Plans typically start from $9.99 per month, depending on the selected package."
      },
      {
        question: "Where can I watch?",
        answer: "You can watch Netflix on a wide range of devices, such as smartphones, tablets, Smart TVs, computers, or streaming devices like Roku and Chromecast."
      },
      {
        question: "Can I download movies and TV shows?",
        answer: "Yes, Netflix allows you to download selected movies and TV shows on your mobile app for offline viewing."
      },
      {
        question: "How do I cancel?",
        answer: "You can cancel your Netflix membership at any time. There are no cancellation fees, and you can easily do it from your account settings on the Netflix website."
      },
    ];
  
    const handleClick = (index) => {
      setActiveIndex(activeIndex === index ? null : index); // Toggle open/close
    };

  return (
    <>
      <main >
    {/* <!--Enjoy on your TV section start--> */}
    <div className="div7">
      <div className="smart_tv">
        <h1 className="smarttv_msg">Enjoy on your TV
        </h1>
        <h3 className="lg:text-[1.5rem] text-[1.2rem] leading-7">Watch on smart TVs, PlayStation, Xbox,
          Chromecast, Apple TV, Blu-ray players and more.</h3>
      </div>

      <div className="mx-auto relative order-1">
        <img className="relative z-[2]" src={tv}/>
        <video src={tv_video} className="absolute z-[1] w-[80%] top-[20.8%] left-[13.5%]" muted loop autoPlay={true}
         disablePictureInPicture></video>
      </div>

    </div>
{/* 
    <!--Enjoy on your TV section end here-->

    <!--Download your shows to watch offline section start here--> */}
    <div className="div8">
      <div className="mx-auto lg:ml-[20%] relative lg:order-1 order-2">
        <img src={stranger}/>
        <div
          className="div9">
          <div className="">
            <img className="absolute lg:w-[22%] w-[15%] px-[10px] py-[6px]" src={small_stranger}/>
          </div>
          <div className="Stranger">
            <h5>Stranger Things</h5>
            <p className="text-[#0071eb]">Downloading...</p>
          </div>
          <img className="img1"
            src={download_logo}/>
        </div>
      </div>
      <div
        className="anu">
        <h1 className="div11_msg">
          Download your shows to watch offline</h1>
        <h3 className="lg:text-[1.5rem] text-[1.2rem] leading-7">Save your favourites easily and always have
          something to watch.</h3>
      </div>

    </div>
{/* 
    <!--Download your shows to watch offline section end here-->


    <!--Watch everywhere section start here--> */}
    <div
      className="div12">
      <div className="div12_1">
        <h1 className="div12_msg">Watch everywhere
        </h1>
        <h3 className="lg:text-[1.5rem] text-[1.2rem] leading-7">Stream unlimited movies and TV shows on your phone,
          tablet, laptop, and TV.</h3>
      </div>

      <div className="mx-auto relative order-1">
        <img className="relative z-[2] w-[89%] lg:pr-[7rem] mx-auto" src={device_pile}/>
        <video loop autoPlay={true} className="video1">
            <source src={video_devices}/>
        </video>
      </div>

    </div>
    {/* <!--Watch everywhere section end here-->


    <!--Create profiles for kids section start here--> */}
    <div
      className="div13">
      <div className="mx-auto lg:ml-[20%]  lg:order-1 order-2">
        <img src={children}/>
      </div>
      <div
        className="div13_2">
        <h1 className="div13_msg">
          Create profiles for kids</h1>
        <h3 className="lg:text-[1.5rem] text-[1.2rem] leading-7">Send children on adventures with their favourite
          characters in a space made just for them—free with your membership.</h3>
      </div>
    </div>

    {/* <!--Create profiles for kids section end here--> */}

  </main>
          <footer>
          <div className="bg-black text-white p-4 w flex flex-col items-center w-[100%]">
      <h1 className="text-3xl font-bold mb-4 text-center">Frequently Asked Questions</h1>
      <div className="space-y-2 sm:w-[80%] w-[90%]">
        {faqData.map((faq, index) => (
          <div key={index}>
           
            <div
              className="cursor-pointer sm:p-6 p-5 bg-gray-700 flex justify-between items-center"
              onClick={() => handleClick(index)}
            >
              <span>{faq.question}</span>
              <span>{activeIndex === index ? "-" : "+"}</span>
            </div>

          
            <div
              ref={(el) => (contentRef.current[index] = el)}
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === index
                  ? "max-h-screen opacity-100"
                  : "max-h-0 opacity-0"
              }`}
              style={{ maxHeight: activeIndex === index ? contentRef.current[index]?.scrollHeight : 0 }}
            >
              <div className="p-4 bg-gray-800">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

            <div className="get_msg flex items-center flex-col">
                <h3 className="ready2">
                    Ready to watch? Enter your email to create or restart your membership.</h3>


                <div
                    className="div6 relative">
                    <input
                        className="input"
                        type="email"
                        placeholder='Enter Email to Register' />
                    <button onClick={()=>nav('/signup')}
                        className="get_started">Get
                        Started </button>
                </div>
                <div className="h-[0.6rem] bg-[rgb(45,45,45)] mt-[5rem]"></div>
            </div>
            </footer>
  
  </>
  )
}
