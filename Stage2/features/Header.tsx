"use client"

import { useNeighbourContext } from "@/Context/NeighbourlyContext";
import { useSession } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import Signout from "./SignOut";
import Signin from "./Signin";
import Signup from "./Signup";

export default function NeighbourlyHeader() {
  const {showlogin, setshowlogin, signin} = useNeighbourContext()
  const { data: session } = useSession();

  return (
    <>
      {/* Header */}
      <div className="bg-blue-100 border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-4xl font-serif font-bold tracking-tight">
              neighbourly.
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
              <a href="#about" className="hover:opacity-70 transition">About</a>
              <a href="#services" className="hover:opacity-70 transition">Services</a>
              <a href="#blog" className="hover:opacity-70 transition">Blog</a>
              <a href="#marketplace" className="hover:opacity-70 transition">Marketplace</a>
              <a href="#get-involved" className="hover:opacity-70 transition">Get Involved</a>
            </nav>

            {/* CTA Buttons */}
        <div className="flex items-center gap-4">
           {session?.user ? (
            <Signout />
          ) : (
            <>
              <button
                onClick={() => setshowlogin(true)}
                 className="px-5 py-2 border-2 border-black rounded-full text-sm font-semibold hover:bg-black hover:text-white transition"
              >
                Login
              </button>
            </>
          )}
       
        {/* {showlogin?
        <div>
          <Login></Login>
        </div> : <button onClick={()=> showlogin?setshowlogin(false): setshowlogin(true) } className="px-5 py-2 border-2 border-black rounded-full text-sm font-semibold hover:bg-black hover:text-white transition">
          Sign in
        </button>
        } */}

        {showlogin ? (
  <div className="fixed inset-0 z-50 bg-[#00000090] flex items-center justify-center">
    <div className="relative">
      {signin ? <Signin /> : <Signup />}
    </div>
  </div>
) : null}
       
          <button className="p-2 hover:opacity-70 transition">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
            </svg>
          </button>
        </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-white border-b-2 border-black" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 19px, #e5e7eb 19px, #e5e7eb 20px),
                          repeating-linear-gradient(90deg, transparent, transparent 19px, #e5e7eb 19px, #e5e7eb 20px)`
      }}>
        <div className="max-w-7xl mx-auto px-6 py-20 relative">
          {/* Decorative Elements - You'll add your images here */}
          <div className="absolute top-30 left-80 text-5xl">🍒</div>
          <div className="absolute top-30 right-84 text-5xl">💬</div>
          
          {/* Main Heading */}
          <div className="text-center max-w-4xl mx-auto relative">
            {/* Blue Tag */}
            <div className="inline-block bg-blue-200 border-2 border-black px-4 py-1 text-xs font-bold uppercase mb-2">
              Where Socials Get Simple And Marketers Get Connected
            </div>
            
            {/* Large Title */}
            <h1 className="text-6xl md:text-7xl font-serif leading-tight mb-8">
              <span className="inline-block">the community</span>
              <br />
              <span className="font-serif italic font-normal">for local</span>
              <br />
              <span className="inline-block">neighbours</span>
            </h1>

            {/* CTA Button */}
            <button className="px-8 py-3 border-2 border-black rounded-full text-base font-semibold hover:bg-black hover:text-white transition">
             Get Started
            </button>
          </div>
        </div>

        {/* Scrolling Text Banner */}
        <div className="bg-green-400 border-t-2 border-b-2 border-black py-3 overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee">
            <span className="text-sm font-bold uppercase mx-8">WE SIMPLE | MAKING LOCAL MADE SIMPLE | MAKING LOCAL MADE SIMPLE | MAKING LOCAL MADE SIMPLE | MAKING LOCAL MADE SIMPLE | </span>
            <span className="text-sm font-bold uppercase mx-8">WE SIMPLE | MAKING LOCAL MADE SIMPLE | MAKING LOCAL MADE SIMPLE | MAKING LOCAL MADE SIMPLE | MAKING LOCAL MADE SIMPLE | </span>
          </div>
        </div>

        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </div>
    </>
  );
}