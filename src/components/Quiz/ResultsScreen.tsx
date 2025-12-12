import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ResultsScreen = ({ score, totalQuestions, onRestart }: ResultsScreenProps) => {
  const [displayScore, setDisplayScore] = useState(0);
  const percentage = Math.round((score / totalQuestions) * 100);

  useEffect(() => {
    // Animate the score counting up
    const duration = 1500;
    const steps = 60;
    const increment = percentage / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= percentage) {
        setDisplayScore(percentage);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [percentage]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center">
        {/* Keep Learning text */}
        <p className="text-muted-foreground text-sm mb-4 opacity-0 animate-fade-in-up">
          Keep Learning!
        </p>

        {/* Title */}
        <h2 
          className="font-serif italic text-3xl md:text-4xl text-quiz-title mb-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
        >
          Your Final score is
        </h2>

        {/* Score */}
        <div 
          className="relative mb-12 opacity-0 animate-count-up"
          style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
        >
          <span className="font-serif text-8xl md:text-9xl font-semibold text-quiz-title">
            {displayScore}
          </span>
          <span className="font-serif text-4xl md:text-5xl text-quiz-title align-top ml-1">
            %
          </span>
        </div>

        {/* Restart button */}
        <button
          onClick={onRestart}
          className={cn(
            "px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium",
            "transition-all duration-300 ease-out",
            "hover:bg-primary/90 hover:scale-105",
            "opacity-0 animate-fade-in-up"
          )}
          style={{ animationDelay: "1s", animationFillMode: "forwards" }}
        >
          Start Again
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
