'use client';

import Image from 'next/image';

// Mock data
const matches = [
    {
        id: 1,
        league: "Friendly",
        homeTeam: "FC Napoli",
        awayTeam: "FC Manchester",
        homeScore: 3,
        awayScore: 2,
        homeLogo: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=100&auto=format&fit=crop", // Soccer ball
        awayLogo: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=100&auto=format&fit=crop", // Placeholder
        status: "FT",
    },
    {
        id: 2,
        league: "Friendly",
        homeTeam: "FC United",
        awayTeam: "Feyenoord",
        homeScore: 1,
        awayScore: 1,
        homeLogo: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=100&auto=format&fit=crop",
        awayLogo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=100&auto=format&fit=crop",
        status: "FT",
    },
    {
        id: 3,
        league: "Friendly",
        homeTeam: "FC United",
        awayTeam: "FC Napoli",
        homeScore: 2,
        awayScore: 3,
        homeLogo: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=100&auto=format&fit=crop",
        awayLogo: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=100&auto=format&fit=crop",
        status: "FT",
    },
    {
        id: 4,
        league: "Premier League",
        homeTeam: "Arsenal",
        awayTeam: "Chelsea",
        homeScore: 0,
        awayScore: 0,
        homeLogo: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=100&auto=format&fit=crop",
        awayLogo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=100&auto=format&fit=crop",
        status: "15'",
        isLive: true,
    },
];

export function Scoreboard() {
    return (
        <div className="bg-white border-b border-gray-200 py-4 overflow-x-auto">
            <div className="container mx-auto px-4">
                <div className="flex gap-4 min-w-max">
                    {matches.map((match) => (
                        <div key={match.id} className="flex items-center gap-4 bg-gray-50 rounded-lg px-4 py-2 border border-gray-100 min-w-[280px]">
                            <div className="flex flex-col items-center gap-1 w-12">
                                <div className="relative w-8 h-8">
                                    <Image src={match.homeLogo} alt={match.homeTeam} fill className="object-contain rounded-full" />
                                </div>
                                <span className="text-[10px] font-semibold text-gray-600 text-center leading-tight">{match.homeTeam}</span>
                            </div>

                            <div className="flex flex-col items-center gap-1">
                                <span className="text-xs text-gray-400 font-medium uppercase">{match.league}</span>
                                <div className="text-2xl font-bold font-mono flex items-center gap-2">
                                    <span>{match.homeScore}</span>
                                    <span className="text-gray-300">:</span>
                                    <span>{match.awayScore}</span>
                                </div>
                                {match.isLive ? (
                                    <span className="text-[10px] font-bold text-brand-red animate-pulse">LIVE {match.status}</span>
                                ) : (
                                    <span className="text-[10px] font-medium text-gray-500">{match.status}</span>
                                )}
                            </div>

                            <div className="flex flex-col items-center gap-1 w-12">
                                <div className="relative w-8 h-8">
                                    <Image src={match.awayLogo} alt={match.awayTeam} fill className="object-contain rounded-full" />
                                </div>
                                <span className="text-[10px] font-semibold text-gray-600 text-center leading-tight">{match.awayTeam}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
