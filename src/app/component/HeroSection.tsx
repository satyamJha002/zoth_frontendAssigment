"use client";

import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCountdown } from "@/hooks/useCountdown";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export interface TierData {
  id: number;
  tag: string;
  badge: string;
  apy: string;
  minDeposit: string;
  lockup: string;
  capacity: string;
  allocationRemaining: string;
  protection: string;
  protocolFee: string;
  rating: string;
  riskCategory: string;
}

export interface DepositToken {
  id: number;
  symbol: string;
  name: string;
  network: string;
  balance: string;
  iconColor: string;
}

export interface DepositDefaults {
  amount: number;
  yieldTokenName: string;
  gasEstimate: string;
  networkName: string;
}

export interface SaleData {
  status: string;
  vaultName: string;
  description: string;
  targetCapUsd: number;
  totalRaisedUsd: number;
  progressPercentage: number;
  targetApy: number;
  minDepositUsd: number;
  endTime: string;
  tranches: Array<{
    id: string;
    name: string;
    apy: number;
    capacity: number;
    filled: number;
  }>;
  tiers?: TierData[];
  depositTokens?: DepositToken[];
  depositDefaults?: DepositDefaults;
}

export type FunnelStep =
  | "OVERVIEW"
  | "ELIGIBILITY"
  | "TIER_SELECTION"
  | "ALLOCATION"
  | "CONFIRMATION"
  | "DUAL_TRANCHE";

export interface HeroSectionProps {
  currentScreen?: number;
  onScreenChange?: (screen: number) => void;
}

export default function HeroSection({
  currentScreen = 1,
  onScreenChange,
}: HeroSectionProps) {
  const getStepFromScreen = (scr: number): FunnelStep => {
    if (scr === 11) return "DUAL_TRANCHE";
    if (scr === 10) return "CONFIRMATION";
    if (scr === 9) return "ALLOCATION";
    if (scr === 8) return "TIER_SELECTION";
    if (scr === 6 || scr === 7) return "ELIGIBILITY";
    return "OVERVIEW";
  };

  const [step, setStep] = useState<FunnelStep>(getStepFromScreen(currentScreen));

  useEffect(() => {
    if (currentScreen !== undefined) {
      setStep(getStepFromScreen(currentScreen));
    }
  }, [currentScreen]);

  const handleStepChange = (newStep: FunnelStep) => {
    setStep(newStep);
    const screenNum =
      newStep === "OVERVIEW"
        ? 1
        : newStep === "ELIGIBILITY"
          ? 7
          : newStep === "TIER_SELECTION"
            ? 8
            : newStep === "ALLOCATION"
              ? 9
              : newStep === "CONFIRMATION"
                ? 10
                : 11;
    onScreenChange?.(screenNum);
  };

  const [checklist, setChecklist] = useState({
    item1: true,
    item2: true,
    item3: false,
    item4: false,
  });

  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const isAllChecked = checkedCount === 4;

  const handleToggleAllChecklist = () => {
    const target = !isAllChecked;
    setChecklist({
      item1: target,
      item2: target,
      item3: target,
      item4: target,
    });
  };

  const { data: saleData } = useQuery<SaleData>({
    queryKey: ["saleData"],
    queryFn: async () => {
      const res = await fetch("/api/sale");
      if (!res.ok) throw new Error("Failed to fetch sale data");
      return res.json();
    },
  });

  const countdown = useCountdown(saleData?.endTime);

  const [selectedTier, setSelectedTier] = useState<number>(1);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [allocationDropdownOpen, setAllocationDropdownOpen] = useState<boolean>(false);
  const [selectedAllocationOption, setSelectedAllocationOption] = useState<number>(1);
  const allocationDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        allocationDropdownRef.current &&
        !allocationDropdownRef.current.contains(event.target as Node)
      ) {
        setAllocationDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentTier: TierData = saleData?.tiers?.find((t) => t.id === selectedTier) ?? {
    id: 1,
    tag: "Tier 01",
    badge: "SENIOR SECURED",
    apy: "12.5% APY",
    minDeposit: "$5,000",
    lockup: "90 Days",
    capacity: "$6.0M",
    allocationRemaining: "$800K",
    protection: "First-Loss Protected",
    protocolFee: "0.20%",
    rating: "Secured / AAA",
    riskCategory: "Low Risk",
  };

  const currentToken: DepositToken = saleData?.depositTokens?.find((t) => t.id === selectedAllocationOption) ?? {
    id: 1,
    symbol: "USDC",
    name: "USD Coin",
    network: "Base",
    balance: "25,000.00",
    iconColor: "#2563eb",
  };

  return (
    <section className="relative z-10 w-full max-w-[1386px] min-h-[694px] mx-auto px-4 sm:px-0 py-8 lg:py-12 select-none">
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-[32px] items-stretch min-h-[694px]">
        <Card
          className={`relative rounded-none p-6 sm:p-8 bg-[#070402]/85 backdrop-blur-md flex flex-col justify-between space-y-6 border border-orange-950/30 transition-all duration-300 shadow-none ${step === "TIER_SELECTION" ||
              step === "ALLOCATION" ||
              step === "CONFIRMATION" ||
              step === "DUAL_TRANCHE"
              ? "lg:col-span-6"
              : "lg:col-span-7"
            }`}
        >
          <div className="flex items-center">
            <div className="relative inline-flex items-center px-3 py-1 bg-[#140904]/90 border border-orange-950/40">
              <span className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t-[1.5px] border-l-[1.5px] border-[#ff5500]" />
              <span className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t-[1.5px] border-r-[1.5px] border-[#ff5500]" />
              <span className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b-[1.5px] border-l-[1.5px] border-[#ff5500]" />
              <span className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b-[1.5px] border-r-[1.5px] border-[#ff5500]" />

              <Badge
                variant="orange"
                className="p-0 border-none bg-transparent rounded-none text-[#ff5500] text-xs font-semibold tracking-wide"
              >
                Lorem ipsum
              </Badge>
            </div>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Lorem ipsum dolor
            </h1>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-end justify-between">
              <div>
                <span className="block text-xs text-zinc-400 font-medium">Demo</span>
                <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono">
                  {saleData ? `$${(saleData.totalRaisedUsd / 1000000).toFixed(1)}M` : "$4.8M"}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-xs text-zinc-400 font-medium">Lorem ipsum</span>
                <span className="text-2xl sm:text-3xl font-bold text-[#ff4500] tracking-tight font-mono">
                  {saleData ? `${saleData.progressPercentage}%` : "48%"}
                </span>
              </div>
            </div>

            <Progress
              value={saleData?.progressPercentage ?? 48}
              max={100}
              className="w-full h-2.5 rounded-none bg-[#180903] border border-orange-950/50"
              indicatorClassName="bg-gradient-to-r from-[#ff3700] to-[#ff5d00] shadow-[0_0_12px_rgba(255,85,0,0.6)] rounded-none"
            />

            <div className="flex justify-between text-xs font-mono text-zinc-500">
              <span>Min: ${saleData ? saleData.minDepositUsd.toLocaleString() : "5,000"}</span>
              <span>Cap: ${saleData ? `${(saleData.targetCapUsd / 1000000).toFixed(1)}M` : "10.0M"}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-[#0d0603]/80 border border-orange-950/40 space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">
                  {saleData?.tranches?.[0]?.name ? "Senior" : "[XX]"}
                </span>
                <span className="text-[#ff5500] font-semibold">
                  {saleData?.tranches?.[0] ? `${saleData.tranches[0].apy}% APY` : "12.5% APY"}
                </span>
              </div>
              <Progress
                value={
                  saleData?.tranches?.[0]
                    ? Math.round((saleData.tranches[0].filled / saleData.tranches[0].capacity) * 100)
                    : 87
                }
                max={100}
                className="w-full h-1.5 rounded-none bg-[#180903] border-none"
                indicatorClassName="bg-[#ff4e00] shadow-[0_0_8px_rgba(255,78,0,0.5)] rounded-none"
              />
              <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                <span>
                  {saleData?.tranches?.[0]
                    ? `$${(saleData.tranches[0].filled / 1000000).toFixed(1)}M`
                    : "$5.2M"}
                </span>
                <span>
                  {saleData?.tranches?.[0]
                    ? `$${(saleData.tranches[0].capacity / 1000000).toFixed(1)}M`
                    : "$6.0M"}
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#0d0603]/80 border border-orange-950/40 space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">
                  {saleData?.tranches?.[1]?.name ? "Junior" : "[XX]"}
                </span>
                <span className="text-[#ff5500] font-semibold">
                  {saleData?.tranches?.[1] ? `${saleData.tranches[1].apy}% APY` : "18.5% APY"}
                </span>
              </div>
              <Progress
                value={
                  saleData?.tranches?.[1]
                    ? Math.round((saleData.tranches[1].filled / saleData.tranches[1].capacity) * 100)
                    : 48
                }
                max={100}
                className="w-full h-1.5 rounded-none bg-[#180903] border-none"
                indicatorClassName="bg-[#ff4e00] shadow-[0_0_8px_rgba(255,78,0,0.5)] rounded-none"
              />
              <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                <span>
                  {saleData?.tranches?.[1]
                    ? `$${(saleData.tranches[1].filled / 1000000).toFixed(1)}M`
                    : "$1.9M"}
                </span>
                <span>
                  {saleData?.tranches?.[1]
                    ? `$${(saleData.tranches[1].capacity / 1000000).toFixed(1)}M`
                    : "$4.0M"}
                </span>
              </div>
            </div>
          </div>

          <div className="border-b border-orange-950/50 pb-5">
            <span className="block text-xs text-zinc-400 font-medium">Demo</span>
            <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono">
              {saleData ? `${saleData.targetApy}% APY` : "16.5% APY"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-3">
              <div className="p-1.5 text-zinc-300">
                <svg className="w-5 h-5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <circle cx="12" cy="12" r="9" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-white tracking-tight">
                  Lorem ipsum dolor
                </div>
                <div className="text-xs text-zinc-400">
                  Lorem ipsum dolor sit amet consectetur
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 font-mono">
              {[
                { val: countdown.days, label: "DEMO" },
                { val: countdown.hours, label: "DEMO" },
                { val: countdown.minutes, label: "DEMO" },
                { val: countdown.seconds, label: "DEMO" },
              ].map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center justify-center px-2 py-1 bg-[#140803] border border-orange-950/60 min-w-[38px]">
                    <span className="text-xs sm:text-sm font-bold text-white leading-none tabular-nums font-mono">
                      {item.val}
                    </span>
                    <Badge
                      variant="outline"
                      className="p-0 border-none bg-transparent rounded-none text-[9px] text-zinc-400 tracking-wider uppercase mt-1 leading-none"
                    >
                      {item.label}
                    </Badge>
                  </div>
                  {idx < 3 && <span className="text-[#ff5500] font-bold text-xs select-none">:</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Card>
        <Card
          className={`relative rounded-none p-6 sm:p-8 bg-[#070402]/85 backdrop-blur-md flex flex-col justify-between space-y-5 min-h-[560px] border border-orange-950/30 transition-all duration-300 shadow-none ${step === "TIER_SELECTION" ||
              step === "ALLOCATION" ||
              step === "CONFIRMATION" ||
              step === "DUAL_TRANCHE"
              ? "lg:col-span-6"
              : "lg:col-span-5"
            }`}
        >
          <div className="border-b border-orange-950/40 pb-3">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <button
                type="button"
                onClick={() => handleStepChange("OVERVIEW")}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer ${step === "OVERVIEW"
                    ? "text-[#ff5500] font-bold"
                    : "text-zinc-500 hover:text-zinc-300"
                  }`}
              >
                <span
                  className={`w-4 h-4 rounded-[2px] flex items-center justify-center text-[10px] ${step === "OVERVIEW"
                      ? "bg-[#ff3b00] text-white shadow-[0_0_8px_rgba(255,59,0,0.6)]"
                      : "bg-[#180903] border border-orange-950/60 text-zinc-400"
                    }`}
                >
                  1
                </span>
                <span className="uppercase tracking-wider">Overview</span>
              </button>

              <div className="h-[1px] flex-1 mx-2 bg-gradient-to-r from-orange-950/30 via-orange-500/20 to-orange-950/30" />

              <button
                type="button"
                onClick={() => handleStepChange("ELIGIBILITY")}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer ${step === "ELIGIBILITY"
                    ? "text-[#ff5500] font-bold"
                    : "text-zinc-500 hover:text-zinc-300"
                  }`}
              >
                <span
                  className={`w-4 h-4 rounded-[2px] flex items-center justify-center text-[10px] ${step === "ELIGIBILITY"
                      ? "bg-[#ff3b00] text-white shadow-[0_0_8px_rgba(255,59,0,0.6)]"
                      : "bg-[#180903] border border-orange-950/60 text-zinc-400"
                    }`}
                >
                  2
                </span>
                <span className="uppercase tracking-wider">Eligibility</span>
              </button>

              <div className="h-[1px] flex-1 mx-2 bg-gradient-to-r from-orange-950/30 via-orange-500/20 to-orange-950/30" />

              <button
                type="button"
                onClick={() => handleStepChange("TIER_SELECTION")}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer ${step === "TIER_SELECTION"
                    ? "text-[#ff5500] font-bold"
                    : "text-zinc-500 hover:text-zinc-300"
                  }`}
              >
                <span
                  className={`w-4 h-4 rounded-[2px] flex items-center justify-center text-[10px] ${step === "TIER_SELECTION"
                      ? "bg-[#ff3b00] text-white shadow-[0_0_8px_rgba(255,59,0,0.6)]"
                      : "bg-[#180903] border border-orange-950/60 text-zinc-400"
                    }`}
                >
                  3
                </span>
                <span className="uppercase tracking-wider">Tiers</span>
              </button>

              <div className="h-[1px] flex-1 mx-2 bg-gradient-to-r from-orange-950/30 via-orange-500/20 to-orange-950/30" />

              <button
                type="button"
                onClick={() => handleStepChange("ALLOCATION")}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer ${step === "ALLOCATION"
                    ? "text-[#ff5500] font-bold"
                    : "text-zinc-500 hover:text-zinc-300"
                  }`}
              >
                <span
                  className={`w-4 h-4 rounded-[2px] flex items-center justify-center text-[10px] ${step === "ALLOCATION"
                      ? "bg-[#ff3b00] text-white shadow-[0_0_8px_rgba(255,59,0,0.6)]"
                      : "bg-[#180903] border border-orange-950/60 text-zinc-400"
                    }`}
                >
                  4
                </span>
                <span className="uppercase tracking-wider">Deposit</span>
              </button>
            </div>
          </div>
          {step === "OVERVIEW" && (
            <div className="flex flex-col justify-between h-full space-y-6 animate-in fade-in duration-200">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff3b00] shadow-[0_0_8px_rgba(255,59,0,0.9)]" />
                  <Badge
                    variant="orange"
                    className="p-0 border-none bg-transparent rounded-none text-[11px] font-bold tracking-widest text-[#ff5500] uppercase font-mono"
                  >
                    ALLOCATION OPEN
                  </Badge>
                </div>
                <h2 className="text-base font-bold tracking-wider text-white uppercase font-sans">
                  LOREM IPSUM
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="flex flex-col space-y-3.5 py-4">
                <div className="relative p-0.5">
                  <span className="absolute -top-[2px] -left-[2px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#ff5500]" />
                  <span className="absolute -top-[2px] -right-[2px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#ff5500]" />
                  <span className="absolute -bottom-[2px] -left-[2px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#ff5500]" />
                  <span className="absolute -bottom-[2px] -right-[2px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#ff5500]" />

                  <Button
                    type="button"
                    onClick={() => handleStepChange("ELIGIBILITY")}
                    className="w-full py-3.5 px-6 h-auto rounded-none text-center text-sm font-semibold text-white bg-[#ff3b00] hover:bg-[#ff4e14] transition-all duration-150 shadow-[0_0_15px_rgba(255,59,0,0.4)] hover:shadow-[0_0_25px_rgba(255,59,0,0.6)] cursor-pointer border-none"
                  >
                    Lorem ipsum
                  </Button>
                </div>

                <div className="relative p-0.5">
                  <span className="absolute -top-[2px] -left-[2px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#ff5500]" />
                  <span className="absolute -top-[2px] -right-[2px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#ff5500]" />
                  <span className="absolute -bottom-[2px] -left-[2px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#ff5500]" />
                  <span className="absolute -bottom-[2px] -right-[2px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#ff5500]" />

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full py-3.5 px-6 h-auto rounded-none text-center text-sm font-semibold text-zinc-300 bg-[#120803]/80 hover:bg-[#1c0d06] hover:text-white border border-[#ff4e00] transition-all duration-150 cursor-pointer"
                  >
                    Lorem ipsum
                  </Button>
                </div>

                <p className="text-center text-xs text-zinc-500 pt-1">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                </p>
              </div>

              <div className="pt-2 flex justify-between items-center text-xs font-mono text-zinc-500 border-t border-orange-950/30">
                <span>Phase: Pre-Allocation</span>
                <button
                  type="button"
                  onClick={() => handleStepChange("ELIGIBILITY")}
                  className="text-[#ff5500] hover:text-[#ff7722] transition-colors cursor-pointer"
                >
                  Verify Eligibility →
                </button>
              </div>
            </div>
          )}


          {step === "ELIGIBILITY" && (
            <div className="flex flex-col justify-between h-full space-y-4 animate-in fade-in duration-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold tracking-wider text-white uppercase font-sans">
                    LOREM IPSUM
                  </h2>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleAllChecklist}
                    className="h-auto p-0 text-[11px] font-mono text-[#ff5500] hover:text-[#ff7722] hover:bg-transparent underline transition-colors cursor-pointer"
                  >
                    {isAllChecked ? "Clear all" : "Select all"}
                  </Button>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna.
                </p>

                <div className="p-3.5 bg-[#0b0502]/90 border border-orange-950/40 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-orange-950/30 pb-2">
                    <span>Criteria & Verification</span>
                    <span className="text-[#ff5500] font-semibold">Status</span>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    <div
                      onClick={() => setChecklist({ ...checklist, item1: !checklist.item1 })}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <Checkbox
                        checked={checklist.item1}
                        onCheckedChange={(checked) => setChecklist({ ...checklist, item1: !!checked })}
                        className="w-4 h-4 rounded-[2px] border border-[#ff4e00] data-[checked]:bg-[#ff3b00] data-[checked]:text-white"
                      />
                      <span className="text-xs text-zinc-300 group-hover:text-white transition-colors">
                        Lorem ipsum
                      </span>
                    </div>

                    <div
                      onClick={() => setChecklist({ ...checklist, item2: !checklist.item2 })}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <Checkbox
                        checked={checklist.item2}
                        onCheckedChange={(checked) => setChecklist({ ...checklist, item2: !!checked })}
                        className="w-4 h-4 rounded-[2px] border border-[#ff4e00] data-[checked]:bg-[#ff3b00] data-[checked]:text-white"
                      />
                      <span className="text-xs text-zinc-300 group-hover:text-white transition-colors">
                        Lorem ipsum dolor sit amet
                      </span>
                    </div>

                    <div
                      onClick={() => setChecklist({ ...checklist, item3: !checklist.item3 })}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <Checkbox
                        checked={checklist.item3}
                        onCheckedChange={(checked) => setChecklist({ ...checklist, item3: !!checked })}
                        className="w-4 h-4 rounded-[2px] border border-zinc-700/60 data-[checked]:border-[#ff4e00] data-[checked]:bg-[#ff3b00] data-[checked]:text-white"
                      />
                      <span className="text-xs text-zinc-400 group-hover:text-white transition-colors">
                        Lorem ipsum
                      </span>
                    </div>

                    <div
                      onClick={() => setChecklist({ ...checklist, item4: !checklist.item4 })}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <Checkbox
                        checked={checklist.item4}
                        onCheckedChange={(checked) => setChecklist({ ...checklist, item4: !!checked })}
                        className="w-4 h-4 rounded-[2px] border border-zinc-700/60 data-[checked]:border-[#ff4e00] data-[checked]:bg-[#ff3b00] data-[checked]:text-white"
                      />
                      <span className="text-xs text-zinc-400 group-hover:text-white transition-colors">
                        Lorem ipsum
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative p-0.5 pt-2">
                <span className="absolute top-[6px] -left-[1.5px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#ff5500]" />
                <span className="absolute top-[6px] -right-[1.5px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#ff5500]" />
                <span className="absolute -bottom-[1.5px] -left-[1.5px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#ff5500]" />
                <span className="absolute -bottom-[1.5px] -right-[1.5px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#ff5500]" />

                <Button
                  type="button"
                  onClick={() => handleStepChange("TIER_SELECTION")}
                  className="w-full py-3.5 px-6 h-auto rounded-none text-center text-sm font-semibold text-white bg-[#ff3b00] hover:bg-[#ff4e14] transition-all duration-150 shadow-[0_0_15px_rgba(255,59,0,0.4)] hover:shadow-[0_0_25px_rgba(255,59,0,0.6)] cursor-pointer border-none"
                >
                  Lorem ipsum
                </Button>
              </div>

              <div className="pt-2 flex justify-between items-center text-xs font-mono border-t border-orange-950/30">
                <button
                  type="button"
                  onClick={() => handleStepChange("OVERVIEW")}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  ← Back to Overview
                </button>
                <span className="text-[11px] text-zinc-400 font-mono">
                  {checkedCount}/4 Attested
                </span>
                <button
                  type="button"
                  onClick={() => handleStepChange("TIER_SELECTION")}
                  className="text-[#ff5500] hover:text-[#ff7722] font-semibold transition-colors cursor-pointer"
                >
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {/* =====================================================================
              STEP 3: TIER COMPARISON (DYNAMIC FROM API)
             ===================================================================== */}
          {step === "TIER_SELECTION" && (
            <div className="flex flex-col justify-between h-full space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h2 className="text-sm font-bold tracking-wider text-white uppercase font-sans">
                  SELECT ALLOCATION TIER
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Choose a tranche allocation tier to participate in institutional private credit yields.
                </p>

                {/* Dynamic Tier Cards from API */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {(saleData?.tiers ?? [
                    {
                      id: 1,
                      tag: "Tier 01",
                      badge: "SENIOR SECURED",
                      apy: "12.5% APY",
                      minDeposit: "$5,000",
                      lockup: "90 Days",
                      capacity: "$6.0M",
                      allocationRemaining: "$800K",
                      protection: "First-Loss Protected",
                      protocolFee: "0.20%",
                      rating: "Secured / AAA",
                      riskCategory: "Low Risk",
                    },
                    {
                      id: 2,
                      tag: "Tier 02",
                      badge: "JUNIOR ENHANCED",
                      apy: "18.5% APY",
                      minDeposit: "$10,000",
                      lockup: "180 Days",
                      capacity: "$4.0M",
                      allocationRemaining: "$2.1M",
                      protection: "Subordinated Yield",
                      protocolFee: "0.35%",
                      rating: "High Yield / A+",
                      riskCategory: "Moderate Risk",
                    },
                  ]).map((tier) => (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedTier(tier.id)}
                      className={`bg-[#0b0502]/95 border p-3 sm:p-4 flex flex-col justify-between space-y-3 transition-all cursor-pointer ${selectedTier === tier.id
                          ? "border-[#ff4e00] shadow-[0_0_15px_rgba(255,78,0,0.2)]"
                          : "border-orange-950/50 hover:border-orange-950/80"
                        }`}
                    >
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between border-b border-orange-950/40 pb-2 text-xs font-mono">
                        <span className="text-zinc-300 font-semibold">{tier.tag}</span>
                        <span className="text-[#ff5500] font-semibold">{tier.badge}</span>
                      </div>

                      {/* Dynamic Data Rows from API */}
                      <div className="space-y-1.5 text-[11px]">
                        <div className="flex items-center justify-between py-0.5">
                          <span className="text-zinc-400">Target Yield</span>
                          <span className="text-[#ff5500] font-semibold">{tier.apy}</span>
                        </div>
                        <div className="flex items-center justify-between py-0.5">
                          <span className="text-zinc-400">Min Allocation</span>
                          <span className="text-zinc-300 font-mono">{tier.minDeposit}</span>
                        </div>
                        <div className="flex items-center justify-between py-0.5">
                          <span className="text-zinc-400">Term Duration</span>
                          <span className="text-zinc-300 font-mono">{tier.lockup}</span>
                        </div>
                        <div className="flex items-center justify-between py-0.5">
                          <span className="text-zinc-400">Tranche Cap</span>
                          <span className="text-zinc-300 font-mono">{tier.capacity}</span>
                        </div>
                        <div className="flex items-center justify-between py-0.5">
                          <span className="text-zinc-400">Remaining</span>
                          <span className="text-zinc-300 font-mono">{tier.allocationRemaining}</span>
                        </div>
                        <div className="flex items-center justify-between py-0.5">
                          <span className="text-zinc-400">Seniority</span>
                          <span className="text-zinc-300">{tier.protection}</span>
                        </div>
                        <div className="flex items-center justify-between py-0.5">
                          <span className="text-zinc-400">Protocol Fee</span>
                          <span className="text-zinc-300 font-mono">{tier.protocolFee}</span>
                        </div>
                        <div className="flex items-center justify-between py-0.5">
                          <span className="text-zinc-400">Credit Rating</span>
                          <span className="text-zinc-300 font-mono">{tier.rating}</span>
                        </div>
                      </div>

                      {/* Bottom Button: Selecting advances to Allocation Screen */}
                      <div className="relative p-0.5 pt-1">
                        <span className="absolute top-[2px] -left-[1.5px] w-2 h-2 border-t-2 border-l-2 border-[#ff5500]" />
                        <span className="absolute top-[2px] -right-[1.5px] w-2 h-2 border-t-2 border-r-2 border-[#ff5500]" />
                        <span className="absolute -bottom-[1.5px] -left-[1.5px] w-2 h-2 border-b-2 border-l-2 border-[#ff5500]" />
                        <span className="absolute -bottom-[1.5px] -right-[1.5px] w-2 h-2 border-b-2 border-r-2 border-[#ff5500]" />

                        <Button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTier(tier.id);
                            handleStepChange("ALLOCATION");
                          }}
                          className="w-full py-2.5 px-3 h-auto rounded-none text-center text-xs font-mono font-bold text-white bg-[#ff3b00] hover:bg-[#ff4e14] transition-all duration-150 shadow-[0_0_12px_rgba(255,59,0,0.4)] hover:shadow-[0_0_20px_rgba(255,59,0,0.6)] cursor-pointer border-none"
                        >
                          Select {tier.tag}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Footer */}
              <div className="pt-2 flex justify-between items-center text-xs font-mono border-t border-orange-950/30">
                <button
                  type="button"
                  onClick={() => handleStepChange("ELIGIBILITY")}
                  className="text-[#ff5500] hover:text-[#ff7722] transition-colors cursor-pointer font-semibold"
                >
                  ← Back to Eligibility
                </button>
                <span className="text-[11px] text-zinc-500 font-mono">
                  {currentTier.tag} Selected
                </span>
                <button
                  type="button"
                  onClick={() => handleStepChange("OVERVIEW")}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  Overview ↺
                </button>
              </div>
            </div>
          )}

          {/* =====================================================================
              STEP 4: ALLOCATION / SWAP (DYNAMIC FROM API)
             ===================================================================== */}
          {step === "ALLOCATION" && (
            <div className="flex flex-col justify-between h-full space-y-4 animate-in fade-in duration-200">
              {/* Top Header Row with dynamic dropdown chevron and tier badge */}
              <div className="flex items-center justify-between border-b border-orange-950/40 pb-2 text-xs font-mono relative">
                <div ref={allocationDropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setAllocationDropdownOpen(!allocationDropdownOpen)}
                    className="flex items-center gap-1.5 text-zinc-300 hover:text-white cursor-pointer group focus:outline-none"
                  >
                    <span className="font-semibold">{currentToken.symbol}</span>
                    <svg
                      className={`w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-transform duration-200 ${allocationDropdownOpen ? "rotate-180 text-[#ff5500]" : ""
                        }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu matching dynamic tokens */}
                  {allocationDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-[240px] bg-[#090402] border border-[#ff4e00] shadow-[0_0_30px_rgba(255,78,0,0.35)] z-40 text-left overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                      {/* Dropdown Header */}
                      <div className="px-4 pt-3 pb-2 border-b border-orange-950/40">
                        <span className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase font-sans">
                          SELECT TOKEN
                        </span>
                      </div>

                      {/* Dynamic Token Options */}
                      <div className="divide-y divide-orange-950/40">
                        {(saleData?.depositTokens ?? [
                          { id: 1, symbol: "USDC", name: "USD Coin", network: "Base", balance: "25,000.00", iconColor: "#2563eb" },
                          { id: 2, symbol: "USDT", name: "Tether USD", network: "Base", balance: "18,450.00", iconColor: "#16a34a" },
                        ]).map((tok) => (
                          <div
                            key={tok.id}
                            onClick={() => {
                              setSelectedAllocationOption(tok.id);
                              setAllocationDropdownOpen(false);
                            }}
                            className="flex items-center justify-between px-4 py-3 hover:bg-[#1a0a04] transition-colors cursor-pointer group"
                          >
                            <div>
                              <div className="text-sm font-bold font-mono text-white leading-tight">
                                {tok.symbol}
                              </div>
                              <div className="text-xs font-mono text-zinc-400 leading-tight mt-0.5">
                                Balance: {tok.balance}
                              </div>
                            </div>

                            {selectedAllocationOption === tok.id ? (
                              <div className="relative p-0.5">
                                <span className="absolute -top-[1.5px] -left-[1.5px] w-1.5 h-1.5 border-t border-l border-[#ff5500]" />
                                <span className="absolute -top-[1.5px] -right-[1.5px] w-1.5 h-1.5 border-t border-r border-[#ff5500]" />
                                <span className="absolute -bottom-[1.5px] -left-[1.5px] w-1.5 h-1.5 border-b border-l border-[#ff5500]" />
                                <span className="absolute -bottom-[1.5px] -right-[1.5px] w-1.5 h-1.5 border-b border-r border-[#ff5500]" />
                                <div className="w-5 h-5 bg-[#ff3b00] rounded-[1px] flex items-center justify-center shadow-[0_0_8px_rgba(255,59,0,0.6)]">
                                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                </div>
                              </div>
                            ) : (
                              <div className="relative w-5 h-5 flex items-center justify-center">
                                <span className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-[#ff5500]" />
                                <span className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t-2 border-r-2 border-[#ff5500]" />
                                <span className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b-2 border-l-2 border-[#ff5500]" />
                                <span className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-[#ff5500]" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <span className="text-[#ff5500] font-semibold">{currentTier.tag} ({currentTier.badge})</span>
              </div>

              {/* Two Stacked Swap / Input Boxes with Down Arrow */}
              <div className="space-y-0 relative">
                {/* Upper Box: Token Deposit Input */}
                <div className="bg-[#0b0502]/95 border border-orange-950/50 p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400">You Allocate ({currentToken.symbol})</span>
                    <span className="text-zinc-400 font-mono">Balance: {currentToken.balance}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-3xl font-bold font-mono text-white tracking-tight">
                      {currentTier.minDeposit.replace("$", "")}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-[#140803] border border-orange-950/60 rounded-[2px]">
                        MAX
                      </span>
                      <div className="flex items-center gap-1.5 bg-[#120703] border border-orange-950/40 px-2 py-1 rounded-[2px]">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white font-bold"
                          style={{ backgroundColor: currentToken.iconColor }}
                        >
                          $
                        </div>
                        <span className="text-xs font-bold text-white font-sans tracking-wide">
                          {currentToken.symbol}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Centered Downward Arrow Button */}
                <div className="relative flex justify-center -my-3 z-10">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="w-7 h-7 bg-[#100703] border border-orange-950/80 rounded-[2px] flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#ff5500] hover:bg-[#1a0a04] transition-colors cursor-pointer shadow-md p-0"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </Button>
                </div>

                {/* Lower Box: Minted Vault Tokens */}
                <div className="bg-[#0b0502]/95 border border-orange-950/50 p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400">You Receive (Vault Tokens)</span>
                    <span className="text-zinc-400 font-mono">1:1 Allocation</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-3xl font-bold font-mono text-zinc-300 tracking-tight">
                      {currentTier.minDeposit.replace("$", "")}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-[#120703] border border-orange-950/40 px-2 py-1 rounded-[2px]">
                        <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#ff3700] to-[#ff5d00]" />
                        </div>
                        <span className="text-xs font-semibold text-white font-sans">
                          {saleData?.depositDefaults?.yieldTokenName ?? "ZUSD"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7 Specification Rows directly driven by selected tier from API */}
              <div className="space-y-2 text-xs py-1">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Min Allocation</span>
                  <span className="text-zinc-300 font-mono">{currentTier.minDeposit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Target APY</span>
                  <span className="text-[#ff5500] font-semibold font-mono">{currentTier.apy}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Maturity Period</span>
                  <span className="text-zinc-300 font-mono">{currentTier.lockup}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Seniority Level</span>
                  <span className="text-zinc-300">{currentTier.protection}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Protocol Fee</span>
                  <span className="text-zinc-300 font-mono">{currentTier.protocolFee}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Tranche Size</span>
                  <span className="text-zinc-300 font-mono">{currentTier.capacity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Network</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-[#0052ff] inline-block rounded-[1px]" />
                    <span className="text-xs font-bold text-white lowercase">base</span>
                  </div>
                </div>
              </div>

              {/* Checkbox Row using Shadcn Checkbox */}
              <div
                onClick={() => setTermsAccepted(!termsAccepted)}
                className="flex items-start gap-2.5 pt-1 cursor-pointer group"
              >
                <Checkbox
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                  className="w-3.5 h-3.5 mt-0.5 rounded-[2px] border border-[#ff4e00] data-[checked]:bg-[#ff3b00] data-[checked]:text-white"
                />
                <span className="text-[11px] text-zinc-400 group-hover:text-zinc-300 leading-tight">
                  I accept the institutional vault terms, {currentTier.lockup} lockup duration, and {currentTier.protection} agreement.
                </span>
              </div>

              {/* Bottom Solid Button with HUD Corner Brackets - Activated by Checkbox */}
              <div className="relative p-0.5 pt-1">
                <span className="absolute top-[2px] -left-[1.5px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#ff5500]" />
                <span className="absolute top-[2px] -right-[1.5px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#ff5500]" />
                <span className="absolute -bottom-[1.5px] -left-[1.5px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#ff5500]" />
                <span className="absolute -bottom-[1.5px] -right-[1.5px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#ff5500]" />

                <Button
                  type="button"
                  disabled={!termsAccepted}
                  onClick={() => {
                    if (termsAccepted) {
                      handleStepChange("CONFIRMATION");
                    }
                  }}
                  className={`w-full py-3.5 px-6 h-auto rounded-none text-center text-sm font-semibold transition-all duration-150 border-none ${termsAccepted
                      ? "text-white bg-[#ff3b00] hover:bg-[#ff4e14] cursor-pointer shadow-[0_0_20px_rgba(255,59,0,0.5)] active:scale-[0.99]"
                      : "text-zinc-500 bg-[#3a1208] opacity-60 cursor-not-allowed"
                    }`}
                >
                  Deposit {currentTier.minDeposit} {currentToken.symbol}
                </Button>
              </div>

              {/* Footer Navigation */}
              <div className="pt-2 flex justify-between items-center text-xs font-mono border-t border-orange-950/30">
                <button
                  type="button"
                  onClick={() => handleStepChange("TIER_SELECTION")}
                  className="text-[#ff5500] hover:text-[#ff7722] transition-colors cursor-pointer font-semibold"
                >
                  ← Back to Tiers
                </button>
                <span className="text-[11px] text-zinc-500 font-mono">
                  {currentTier.tag} Selected
                </span>
                <button
                  type="button"
                  onClick={() => handleStepChange("OVERVIEW")}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  Restart ↺
                </button>
              </div>
            </div>
          )}

          {/* =====================================================================
              STEP 5: CONFIRMATION / SUMMARY SCREEN (DYNAMIC FROM API)
             ===================================================================== */}
          {step === "CONFIRMATION" && (
            <div className="flex flex-col justify-between h-full space-y-4 animate-in fade-in duration-200">
              <div className="space-y-4">
                {/* Large Square Asset/Graphic Box */}
                <div className="w-full aspect-square max-h-[220px] bg-[#0c0502] border border-orange-950/60 flex items-center justify-center relative overflow-hidden mx-auto shadow-inner">
                  <div className="absolute inset-3 border border-orange-950/30 flex flex-col items-center justify-center gap-2">
                    <div className="w-14 h-14 rounded-full bg-[#180903] border border-orange-950/60 flex items-center justify-center shadow-[0_0_15px_rgba(255,59,0,0.2)]">
                      <svg className="w-7 h-7 text-[#ff5500]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <Badge variant="orange" className="rounded-none font-mono text-[11px]">
                      {currentTier.badge}
                    </Badge>
                  </div>
                </div>

                {/* Title */}
                <div className="text-center pt-1">
                  <h2 className="text-sm font-bold tracking-widest text-white uppercase font-sans">
                    CONFIRM {currentTier.tag} ALLOCATION
                  </h2>
                </div>

                {/* 6 Detail Telemetry Rows dynamically populated */}
                <div className="space-y-2 text-xs pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Selected Tier</span>
                    <span className="text-white font-mono">{currentTier.tag} ({currentTier.badge})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Deposit Amount</span>
                    <span className="text-white font-mono font-semibold">{currentTier.minDeposit} {currentToken.symbol}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Target Yield</span>
                    <span className="text-[#ff5500] font-mono font-bold">{currentTier.apy}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Maturity Lockup</span>
                    <span className="text-zinc-300 font-mono">{currentTier.lockup}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Protection Standard</span>
                    <span className="text-zinc-300">{currentTier.protection}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Settlement Chain</span>
                    <span className="text-zinc-300 font-mono">Base Network</span>
                  </div>
                </div>
              </div>

              {/* Two Buttons Side-by-Side */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {/* Button 1: Solid Orange Button with HUD Corner Brackets */}
                <div className="relative p-0.5">
                  <span className="absolute -top-[1.5px] -left-[1.5px] w-2 h-2 border-t-2 border-l-2 border-[#ff5500]" />
                  <span className="absolute -top-[1.5px] -right-[1.5px] w-2 h-2 border-t-2 border-r-2 border-[#ff5500]" />
                  <span className="absolute -bottom-[1.5px] -left-[1.5px] w-2 h-2 border-b-2 border-l-2 border-[#ff5500]" />
                  <span className="absolute -bottom-[1.5px] -right-[1.5px] w-2 h-2 border-b-2 border-r-2 border-[#ff5500]" />

                  <Button
                    type="button"
                    onClick={() => handleStepChange("DUAL_TRANCHE")}
                    className="w-full py-3 px-3 h-auto rounded-none text-center text-xs sm:text-sm font-semibold text-white bg-[#ff3b00] hover:bg-[#ff4e14] transition-all duration-150 shadow-[0_0_15px_rgba(255,59,0,0.4)] cursor-pointer border-none"
                  >
                    Confirm & Sign
                  </Button>
                </div>

                {/* Button 2: Outlined Button with HUD Corner Brackets */}
                <div className="relative p-0.5">
                  <span className="absolute -top-[1.5px] -left-[1.5px] w-2 h-2 border-t-2 border-l-2 border-[#ff5500]" />
                  <span className="absolute -top-[1.5px] -right-[1.5px] w-2 h-2 border-t-2 border-r-2 border-[#ff5500]" />
                  <span className="absolute -bottom-[1.5px] -left-[1.5px] w-2 h-2 border-b-2 border-l-2 border-[#ff5500]" />
                  <span className="absolute -bottom-[1.5px] -right-[1.5px] w-2 h-2 border-b-2 border-r-2 border-[#ff5500]" />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleStepChange("ALLOCATION")}
                    className="w-full py-3 px-3 h-auto rounded-none text-center text-xs sm:text-sm font-semibold text-zinc-300 bg-[#120803]/80 hover:bg-[#1c0d06] hover:text-white border border-[#ff4e00]/80 transition-all duration-150 cursor-pointer"
                  >
                    Edit Deposit
                  </Button>
                </div>
              </div>

              {/* Footer Navigation */}
              <div className="pt-2 flex justify-between items-center text-xs font-mono border-t border-orange-950/30">
                <button
                  type="button"
                  onClick={() => handleStepChange("ALLOCATION")}
                  className="text-[#ff5500] hover:text-[#ff7722] transition-colors cursor-pointer font-semibold"
                >
                  ← Back to Deposit
                </button>
                <span className="text-[11px] text-zinc-500 font-mono">
                  Ready to Sign
                </span>
                <button
                  type="button"
                  onClick={() => handleStepChange("DUAL_TRANCHE")}
                  className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                >
                  Tranches →
                </button>
              </div>
            </div>
          )}

          {/* =====================================================================
              STEP 6: DUAL TRANCHE (DYNAMICALLY POPULATED FROM API)
             ===================================================================== */}
          {step === "DUAL_TRANCHE" && (
            <div className="flex flex-col justify-between h-full space-y-4 animate-in fade-in duration-200">
              <div className="space-y-3">
                {/* Title Header */}
                <h2 className="text-sm font-bold tracking-wider text-white uppercase font-sans">
                  ACTIVE TRANCHE DISTRIBUTION
                </h2>

                {/* Dynamically mapped tranche cards from API */}
                <div className="space-y-4 pt-1">
                  {(saleData?.tranches ?? [
                    { id: "A", name: "Senior Tranche", apy: 12.5, capacity: 6000000, filled: 5200000 },
                    { id: "B", name: "Junior Tranche", apy: 18.5, capacity: 4000000, filled: 1900000 },
                  ]).map((tranche) => (
                    <div
                      key={tranche.id}
                      className="bg-[#0b0502]/95 border border-orange-950/50 p-4 space-y-3"
                    >
                      {/* Top Row */}
                      <div className="flex items-center justify-between border-b border-orange-950/40 pb-2 text-xs font-mono">
                        <span className="text-zinc-300 font-semibold">{tranche.name}</span>
                        <span className="text-[#ff5500] font-semibold">{tranche.apy}% APY</span>
                      </div>

                      {/* Metrics Row */}
                      <div className="grid grid-cols-2 gap-4 py-1">
                        <div>
                          <span className="block text-[10px] text-zinc-400 font-mono uppercase">
                            CAPACITY
                          </span>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
                              ${(tranche.capacity / 1000000).toFixed(1)}M
                            </span>
                            <span className="text-xs font-mono text-zinc-400">USD</span>
                          </div>
                        </div>

                        <div>
                          <span className="block text-[10px] text-zinc-400 font-mono uppercase">
                            FILLED
                          </span>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">
                              ${(tranche.filled / 1000000).toFixed(1)}M
                            </span>
                            <span className="text-xs font-mono text-zinc-400">
                              ({Math.round((tranche.filled / tranche.capacity) * 100)}%)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Wide Solid Orange Button with 4 HUD Corner Brackets */}
                      <div className="relative p-0.5 pt-1">
                        <span className="absolute top-[2px] -left-[1.5px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#ff5500]" />
                        <span className="absolute top-[2px] -right-[1.5px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#ff5500]" />
                        <span className="absolute -bottom-[1.5px] -left-[1.5px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#ff5500]" />
                        <span className="absolute -bottom-[1.5px] -right-[1.5px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#ff5500]" />

                        <Button
                          type="button"
                          className="w-full py-3 px-4 h-auto rounded-none text-center text-sm font-semibold text-white bg-[#ff3b00] hover:bg-[#ff4e14] transition-all duration-150 shadow-[0_0_15px_rgba(255,59,0,0.4)] hover:shadow-[0_0_25px_rgba(255,59,0,0.6)] cursor-pointer border-none"
                        >
                          Participate in {tranche.name}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Navigation */}
              <div className="pt-2 flex justify-between items-center text-xs font-mono border-t border-orange-950/30">
                <button
                  type="button"
                  onClick={() => handleStepChange("CONFIRMATION")}
                  className="text-[#ff5500] hover:text-[#ff7722] transition-colors cursor-pointer font-semibold"
                >
                  ← Back to Confirmation
                </button>
                <span className="text-[11px] text-zinc-500 font-mono">
                  Execution Ready
                </span>
                <button
                  type="button"
                  onClick={() => handleStepChange("OVERVIEW")}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  Restart ↺
                </button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
