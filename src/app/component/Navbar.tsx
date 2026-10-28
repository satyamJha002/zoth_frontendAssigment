"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export interface NavbarProps {
  logoText?: string;
  navItems?: string[];
  outlineButtonText?: string;
  solidButtonText?: string;
  className?: string;
  onSelectDropdownOption?: () => void;
}

export default function Navbar({
  logoText = "Demo",
  navItems = ["Demo", "Demo", "Demo", "Demo"],
  outlineButtonText = "Lorem ipsum",
  solidButtonText = "[XX]",
  className = "",
  onSelectDropdownOption,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [actionDropdownOpen, setActionDropdownOpen] = useState(false);
  const actionDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (actionDropdownRef.current && !actionDropdownRef.current.contains(event.target as Node)) {
        setActionDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`relative w-full z-40 select-none bg-[#050302]/90 backdrop-blur-md border-b border-orange-950/20 ${className}`}>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative flex items-center justify-between h-20">

          {/* =========================================================================
              LEFT: BRAND LOGO & TITLE
             ========================================================================= */}
          <div className="flex items-center gap-3.5 z-20 shrink-0">
            {/* White Circular Sci-Fi Emblem */}
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-transparent border-2 border-white shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
              >
                {/* 3-prong radial icon */}
                <path
                  d="M12 11.5V4.2M12 4.2C10.5 4.2 9.7 5.5 10 6.8M12 4.2C13.5 4.2 14.3 5.5 14 6.8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M10.8 12.8L4.5 16.4M4.5 16.4C3.8 15.2 4.8 13.9 5.9 13.4M4.5 16.4C5.2 17.6 6.8 17.6 7.6 16.8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M13.2 12.8L19.5 16.4M19.5 16.4C20.2 15.2 19.2 13.9 18.1 13.4M19.5 16.4C18.8 17.6 17.2 17.6 16.4 16.8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="12" r="1.3" fill="currentColor" />
              </svg>
            </div>

            <span className="text-white text-xl font-bold tracking-tight font-sans">
              {logoText}
            </span>
          </div>

          {/* =========================================================================
              CENTER: NAV BOX WITH AMBER HUD CORNER BRACKETS
             ========================================================================= */}
          <nav
            className="hidden lg:flex items-center relative z-20 px-8 py-2.5 bg-[#120803]/85 border border-orange-950/40"
            aria-label="Main Navigation"
          >
            {/* Top-Left Corner Bracket */}
            <span
              className="absolute -top-[2px] -left-[2px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#ff5500] pointer-events-none"
              aria-hidden="true"
            />
            {/* Top-Right Corner Bracket */}
            <span
              className="absolute -top-[2px] -right-[2px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#ff5500] pointer-events-none"
              aria-hidden="true"
            />
            {/* Bottom-Left Corner Bracket */}
            <span
              className="absolute -bottom-[2px] -left-[2px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#ff5500] pointer-events-none"
              aria-hidden="true"
            />
            {/* Bottom-Right Corner Bracket */}
            <span
              className="absolute -bottom-[2px] -right-[2px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#ff5500] pointer-events-none"
              aria-hidden="true"
            />

            {/* Nav Items */}
            <ul className="flex items-center gap-9 list-none m-0 p-0">
              {navItems.map((item, index) => (
                <li key={index} className="relative">
                  <a
                    href={`#${item.toLowerCase()}-${index + 1}`}
                    className="text-zinc-300 hover:text-white text-sm font-medium tracking-wide transition-colors duration-150 py-0.5 inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* =========================================================================
              RIGHT: ACTION BUTTONS (Outlined and Solid with Shadcn Button)
             ========================================================================= */}
          <div className="hidden sm:flex items-center gap-4 z-20 shrink-0">
            {/* Button 1: Outlined Amber Box with Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-expanded={dropdownOpen}
                className="relative inline-flex items-center justify-center gap-2 px-6 py-2.5 h-auto rounded-none text-sm font-medium text-zinc-200 bg-[#120803]/75 hover:bg-[#1c0d06] hover:text-white border border-[#ff4e00] hover:border-[#ff6a1a] transition-all duration-150 shadow-[0_0_10px_rgba(255,78,0,0.15)] hover:shadow-[0_0_15px_rgba(255,78,0,0.3)] active:scale-[0.98] cursor-pointer"
              >
                <span>{outlineButtonText}</span>
                <svg
                  className={`w-3.5 h-3.5 text-zinc-300 shrink-0 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Button>

              {/* Dropdown Menu matching screenshot */}
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-[220px] bg-[#0c0502] border border-[#ff4e00] shadow-[0_0_25px_rgba(255,78,0,0.25)] z-50 text-left overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  {/* Category Header */}
                  <div className="px-4 pt-3.5 pb-2">
                    <span className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase font-sans">
                      LOREM IPSUM
                    </span>
                  </div>

                  {/* Dropdown Options List */}
                  <div className="divide-y divide-zinc-900/80">
                    {/* Option 1: Demo / Lorem ipsum */}
                    <a
                      href="#demo-opt-1"
                      onClick={(e) => {
                        e.preventDefault();
                        setDropdownOpen(false);
                        onSelectDropdownOption?.();
                      }}
                      className="block px-4 py-2.5 hover:bg-[#1a0a04] transition-colors group cursor-pointer"
                    >
                      <div className="text-sm font-semibold text-white leading-tight group-hover:text-white">
                        Demo
                      </div>
                      <div className="text-xs text-[#ff5500] font-medium leading-tight mt-0.5">
                        Lorem ipsum
                      </div>
                    </a>

                    {/* Option 2: Lorem ipsum */}
                    <a
                      href="#demo-opt-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setDropdownOpen(false);
                        onSelectDropdownOption?.();
                      }}
                      className="block px-4 py-2.5 text-sm font-medium text-zinc-200 hover:text-white hover:bg-[#1a0a04] transition-colors cursor-pointer"
                    >
                      Lorem ipsum
                    </a>

                    {/* Option 3: Lorem ipsum */}
                    <a
                      href="#demo-opt-3"
                      onClick={(e) => {
                        e.preventDefault();
                        setDropdownOpen(false);
                        onSelectDropdownOption?.();
                      }}
                      className="block px-4 py-2.5 text-sm font-medium text-zinc-200 hover:text-white hover:bg-[#1a0a04] transition-colors cursor-pointer"
                    >
                      Lorem ipsum
                    </a>

                    {/* Option 4: Lorem ipsum in orange */}
                    <a
                      href="#demo-opt-4"
                      onClick={(e) => {
                        e.preventDefault();
                        setDropdownOpen(false);
                        onSelectDropdownOption?.();
                      }}
                      className="block px-4 py-2.5 text-sm font-medium text-[#ff5500] hover:text-[#ff7722] hover:bg-[#1a0a04] transition-colors cursor-pointer"
                    >
                      Lorem ipsum
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Button 2: Solid Glowing Orange Box with Dropdown */}
            <div
              ref={actionDropdownRef}
              className="relative"
              onMouseEnter={() => setActionDropdownOpen(true)}
              onMouseLeave={() => setActionDropdownOpen(false)}
            >
              <Button
                type="button"
                onClick={() => setActionDropdownOpen((prev) => !prev)}
                aria-expanded={actionDropdownOpen}
                className="relative inline-flex items-center justify-center gap-1.5 px-6 py-2.5 h-auto rounded-none text-sm font-semibold text-white bg-[#ff3b00] hover:bg-[#ff4e17] transition-all duration-150 shadow-[0_0_15px_rgba(255,59,0,0.45)] hover:shadow-[0_0_25px_rgba(255,59,0,0.7)] active:scale-[0.98] cursor-pointer border-none"
              >
                <span>{solidButtonText}</span>
                <svg
                  className={`w-3.5 h-3.5 text-white shrink-0 transition-transform duration-200 ${
                    actionDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Button>

              {/* [XX] Dropdown Menu matching screenshot */}
              {actionDropdownOpen && (
                <div className="absolute top-full right-0 mt-1.5 w-[210px] bg-[#0c0502] border border-[#ff4e00] shadow-[0_0_25px_rgba(255,78,0,0.25)] z-50 text-left overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  {/* Status & Copy row */}
                  <div className="px-4 pt-3.5 pb-3 border-b border-zinc-900/80">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ff3b00] shadow-[0_0_8px_rgba(255,59,0,0.9)] shrink-0" />
                      <Badge
                        variant="orange"
                        className="rounded-none border-none bg-transparent p-0 text-[11px] font-bold tracking-widest text-zinc-300 uppercase font-sans shadow-none"
                      >
                        DEMO
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      <span className="text-sm font-mono font-medium text-white tracking-wide">
                        [XX]
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText("[XX]");
                        }}
                        className="h-7 w-7 rounded-none text-zinc-400 hover:text-white hover:bg-transparent transition-colors p-1 -mr-1 cursor-pointer"
                        title="Copy to clipboard"
                        aria-label="Copy to clipboard"
                      >
                        {/* Two overlapping rectangles copy icon */}
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      </Button>
                    </div>
                  </div>

                  {/* External link row */}
                  <a
                    href="#external-link"
                    onClick={() => setActionDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 border-b border-zinc-900/80 text-sm font-medium text-zinc-200 hover:text-white hover:bg-[#1a0a04] transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-zinc-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    <span>Lorem ipsum</span>
                  </a>

                  {/* Disconnect / Exit row in orange */}
                  <a
                    href="#logout"
                    onClick={() => setActionDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-[#ff5500] hover:text-[#ff7722] hover:bg-[#1a0a04] transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-[#ff5500] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span>Lorem ipsum</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* =========================================================================
              MOBILE MENU TOGGLE WITH SHADCN BUTTON
             ========================================================================= */}
          <div className="flex sm:hidden z-20">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 h-auto w-auto rounded-none border border-[#ff5500]/60 text-zinc-200 bg-[#160a04] hover:bg-[#241006] hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </Button>
          </div>

        </div>
      </div>

      {/* =========================================================================
          MOBILE DROPDOWN PANEL
         ========================================================================= */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-orange-900/40 bg-[#0d0603]/95 backdrop-blur-xl px-5 pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-2 py-2">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={`#${item.toLowerCase()}-${idx + 1}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-200 hover:text-white px-3 py-2 text-base font-medium rounded hover:bg-orange-950/30 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="pt-2 flex flex-col gap-3">
            <div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="w-full py-2.5 h-auto rounded-none inline-flex items-center justify-center gap-1.5 text-sm font-medium text-zinc-100 bg-[#140b06] border border-[#ff4e00] hover:bg-[#201008] hover:text-white transition-colors"
              >
                <span>{outlineButtonText}</span>
                <svg
                  className={`w-3.5 h-3.5 text-zinc-300 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Button>

              {dropdownOpen && (
                <div className="mt-2 bg-[#0c0502] border border-[#ff4e00] divide-y divide-zinc-900/80">
                  <div className="px-4 pt-3 pb-1 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                    LOREM IPSUM
                  </div>
                  <a
                    href="#demo-opt-1"
                    onClick={(e) => { e.preventDefault(); setDropdownOpen(false); setMobileMenuOpen(false); onSelectDropdownOption?.(); }}
                    className="block px-4 py-2 hover:bg-[#1a0a04]"
                  >
                    <div className="text-sm font-semibold text-white">Demo</div>
                    <div className="text-xs text-[#ff5500]">Lorem ipsum</div>
                  </a>
                  <a
                    href="#demo-opt-2"
                    onClick={(e) => { e.preventDefault(); setDropdownOpen(false); setMobileMenuOpen(false); onSelectDropdownOption?.(); }}
                    className="block px-4 py-2 text-sm text-zinc-200 hover:bg-[#1a0a04]"
                  >
                    Lorem ipsum
                  </a>
                  <a
                    href="#demo-opt-3"
                    onClick={(e) => { e.preventDefault(); setDropdownOpen(false); setMobileMenuOpen(false); onSelectDropdownOption?.(); }}
                    className="block px-4 py-2 text-sm text-zinc-200 hover:bg-[#1a0a04]"
                  >
                    Lorem ipsum
                  </a>
                  <a
                    href="#demo-opt-4"
                    onClick={(e) => { e.preventDefault(); setDropdownOpen(false); setMobileMenuOpen(false); onSelectDropdownOption?.(); }}
                    className="block px-4 py-2 text-sm text-[#ff5500] hover:bg-[#1a0a04]"
                  >
                    Lorem ipsum
                  </a>
                </div>
              )}
            </div>
            <div>
              <Button
                type="button"
                onClick={() => setActionDropdownOpen((prev) => !prev)}
                className="w-full py-2.5 h-auto rounded-none inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-white bg-[#ff3b00] hover:bg-[#ff4e17] shadow-[0_0_15px_rgba(255,59,0,0.4)] transition-colors border-none"
              >
                <span>{solidButtonText}</span>
                <svg
                  className={`w-3.5 h-3.5 text-white transition-transform duration-200 ${
                    actionDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Button>

              {actionDropdownOpen && (
                <div className="mt-2 bg-[#0c0502] border border-[#ff4e00] divide-y divide-zinc-900/80">
                  <div className="px-4 py-3 flex items-center justify-between border-b border-zinc-900/80">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ff3b00] shadow-[0_0_8px_rgba(255,59,0,0.9)]" />
                      <span className="text-[11px] font-bold tracking-widest text-zinc-300 uppercase">
                        DEMO
                      </span>
                    </div>
                    <span className="text-sm font-mono text-white">[XX]</span>
                  </div>

                  <a
                    href="#external-link"
                    onClick={() => { setActionDropdownOpen(false); setMobileMenuOpen(false); }}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-200 hover:bg-[#1a0a04]"
                  >
                    <svg className="w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    <span>Lorem ipsum</span>
                  </a>

                  <a
                    href="#logout"
                    onClick={() => { setActionDropdownOpen(false); setMobileMenuOpen(false); }}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#ff5500] hover:bg-[#1a0a04]"
                  >
                    <svg className="w-4 h-4 text-[#ff5500]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span>Lorem ipsum</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}