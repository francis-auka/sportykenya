import { NextResponse } from 'next/server';

// In-memory cache
let cache: {
    data: any;
    timestamp: number;
} | null = null;

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function GET() {
    try {
        // Check cache
        if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
            return NextResponse.json(cache.data);
        }

        const apiKey = process.env.API_FOOTBALL_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'API key not configured' },
                { status: 500 }
            );
        }

        // Fetch Premier League standings
        const response = await fetch(
            'https://v3.football.api-sports.io/standings?league=39&season=2024',
            {
                headers: {
                    'x-apisports-key': apiKey,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`API-Football responded with status ${response.status}`);
        }

        const data = await response.json();

        // Extract and format standings
        const standings = data.response?.[0]?.league?.standings?.[0]?.map((team: any) => ({
            position: team.rank || 0,
            teamName: team.team?.name || 'Unknown',
            teamLogo: team.team?.logo || '',
            played: team.all?.played || 0,
            won: team.all?.win || 0,
            drawn: team.all?.draw || 0,
            lost: team.all?.lose || 0,
            goalsFor: team.all?.goals?.for || 0,
            goalsAgainst: team.all?.goals?.against || 0,
            goalDifference: team.goalsDiff || 0,
            points: team.points || 0,
        })) || [];

        // Update cache
        cache = {
            data: standings,
            timestamp: Date.now(),
        };

        return NextResponse.json(standings);
    } catch (error) {
        console.error('Error fetching standings:', error);
        return NextResponse.json(
            { error: 'Failed to fetch standings' },
            { status: 500 }
        );
    }
}
