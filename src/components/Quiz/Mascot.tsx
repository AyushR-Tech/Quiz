const Mascot = () => {
  return (
    <div className="fixed bottom-8 left-8 animate-float hidden md:block">
      <div className="relative">
        {/* Speech bubble */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-card px-4 py-2 rounded-full shadow-lg border border-border whitespace-nowrap">
          <span className="font-medium text-sm">Best of Luck!</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-card border-r border-b border-border rotate-45" />
        </div>
        
        {/* Cat paw */}
        <svg
          viewBox="0 0 80 100"
          className="w-20 h-24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main paw pad */}
          <ellipse cx="40" cy="70" rx="28" ry="24" fill="hsl(350 60% 85%)" />
          
          {/* Toe beans */}
          <ellipse cx="22" cy="45" rx="12" ry="14" fill="hsl(350 60% 85%)" />
          <ellipse cx="40" cy="38" rx="10" ry="12" fill="hsl(350 60% 85%)" />
          <ellipse cx="58" cy="45" rx="12" ry="14" fill="hsl(350 60% 85%)" />
          
          {/* Inner paw details */}
          <ellipse cx="40" cy="72" rx="14" ry="12" fill="hsl(350 50% 75%)" />
          <ellipse cx="22" cy="47" rx="6" ry="7" fill="hsl(350 50% 75%)" />
          <ellipse cx="40" cy="40" rx="5" ry="6" fill="hsl(350 50% 75%)" />
          <ellipse cx="58" cy="47" rx="6" ry="7" fill="hsl(350 50% 75%)" />
        </svg>
      </div>
    </div>
  );
};

export default Mascot;
