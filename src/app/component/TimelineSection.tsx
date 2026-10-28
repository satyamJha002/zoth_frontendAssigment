"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function TimelineSection() {
  return (
    <section className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-20 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

        {/* =========================================================================
            LEFT COLUMN: HEADING & CARD (Using Shadcn Card)
           ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Lorem ipsum
            </h2>
            <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-md">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor
            </p>
          </div>

          {/* Glowing Ambient Card Box */}
          <Card className="rounded-none p-6 sm:p-7 bg-[#090503]/85 backdrop-blur-sm border border-orange-950/60 shadow-[0_0_35px_rgba(255,70,0,0.06)] space-y-5">
            <CardHeader className="p-0">
              <CardTitle className="text-white text-base font-semibold tracking-wide">
                Lorem ipsum dolor
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <div className="divide-y divide-zinc-900/70 pt-1">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                    <span className="text-sm text-zinc-300 font-normal">
                      Lorem ipsum
                    </span>
                    <a
                      href="#"
                      className="text-sm text-zinc-400 hover:text-white underline underline-offset-4 transition-colors"
                    >
                      Demo
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: STEPPER & INTERACTIVE METRIC LIST
           ========================================================================= */}
        <div className="lg:col-span-7 flex flex-col space-y-10">

          {/* Top Progress Timeline Stepper */}
          <div className="relative w-full pt-2">

            {/* Horizontal Connecting Track */}
            <div className="absolute top-[18px] left-[15px] right-[15px] h-[1px] bg-zinc-800 -z-0" />

            {/* Stepper Nodes */}
            <div className="relative z-10 grid grid-cols-4 gap-2">

              {/* Step 1: Active Orange Node */}
              <div className="flex flex-col items-start space-y-3">
                <div className="w-5 h-5 rounded-full border-2 border-[#ff4e00] bg-[#050302] flex items-center justify-center shadow-[0_0_10px_rgba(255,78,0,0.4)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff4e00]" />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <Badge variant="orange" className="p-0 rounded-none border-none bg-transparent text-xs text-[#ff5500] font-medium leading-none">
                    Demo
                  </Badge>
                  <span className="text-sm font-semibold text-white mt-0.5">Lorem ipsum</span>
                  <span className="text-xs text-zinc-500 font-mono mt-0.5">[XX]</span>
                </div>
              </div>

              {/* Step 2: Inactive Node */}
              <div className="flex flex-col items-start space-y-3">
                <div className="w-5 h-5 rounded-full border border-zinc-700 bg-[#050302] flex items-center justify-center" />
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-sm font-semibold text-white uppercase">DEMO</span>
                  <span className="text-xs text-zinc-500 mt-0.5">Lorem ipsum</span>
                </div>
              </div>

              {/* Step 3: Inactive Node */}
              <div className="flex flex-col items-start space-y-3">
                <div className="w-5 h-5 rounded-full border border-zinc-700 bg-[#050302] flex items-center justify-center" />
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-sm font-semibold text-white">Demo</span>
                  <span className="text-xs text-zinc-500 mt-0.5">Lorem ipsum</span>
                </div>
              </div>

              {/* Step 4: Inactive Node */}
              <div className="flex flex-col items-start space-y-3">
                <div className="w-5 h-5 rounded-full border border-zinc-700 bg-[#050302] flex items-center justify-center" />
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-sm font-semibold text-white uppercase">DEMO</span>
                  <span className="text-xs text-zinc-500 mt-0.5">Lorem ipsum</span>
                </div>
              </div>

            </div>
          </div>

          {/* List Rows with Horizontal Lines */}
          <div className="divide-y divide-zinc-900 border-t border-b border-zinc-900">

            {/* Row 1 */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                {/* ID / Badge Icon */}
                <svg className="w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <line x1="7" y1="8" x2="13" y2="8" />
                  <line x1="7" y1="12" x2="11" y2="12" />
                  <circle cx="16" cy="12" r="2" />
                </svg>
                <span className="text-sm font-medium text-zinc-200">Demo</span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-zinc-300 tracking-wider uppercase font-mono">
                DEMO
              </span>
            </div>

            {/* Row 2 */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                {/* Handshake / Node Icon */}
                <svg className="w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                <span className="text-sm font-medium text-zinc-200">Lorem ipsum</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span className="text-xs sm:text-sm font-bold text-zinc-300 tracking-wider uppercase font-mono">
                  DEMO
                </span>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                {/* Chain Link Icon */}
                <svg className="w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span className="text-sm font-medium text-zinc-200">Lorem ipsum</span>
              </div>
              <span className="text-xs sm:text-sm font-mono text-zinc-400 font-semibold">
                [XX]
              </span>
            </div>

            {/* Row 4 (Multi-line row) */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-start gap-3">
                {/* '@' Symbol Icon */}
                <svg className="w-4 h-4 text-zinc-400 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
                </svg>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-medium text-zinc-200">Demo</span>
                  <span className="text-xs text-zinc-500 mt-1">Demo</span>
                </div>
              </div>
              <div className="flex flex-col items-end leading-tight">
                <span className="text-xs sm:text-sm font-mono text-zinc-400 font-semibold">
                  [XX]
                </span>
                <span className="text-xs text-zinc-500 mt-1">
                  Lorem ipsum
                </span>
              </div>
            </div>

            {/* Row 5 */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                {/* Document / Safe Icon */}
                <svg className="w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span className="text-sm font-medium text-zinc-200">Lorem ipsum</span>
              </div>
              <a
                href="#"
                className="text-xs sm:text-sm text-zinc-300 hover:text-white underline underline-offset-4 transition-colors"
              >
                Demo
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
