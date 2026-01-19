import { BreakingNews } from "@/components/home/BreakingNews";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsGrid } from "@/components/home/NewsGrid";
import { Scoreboard } from "@/components/home/Scoreboard";
import { LiveScores } from "@/components/sports/LiveScores";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <BreakingNews />
      <HeroSection />
      <Scoreboard />
      <LiveScores />
      <NewsGrid />
    </div>
  );
}
