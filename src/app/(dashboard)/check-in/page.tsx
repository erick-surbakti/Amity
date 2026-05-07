
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { SoulAvatar } from "@/components/soul-avatar";
import { Check, Sparkles, Heart, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/firebase";

export default function CheckInPage() {
  const [mood, setMood] = useState([50]);
  const [heaviness, setHeaviness] = useState([50]);
  const [reflection, setReflection] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const db = getFirestore();

  const handleCheckIn = async () => {
    if (!user) return;
    setIsSaving(true);
    
    try {
      await addDoc(collection(db, "users", user.uid, "checkins"), {
        moodValue: mood[0],
        heavinessValue: heaviness[0],
        reflection,
        createdAt: serverTimestamp(),
      });
      
      setIsSubmitted(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Failed to save check-in", error);
    } finally {
      setIsSaving(false);
    }
  };

  const getMoodLabel = (val: number) => {
    if (val < 20) return { text: "Heavy", mood: "sad" as const };
    if (val < 40) return { text: "Anxious", mood: "anxious" as const };
    if (val < 60) return { text: "Neutral", mood: "neutral" as const };
    if (val < 80) return { text: "Calm", mood: "calm" as const };
    return { text: "Joyful", mood: "joy" as const };
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 animate-fade-in text-center">
        <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center animate-bounce">
          <Check className="w-12 h-12 text-emerald-500" />
        </div>
        <h2 className="text-4xl font-bold tracking-tight">Soul Logged.</h2>
        <p className="text-muted-foreground italic">Thank you for being honest with yourself today.</p>
      </div>
    );
  }

  const currentMood = getMoodLabel(mood[0]);

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in pb-12">
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-bold tracking-tight">Daily Reflection</h1>
        <p className="text-muted-foreground italic text-lg">How is your soul landing today?</p>
      </div>

      <div className="flex justify-center py-12">
        <SoulAvatar mood={currentMood.mood} size="xl" />
      </div>

      <Card className="glass-card border-none overflow-hidden p-10 space-y-12 rounded-[2.5rem]">
        <div className="space-y-8">
          <div className="flex justify-between items-end">
            <label className="text-sm font-bold uppercase tracking-widest text-primary/70">Emotional Energy</label>
            <span className="text-3xl font-bold text-primary">{currentMood.text}</span>
          </div>
          <Slider 
            value={mood} 
            onValueChange={setMood} 
            max={100} 
            step={1} 
            className="py-4"
          />
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
            <span>Low Energy</span>
            <span>High Energy</span>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex justify-between items-end">
            <label className="text-sm font-bold uppercase tracking-widest text-primary/70">Heart Heaviness</label>
            <span className="text-xl font-semibold">{heaviness[0] > 50 ? "Heavier than usual" : "Lighter today"}</span>
          </div>
          <Slider 
            value={heaviness} 
            onValueChange={setHeaviness} 
            max={100} 
            step={1} 
            className="py-4"
          />
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
            <span>Light</span>
            <span>Heavy</span>
          </div>
        </div>

        <div className="space-y-6">
          <label className="text-sm font-bold uppercase tracking-widest text-primary/70 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Small Reflection (Optional)
          </label>
          <Textarea 
            placeholder="One thing that felt real today..." 
            className="bg-background/30 border-white/10 min-h-[150px] resize-none p-6 text-lg rounded-2xl focus-visible:ring-primary"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
          />
        </div>

        <Button 
          onClick={handleCheckIn}
          disabled={isSaving}
          className="w-full h-16 rounded-2xl text-xl bg-primary hover:bg-primary/90 text-primary-foreground gap-3 transition-all hover:scale-[1.01] shadow-xl shadow-primary/20"
        >
          {isSaving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Heart className="w-6 h-6 fill-current" />}
          Log Reflection
        </Button>
      </Card>
    </div>
  );
}
