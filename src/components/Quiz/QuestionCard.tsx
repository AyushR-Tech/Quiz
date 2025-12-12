import { cn } from "@/lib/utils";
import { Question } from "./QuizData";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  isAnimating: boolean;
  animationDirection: "in" | "out";
}

const QuestionCard = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  isAnimating,
  animationDirection,
}: QuestionCardProps) => {
  return (
    <div
      className={cn(
        "quiz-card p-6 w-full max-w-lg mx-auto shadow-xl",
        isAnimating && animationDirection === "in" && "animate-slide-in",
        isAnimating && animationDirection === "out" && "animate-slide-out"
      )}
    >
      {/* Question Header */}
      <div className="question-header rounded-lg px-6 py-4 mb-6">
        <p className="text-primary-foreground text-center font-medium">
          {question.id}. {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(index)}
            className={cn(
              "quiz-option w-full py-3 px-6 rounded-lg border-2 text-center font-medium",
              "opacity-0 animate-fade-in-up",
              selectedAnswer === index
                ? "selected border-primary bg-primary/10"
                : "border-border bg-card hover:bg-secondary"
            )}
            style={{
              animationDelay: `${(index + 1) * 100}ms`,
              animationFillMode: "forwards",
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
