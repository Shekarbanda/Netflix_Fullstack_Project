import React from 'react'
import './footer.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getlan } from '../Redux/Slices/LanguageSlice';

export default function Footer() {
    const nav = useNavigate();

    const lan = useSelector((state) => state.Language.lan);
    const dispatch = useDispatch();

    const ToggleLan = (e) => {
        dispatch(getlan(e));
    }

    return (
        <footer className=" lg:pb-[0rem] pb-[3rem] bg-[black] pt-3 ">
            <div className="about">
                <h3 className="">
                    {lan ? "Questions? Call" : "सवाल? कॉल करें"} <span className="ul2">000-800-919-1694</span>
                </h3>
                <div className="provides">
                    <p className="ul2">{lan ? "FAQ" : "सामान्य प्रश्न"}</p>
                    <p className="ul2">{lan ? "Help Centre" : "सहायता केंद्र"}</p>
                    <p className="ul2">{lan ? "Account" : "खाता"}</p>
                    <p className="ul2">{lan ? "Media Centre" : "मीडिया केंद्र"}</p>
                    <p className="ul2">{lan ? "Investor Relations" : "निवेशक संबंध"}</p>
                    <p className="ul2">{lan ? "Jobs" : "नौकरियां"}</p>
                    <p className="ul2">{lan ? "Ways to Watch" : "देखने के तरीके"}</p>
                    <p className="ul2">{lan ? "Terms of Use" : "उपयोग की शर्तें"}</p>
                    <p className="ul2">{lan ? "Privacy" : "गोपनीयता"}</p>
                    <p className="ul2">{lan ? "Cookie Preferences" : "कुकी पसंद"}</p>
                </div>
                <select className="div5" onChange={(e) => ToggleLan(e.target.value)}>
              {lan?(<><option className="text-black" selected value={"English"} name={"English"}>English</option>
                <option className="text-black" value={"Hindi"} name={"Hindi"}>हिंदी</option></>):(<>
                  <option className="text-black"  value={"English"} name={"English"}>English</option>
                  <option className="text-black" value={"Hindi"} selected name={"Hindi"}>हिंदी</option></>)}
            </select>
                <p className="mt-[1rem]">{lan ? "Netflix India" : "Netflix इंडिया"}</p>
            </div>
        </footer>

    )
}
