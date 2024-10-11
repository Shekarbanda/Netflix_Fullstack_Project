import React from 'react'
import './footer.css';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const nav = useNavigate();
    return (
        <footer className=" lg:pb-[0rem] pb-[3rem] bg-[black] pt-3 ">
            <div className="about">
                <h3 className="">Questions? Call <span className="ul2">000-800-919-1694</span></h3>
                <div className="provides">
                    <p className="ul2">FAQ</p>
                    <p className="ul2">Help Centre</p>
                    <p className="ul2">Account</p>
                    <p className="ul2">Media Centre</p>
                    <p className="ul2">Investor Relations</p>
                    <p className="ul2">Jobs</p>
                    <p className="ul2">Ways to Watch</p>
                    <p className="ul2">Terms of Use</p>
                    <p className="ul2">Privacy</p>
                    <p className="ul2">Cookie Preferences</p>
                    <p className="ul2">Privacy</p>
                    <p className="ul2">Cookie Preferences</p>
                    <p className="ul2">Jobs</p>
                    <p className="ul2">Ways to Watch</p>
                    <p className="ul2">Terms of Use</p>
                </div>
                <select
                    className="div5 mt-[2.5rem]">
                    <option className="text-black">English</option>
                    <option className="text-black">Hindi</option>
                    <option className="text-black">Telugu</option>
                </select>
                <p className="mt-[1rem]">Netflix India</p>
            </div>


        </footer>
    )
}
