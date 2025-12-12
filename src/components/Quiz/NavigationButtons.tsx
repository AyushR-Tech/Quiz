import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationButtonsProps {
  currentQuestion: number;
  totalQuestions: number;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isLastQuestion: boolean;
}

const NavigationButtons = ({
  currentQuestion,
  totalQuestions,
  canGoNext,
  onPrevious,
  onNext,
  onSubmit,
  isLastQuestion,
}: NavigationButtonsProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={onPrevious}
        disabled={currentQuestion === 0}
        className={cn(
          "w-10 h-10 rounded-lg border-2 border-border flex items-center justify-center",
          "transition-all duration-200 ease-out",
          currentQuestion === 0
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-secondary hover:border-primary hover:-translate-x-0.5"
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {isLastQuestion ? (
        <button
          onClick={onSubmit}
          disabled={!canGoNext}
          className={cn(
            "px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium",
            "transition-all duration-200 ease-out",
            canGoNext
              ? "hover:bg-primary/90 hover:scale-105 animate-pulse-glow"
              : "opacity-50 cursor-not-allowed"
          )}
        >
          Submit
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            "transition-all duration-200 ease-out",
            canGoNext
              ? "bg-foreground text-background hover:translate-x-0.5"
              : "border-2 border-border opacity-40 cursor-not-allowed"
          )}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
