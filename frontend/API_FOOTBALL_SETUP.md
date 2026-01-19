# API-Football Setup

## Environment Variable Configuration

To enable live Premier League scores and standings, you need to add your API-Football key to the environment variables.

### Local Development

Create a `.env.local` file in the `frontend` directory with:

```
API_FOOTBALL_KEY=4e67ccd12675a554144d035a2d82ec28
```

**IMPORTANT**: This file is already in `.gitignore` and will NOT be committed to git.

### Production (Vercel)

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add a new variable:
   - **Name**: `API_FOOTBALL_KEY`
   - **Value**: `4e67ccd12675a554144d035a2d82ec28`
   - **Environment**: Production, Preview, Development
4. Redeploy your application

## Features Implemented

### Live Scores
- Location: Home page (after Scoreboard)
- Auto-refreshes every 60 seconds
- Shows live Premier League matches
- LIVE indicator for ongoing matches
- Displays team logos, scores, and match status

### Premier League Table
- Location: Football category page (`/football`)
- Shows top 10 teams
- Updates hourly
- Displays position, team, matches played, goal difference, and points
- Visual indicators for Champions League and Europa League positions

## API Usage

- **Free Tier Limit**: 100 requests/day
- **Expected Usage**: 30-50 requests/day with caching
- **Live Scores Cache**: 60 seconds
- **Standings Cache**: 1 hour

## Testing

After adding the environment variable, restart your development server:

```bash
npm run dev
```

Then visit:
- Home page to see Live Scores
- `/football` category to see Premier League Table
