"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SoulAvatarProps {
  mood?: 'calm' | 'anxious' | 'sad' | 'joy' | 'neutral';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function SoulAvatar({ mood = 'neutral', size = 'md', className }: SoulAvatarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-24 h-24",
    xl: "w-48 h-48"
  };

  const moodColors = {
    calm: "from-blue-400 to-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.4)]",
    anxious: "from-orange-400 to-yellow-200 shadow-[0_0_15px_rgba(251,191,36,0.4)]",
    sad: "from-indigo-600 to-blue-800 shadow-[0_0_15px_rgba(67,56,202,0.4)]",
    joy: "from-pink-400 to-orange-300 shadow-[0_0_15px_rgba(244,114,182,0.4)]",
    neutral: "from-sky-400 to-indigo-400 shadow-[0_0_15px_rgba(167,217,255,0.4)]"
  };

  if (!mounted) return <div className={cn("rounded-full bg-muted animate-pulse", sizeClasses[size], className)} />;

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Outer Glow */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full blur-xl opacity-50 animate-pulse bg-gradient-to-tr",
          moodColors[mood]
        )} 
      />
      
      {/* Morphing Core */}
      <div 
        className={cn(
          "relative w-full h-full bg-gradient-to-tr animate-morph",
          moodColors[mood]
        )} 
      />
      
      {/* Particles/Inner Detail (SVG) */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full pointer-events-none">
        <svg className="w-full h-full opacity-30 mix-blend-overlay" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" fill="white" className="animate-float" style={{ animationDuration: '4s' }} />
          <circle cx="30" cy="40" r="10" fill="white" className="animate-float" style={{ animationDuration: '3s' }} />
          <circle cx="70" cy="60" r="15" fill="white" className="animate-float" style={{ animationDuration: '5s' }} />
        </svg>
      </div>
    </div>
  );
}