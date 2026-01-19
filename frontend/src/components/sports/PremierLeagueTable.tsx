'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Standing {
    position: number;
    teamName: string;
    teamLogo: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
}

export function PremierLeagueTable() {
    const [standings, setStandings] = useState<Standing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStandings = async () => {
            try {
                const response = await fetch('/api/standings');
                if (!response.ok) throw new Error('Failed to fetch standings');
                const data = await response.json();
                setStandings(data.slice(0, 10)); // Top 10 teams
                setError(null);
            } catch (err) {
                setError('Unable to load standings');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStandings();
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4 text-brand-black">Premier League Standings</h2>
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-red"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4 text-brand-black">Premier League Standings</h2>
                <p className="text-gray-500 text-center py-4">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-brand-black text-white px-6 py-3">
                <h2 className="text-lg font-bold">Premier League Standings</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Pos
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Team
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                P
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                                W
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                                D
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                                L
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                GD
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Pts
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {standings.map((team) => (
                            <tr
                                key={team.position}
                                className={`hover:bg-gray-50 transition-colors ${team.position <= 4 ? 'bg-green-50/30' :
                                        team.position === 5 ? 'bg-orange-50/30' : ''
                                    }`}
                            >
                                <td className="px-4 py-3 text-sm font-bold text-gray-900">
                                    {team.position}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        {team.teamLogo && (
                                            <div className="relative w-6 h-6 flex-shrink-0">
                                                <Image
                                                    src={team.teamLogo}
                                                    alt={team.teamName}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        )}
                                        <span className="text-sm font-semibold text-gray-900">
                                            {team.teamName}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-center text-sm text-gray-700">
                                    {team.played}
                                </td>
                                <td className="px-4 py-3 text-center text-sm text-gray-700 hidden md:table-cell">
                                    {team.won}
                                </td>
                                <td className="px-4 py-3 text-center text-sm text-gray-700 hidden md:table-cell">
                                    {team.drawn}
                                </td>
                                <td className="px-4 py-3 text-center text-sm text-gray-700 hidden md:table-cell">
                                    {team.lost}
                                </td>
                                <td className="px-4 py-3 text-center text-sm font-medium text-gray-900">
                                    {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                                </td>
                                <td className="px-4 py-3 text-center text-sm font-bold text-brand-red">
                                    {team.points}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t text-xs text-gray-500">
                <div className="flex gap-4 flex-wrap">
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-50 border border-green-200"></span>
                        Champions League
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-orange-50 border border-orange-200"></span>
                        Europa League
                    </span>
                </div>
            </div>
        </div>
    );
}
