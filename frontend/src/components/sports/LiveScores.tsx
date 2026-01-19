'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Match {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    status: string;
    minute: number | null;
    homeLogo: string;
    awayLogo: string;
}

export function LiveScores() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLiveScores = async () => {
        try {
            const response = await fetch('/api/live-scores');
            if (!response.ok) throw new Error('Failed to fetch live scores');
            const data = await response.json();
            setMatches(data);
            setError(null);
        } catch (err) {
            setError('Unable to load live scores');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLiveScores();

        // Refresh every 60 seconds
        const interval = setInterval(fetchLiveScores, 60000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="bg-white border-b border-gray-200 py-8">
                <div className="container mx-auto px-4">
                    <h2 className="text-xl font-bold mb-4 text-brand-black">Live Premier League Scores</h2>
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-red"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white border-b border-gray-200 py-8">
                <div className="container mx-auto px-4">
                    <h2 className="text-xl font-bold mb-4 text-brand-black">Live Premier League Scores</h2>
                    <p className="text-gray-500 text-center py-4">{error}</p>
                </div>
            </div>
        );
    }

    if (matches.length === 0) {
        return (
            <div className="bg-white border-b border-gray-200 py-8">
                <div className="container mx-auto px-4">
                    <h2 className="text-xl font-bold mb-4 text-brand-black">Live Premier League Scores</h2>
                    <p className="text-gray-500 text-center py-4">No live matches at the moment</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border-b border-gray-200 py-8">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-brand-black">Live Premier League Scores</h2>
                    <span className="text-xs text-gray-500">Auto-updates every 60s</span>
                </div>
                <div className="overflow-x-auto">
                    <div className="flex gap-4 min-w-max pb-2">
                        {matches.map((match, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 bg-gray-50 rounded-lg px-6 py-4 border border-gray-100 min-w-[320px] relative"
                            >
                                {/* LIVE Indicator */}
                                {(match.status === '1H' || match.status === '2H' || match.status === 'HT') && (
                                    <div className="absolute top-2 right-2">
                                        <span className="text-[10px] font-bold text-white bg-brand-red px-2 py-1 rounded-full animate-pulse">
                                            LIVE
                                        </span>
                                    </div>
                                )}

                                {/* Home Team */}
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    {match.homeLogo && (
                                        <div className="relative w-10 h-10">
                                            <Image
                                                src={match.homeLogo}
                                                alt={match.homeTeam}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                    <span className="text-xs font-semibold text-gray-700 text-center leading-tight">
                                        {match.homeTeam}
                                    </span>
                                </div>

                                {/* Score */}
                                <div className="flex flex-col items-center gap-1 min-w-[80px]">
                                    <div className="text-3xl font-bold font-mono flex items-center gap-3">
                                        <span className={match.homeScore > match.awayScore ? 'text-brand-red' : ''}>
                                            {match.homeScore}
                                        </span>
                                        <span className="text-gray-300">-</span>
                                        <span className={match.awayScore > match.homeScore ? 'text-brand-red' : ''}>
                                            {match.awayScore}
                                        </span>
                                    </div>
                                    {match.minute && (
                                        <span className="text-[11px] font-medium text-brand-red">
                                            {match.minute}&apos;
                                        </span>
                                    )}
                                    {match.status === 'FT' && (
                                        <span className="text-[11px] font-medium text-gray-500">Full Time</span>
                                    )}
                                    {match.status === 'HT' && (
                                        <span className="text-[11px] font-medium text-gray-500">Half Time</span>
                                    )}
                                </div>

                                {/* Away Team */}
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    {match.awayLogo && (
                                        <div className="relative w-10 h-10">
                                            <Image
                                                src={match.awayLogo}
                                                alt={match.awayTeam}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                    <span className="text-xs font-semibold text-gray-700 text-center leading-tight">
                                        {match.awayTeam}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
