"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wind, Volume2, VolumeX, Sparkles } from "lucide-react";

export default function QuietRoomPage() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState<"In" | "Hold" | "Out">("In");
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!isBreathing) return;

    let timer: NodeJS.Timeout;
    const cycle = () => {
      setPhase("In");
      timer = setTimeout(() => {
        setPhase("Hold");
        timer = setTimeout(() => {
          setPhase("Out");
          timer = setTimeout(cycle, 4000);
        }, 4000);
      }, 4000);
    };

    cycle();
    return () => clearTimeout(timer);
  }, [isBreathing]);

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center relative animate-fade-in overflow-hidden">
      {/* Ambient backgrounds */}
      <div className={`absolute inset-0 bg-primary/5 transition-opacity duration-1000 ${isBreathing ? "opacity-100" : "opacity-0"}`} />
      
      <div className="text-center z-10 space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Quiet Room</h1>
          <p className="text-muted-foreground italic">A safe pause for your nervous system.</p>
        </div>

        <div className="relative flex items-center justify-center h-80 w-80">
          {/* Breathing Circle */}
          <div 
            className={`absolute rounded-full bg-primary/10 border border-primary/20 transition-all duration-[4000ms] ease-in-out ${
              !isBreathing ? "w-40 h-40 opacity-20" : 
              phase === "In" ? "w-72 h-72 opacity-60 scale-110" :
              phase === "Hold" ? "w-72 h-72 opacity-80 scale-110 blur-md" :
              "w-40 h-40 opacity-30 scale-100"
            }`}
          />
          
          <div className="z-20 flex flex-col items-center gap-4">
            <span className="text-3xl font-light tracking-[0.2em] uppercase transition-all duration-500">
              {isBreathing ? phase : <Wind className="w-12 h-12 text-primary animate-pulse" />}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6 items-center">
          <Button 
            size="lg" 
            variant={isBreathing ? "outline" : "default"}
            onClick={() => setIsBreathing(!isBreathing)}
            className="rounded-full px-12 h-14 text-lg transition-all"
          >
            {isBreathing ? "End Session" : "Begin Breathing"}
          </Button>

          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMuted(!isMuted)}
              className="rounded-full h-12 w-12 glass"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
              Soft Rain Ambient
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 flex items-center gap-2 text-primary/40 text-xs animate-pulse">
        <Sparkles className="w-4 h-4" />
        <span>No notifications. No social pressure. Just air.</span>
      </div>
    </div>
  );
}
