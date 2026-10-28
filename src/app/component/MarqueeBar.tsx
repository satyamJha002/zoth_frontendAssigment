"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

export interface PartnerLogo {
  name: string;
  renderLogo: () => React.ReactNode;
}

export default function MarqueeBar() {
  const partners: PartnerLogo[] = [
    {
      name: "Borderless",
      renderLogo: () => (
        <div className="flex items-center gap-2.5">
          {/* Borderless 3D geometric isometric cube */}
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.2L18.8 8 12 11.8 5.2 8 12 4.2zM4.8 9.6l6.2 3.5v7.1L4.8 16.7V9.6zm8.4 10.6v-7.1l6.2-3.5v7.1l-6.2 3.5z" opacity="0.9" />
          </svg>
          <span className="text-sm font-semibold tracking-normal font-sans">
            Borderless
          </span>
        </div>
      ),
    },
    {
      name: "TAISU",
      renderLogo: () => (
        <div className="flex items-center">
          {/* TAISU futuristic geometric typography */}
          <span className="text-base font-extrabold tracking-widest font-mono uppercase">
            TAISU
          </span>
        </div>
      ),
    },
    {
      name: "Blockchain Founders Fund",
      renderLogo: () => (
        <div className="flex items-center gap-2">
          {/* Stepped isometric layered block */}
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 2L4 6.5V17.5L12 22L20 17.5V6.5L12 2Z" />
            <path d="M4 10L12 14.5L20 10" />
            <path d="M4 14L12 18.5L20 14" />
          </svg>
          <div className="flex flex-col text-left leading-none">
            <span className="text-[11px] font-bold tracking-wider uppercase">
              BLOCKCHAIN
            </span>
            <span className="text-[8px] font-medium tracking-widest text-[#a8896c] uppercase">
              FOUNDERS FUND
            </span>
          </div>
        </div>
      ),
    },
    {
      name: "Chainlink",
      renderLogo: () => (
        <div className="flex items-center gap-2">
          {/* Chainlink Hexagon Ring */}
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a2 2 0 0 0-1 .27l-6 3.46A2 2 0 0 0 4 7.46v9.08a2 2 0 0 0 1 1.73l6 3.46a2 2 0 0 0 2 0l6-3.46a2 2 0 0 0 1-1.73V7.46a2 2 0 0 0-1-1.73l-6-3.46A2 2 0 0 0 12 2zm0 3.86 4 2.31v7.66l-4 2.31-4-2.31V8.17l4-2.31z" />
          </svg>
          <span className="text-sm font-semibold tracking-tight font-sans">
            Chainlink
          </span>
        </div>
      ),
    },
    {
      name: "Coinbase",
      renderLogo: () => (
        <div className="flex items-center gap-1.5">
          <span className="text-base font-bold tracking-tight lowercase font-sans">
            coinbase
          </span>
        </div>
      ),
    },
    {
      name: "Mindfulness Capital",
      renderLogo: () => (
        <div className="flex flex-col text-left leading-none">
          <span className="text-xs font-bold tracking-widest uppercase">
            MINDFULNESS
          </span>
          <span className="text-[8px] font-medium tracking-widest text-[#a8896c] uppercase text-center">
            CAPITAL
          </span>
        </div>
      ),
    },
    {
      name: "Sphere Partner",
      renderLogo: () => (
        <div className="flex items-center justify-center w-5 h-5 rounded-full border border-current">
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 1a7 7 0 010 14V3z" />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full z-20 my-6 select-none bg-[#070302]/90 backdrop-blur-sm border-y border-orange-950/50 overflow-hidden">

      {/* Self-contained CSS Animation to guarantee butter-smooth infinite motion */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes smoothMarquee {
              0% {
                transform: translate3d(0, 0, 0);
              }
              100% {
                transform: translate3d(-50%, 0, 0);
              }
            }
            .smooth-marquee-track {
              display: flex !important;
              width: max-content !important;
              animation: smoothMarquee 22s linear infinite !important;
              will-change: transform;
            }
            .smooth-marquee-track:hover {
              animation-play-state: paused !important;
            }
          `,
        }}
      />

      <div className="max-w-[1440px] mx-auto relative px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center">

        {/* Subtle Vignette Gradient Masks on left and right edges */}
        <div className="absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-[#070302] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-[#070302] to-transparent z-10 pointer-events-none" />

        {/* Continuous Infinite Marquee Track */}
        <div className="w-full overflow-hidden">
          <div className="smooth-marquee-track items-center gap-14 sm:gap-20 whitespace-nowrap text-[#c9a785]">

            {/* First Set of Logos */}
            {partners.map((partner, i) => (
              <div
                key={`group1-${i}`}
                className="flex items-center shrink-0 opacity-80 hover:opacity-100 hover:text-white transition-opacity cursor-pointer"
              >
                {partner.renderLogo()}
              </div>
            ))}

            {/* Second Set of Logos (Duplicate ensures seamless -50% continuous loop) */}
            {partners.map((partner, i) => (
              <div
                key={`group2-${i}`}
                className="flex items-center shrink-0 opacity-80 hover:opacity-100 hover:text-white transition-opacity cursor-pointer"
              >
                {partner.renderLogo()}
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}
