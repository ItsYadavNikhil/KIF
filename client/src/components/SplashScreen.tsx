import { useEffect, useState } from "react";
import kifLogo from "@assets/B_1758455614771.png";

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export default function SplashScreen({ onComplete, duration = 2500 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, duration - 500);

    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-background flex items-center justify-center z-50 transition-all duration-500 ${
        fadeOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
      data-testid="splash-screen"
    >
      <div className="flex flex-col items-center space-y-6">
        <div className={`transition-all duration-1000 ${fadeOut ? "scale-110" : "scale-100"}`}>
          <img 
            src={kifLogo} 
            alt="KIF - Knowledge is Free" 
            className="w-48 h-auto"
            data-testid="logo-splash"
          />
        </div>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 bg-primary rounded-full animate-bounce`}
              style={{ animationDelay: `${i * 0.1}s` }}
              data-testid={`loading-dot-${i}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}