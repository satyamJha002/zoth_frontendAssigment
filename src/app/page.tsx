"use client";

import React, { useState } from "react";
import Navbar from "./component/Navbar";
import HeroSection from "./component/HeroSection";
import MarqueeBar from "./component/MarqueeBar";
import TimelineSection from "./component/TimelineSection";
import Footer from "./component/Footer";

export default function Home() {
  const [heroScreen, setHeroScreen] = useState<number>(1);

  return (
    <main className="min-h-screen bg-[#050302] text-white relative overflow-hidden flex flex-col font-sans">
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(255,70,0,0.12),transparent_70%)]" />

        <svg
          className="absolute inset-0 w-full h-full opacity-25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gridGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff4500" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#ff4500" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ff4500" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <line x1="0" y1="0" x2="50%" y2="60%" stroke="url(#gridGrad)" strokeWidth="1" />
          <line x1="15%" y1="0" x2="50%" y2="60%" stroke="url(#gridGrad)" strokeWidth="1" />
          <line x1="30%" y1="0" x2="50%" y2="60%" stroke="url(#gridGrad)" strokeWidth="1" />
          <line x1="45%" y1="0" x2="50%" y2="60%" stroke="url(#gridGrad)" strokeWidth="1" />
          <line x1="55%" y1="0" x2="50%" y2="60%" stroke="url(#gridGrad)" strokeWidth="1" />
          <line x1="70%" y1="0" x2="50%" y2="60%" stroke="url(#gridGrad)" strokeWidth="1" />
          <line x1="85%" y1="0" x2="50%" y2="60%" stroke="url(#gridGrad)" strokeWidth="1" />
          <line x1="100%" y1="0" x2="50%" y2="60%" stroke="url(#gridGrad)" strokeWidth="1" />

          <line x1="0" y1="100%" x2="50%" y2="60%" stroke="url(#gridGrad)" strokeWidth="1" />
          <line x1="20%" y1="100%" x2="50%" y2="60%" stroke="url(#gridGrad)" strokeWidth="1" />
          <line x1="40%" y1="100%" x2="50%" y2="60%" stroke="url(#gridGrad)" strokeWidth="1" />
          <line x1="60%" y1="100%" x2="50%" y2="60%" stroke="url(#gridGrad)" strokeWidth="1" />
          <line x1="80%" y1="100%" x2="50%" y2="60%" stroke="url(#gridGrad)" strokeWidth="1" />
          <line x1="100%" y1="100%" x2="50%" y2="60%" stroke="url(#gridGrad)" strokeWidth="1" />

          <rect x="5%" y="40px" width="90%" height="80%" fill="none" stroke="url(#gridGrad)" strokeWidth="1" opacity="0.4" />
          <rect x="15%" y="90px" width="70%" height="65%" fill="none" stroke="url(#gridGrad)" strokeWidth="1" opacity="0.5" />
          <rect x="25%" y="140px" width="50%" height="50%" fill="none" stroke="url(#gridGrad)" strokeWidth="1" opacity="0.6" />
          <rect x="35%" y="190px" width="30%" height="35%" fill="none" stroke="url(#gridGrad)" strokeWidth="1" opacity="0.7" />
          <rect x="42%" y="230px" width="16%" height="20%" fill="none" stroke="url(#gridGrad)" strokeWidth="1" opacity="0.8" />
        </svg>
      </div>

      <Navbar onSelectDropdownOption={() => setHeroScreen(6)} />

      <HeroSection currentScreen={heroScreen} onScreenChange={setHeroScreen} />

      <MarqueeBar />

      <TimelineSection />

      <Footer />
    </main>
  );
}
