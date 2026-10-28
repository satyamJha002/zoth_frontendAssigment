import { NextResponse } from "next/server";

export async function GET() {
    const futureEndTime = new Date(Date.now() + (4 * 24 * 60 * 60 + 18 * 60 * 60 + 32 * 60 + 15) * 1000).toISOString();

    return NextResponse.json({
        status: "ACTIVE",
        vaultName: "ZOTH Institutional Fixed Yield Vault",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et",
        targetCapUsd: 10000000,
        totalRaisedUsd: 4800000,
        progressPercentage: 48,
        targetApy: 16.5,
        minDepositUsd: 5000,
        endTime: futureEndTime,
        tranches: [
            { id: "A", name: "Senior Tranche", apy: 12.5, capacity: 6000000, filled: 5200000 },
            { id: "B", name: "Junior Tranche", apy: 18.5, capacity: 4000000, filled: 1900000 },
        ],
        tiers: [
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
        ],
        depositTokens: [
            { id: 1, symbol: "USDC", name: "USD Coin", network: "Base", balance: "25,000.00", iconColor: "#2563eb" },
            { id: 2, symbol: "USDT", name: "Tether USD", network: "Base", balance: "18,450.00", iconColor: "#16a34a" },
        ],
        depositDefaults: {
            amount: 5000,
            yieldTokenName: "ZUSD",
            gasEstimate: "< $0.05",
            networkName: "Base",
        },
    });
}