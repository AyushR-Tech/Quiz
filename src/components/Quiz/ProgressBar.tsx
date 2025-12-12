import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  return (
    <div className="flex items-center justify-center gap-2 w-full max-w-xs mx-auto mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-1 flex-1 rounded-full transition-all duration-500 ease-out",
            index < currentStep
              ? "bg-foreground"
              : index === currentStep
              ? "bg-foreground/60"
              : "bg-border"
          )}
          style={{
            transitionDelay: `${index * 50}ms`,
          }}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
