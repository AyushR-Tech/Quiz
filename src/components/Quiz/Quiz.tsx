import { useState, useCallback } from "react";
import { quizQuestions } from "./QuizData";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import NavigationButtons from "./NavigationButtons";
import Mascot from "./Mascot";
import ResultsScreen from "./ResultsScreen";

type QuizState = "quiz" | "results";

const Quiz = () => {
  const [quizState, setQuizState] = useState<QuizState>("quiz");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(quizQuestions.length).fill(null)
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<"in" | "out">("in");

  const handleSelectAnswer = useCallback((index: number) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = index;
      return newAnswers;
    });
  }, [currentQuestion]);

  const animateTransition = useCallback((direction: "next" | "prev", callback: () => void) => {
    setAnimationDirection("out");
    setIsAnimating(true);
    
    setTimeout(() => {
      callback();
      setAnimationDirection("in");
      setTimeout(() => {
        setIsAnimating(false);
      }, 400);
    }, 300);
  }, []);

  const handleNext = useCallback(() => {
    if (currentQuestion < quizQuestions.length - 1) {
      animateTransition("next", () => {
        setCurrentQuestion((prev) => prev + 1);
      });
    }
  }, [currentQuestion, animateTransition]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      animateTransition("prev", () => {
        setCurrentQuestion((prev) => prev - 1);
      });
    }
  }, [currentQuestion, animateTransition]);

  const handleSubmit = useCallback(() => {
    setQuizState("results");
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers(new Array(quizQuestions.length).fill(null));
    setQuizState("quiz");
  }, []);

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      if (answer === quizQuestions[index].correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  if (quizState === "results") {
    return (
      <ResultsScreen
        score={calculateScore()}
        totalQuestions={quizQuestions.length}
        onRestart={handleRestart}
      />
    );
  }

  const currentQuestionData = quizQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;
  const canGoNext = answers[currentQuestion] !== null;

  return (
    <div className="min-h-screen quiz-bg flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif italic text-4xl md:text-5xl text-quiz-title mb-3 opacity-0 animate-fade-in-up">
            Test Your Knowledge
          </h1>
          <p 
            className="text-muted-foreground opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            Answer all questions to see your results
          </p>
        </div>

        {/* Progress bar */}
        <ProgressBar
          currentStep={currentQuestion + 1}
          totalSteps={quizQuestions.length}
        />

        {/* Question card */}
        <QuestionCard
          question={currentQuestionData}
          selectedAnswer={answers[currentQuestion]}
          onSelectAnswer={handleSelectAnswer}
          isAnimating={isAnimating}
          animationDirection={animationDirection}
        />

        {/* Navigation */}
        <NavigationButtons
          currentQuestion={currentQuestion}
          totalQuestions={quizQuestions.length}
          canGoNext={canGoNext}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isLastQuestion={isLastQuestion}
        />
      </div>

      {/* Mascot */}
      <Mascot />
    </div>
  );
};

export default Quiz;
