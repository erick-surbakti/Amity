
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SoulAvatar } from "@/components/soul-avatar";
import { Heart, Shield, Plus, Sparkles, Loader2, AlertTriangle, ArrowLeft } from "lucide-react";
import { realtimeVibeGuard, type RealtimeVibeGuardOutput } from "@/ai/flows/realtime-vibe-guard-flow";
import Link from "next/link";

export default function SpaceDetailPage() {
  const { spaceId } = useParams();
  const [isPosting, setIsPosting] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [vibeGuardResult, setVibeGuardResult] = useState<RealtimeVibeGuardOutput | null>(null);

  const spaceName = typeof spaceId === 'string' ? spaceId.charAt(0).toUpperCase() + spaceId.slice(1).replace('-', ' ') : 'Safe Space';

  const handlePost = async () => {
    setIsAnalyzing(true);
    try {
      const result = await realtimeVibeGuard({ content: newPostContent });
      setVibeGuardResult(result);
      setIsAnalyzing(false);
      
      if (result.moderationStatus === 'Safe') {
        setTimeout(() => {
          setIsPosting(false);
          setNewPostContent("");
          setVibeGuardResult(null);
        }, 1500);
      }
    } catch (error) {
      setIsAnalyzing(false);
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      <Link href="/forums" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Spaces
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold tracking-tight">{spaceName}</h1>
            <div className="px-3 py-1 rounded-full bg-primary/10 text-[10px] font-bold text-primary uppercase tracking-widest border border-primary/20">
              Safe Space
            </div>
          </div>
          <p className="text-muted-foreground italic">A supportive environment for shared healing and presence.</p>
        </div>
        <Button onClick={() => setIsPosting(true)} className="rounded-full bg-primary text-primary-foreground h-12 px-6 gap-2 shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5" />
          Share Supportively
        </Button>
      </div>

      {isPosting && (
        <Card className="glass-card border-primary/20 p-8 animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-lg font-semibold mb-4">What's on your heart?</h3>
          <Textarea 
            placeholder="Share your experience or offer support. Vibe Guard will ensure this stays a safe harbor." 
            className="min-h-[150px] bg-background/30 border-white/10 mb-6 p-6 text-lg leading-relaxed focus-visible:ring-primary resize-none rounded-2xl"
            value={newPostContent}
            onChange={(e) => {
              setNewPostContent(e.target.value);
              setVibeGuardResult(null);
            }}
          />
          
          {vibeGuardResult && (
            <div className={`p-4 rounded-xl mb-6 flex items-start gap-3 text-sm animate-fade-in ${
              vibeGuardResult.moderationStatus === 'Safe' ? 'bg-emerald-400/10 text-emerald-400' :
              vibeGuardResult.moderationStatus === 'Warning' ? 'bg-amber-400/10 text-amber-400' :
              'bg-destructive/10 text-destructive'
            }`}>
              {vibeGuardResult.moderationStatus === 'Safe' ? <Sparkles className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
              <div>
                <p className="font-bold">{vibeGuardResult.moderationStatus} Tone Detected</p>
                <p>{vibeGuardResult.reason}</p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsPosting(false)} className="rounded-xl">Cancel</Button>
            <Button 
              onClick={handlePost} 
              disabled={isAnalyzing || newPostContent.length < 5 || (vibeGuardResult && vibeGuardResult.moderationStatus === 'Block')}
              className="bg-primary text-primary-foreground rounded-xl h-11 px-8"
            >
              {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Post to Sanctuary"}
            </Button>
          </div>
        </Card>
      )}

      <div className="space-y-6">
        <SafePost 
          author="GentleSoul" 
          mood="calm" 
          content="I finally took a 10-minute walk today without my phone. The silence felt heavy at first, but then it started to feel like a blanket."
          time="2h ago"
          warmth={56}
        />
        <SafePost 
          author="KindSpirit" 
          mood="anxious" 
          content="Does anyone else find that night time is when the thoughts get loudest? I'm trying a new ambient playlist tonight."
          time="4h ago"
          warmth={124}
          sensitive
        />
        <SafePost 
          author="BraveHeart" 
          mood="neutral" 
          content="Just here to say you're doing a good job. Even if the only thing you did today was breathe."
          time="8h ago"
          warmth={289}
        />
      </div>
    </div>
  );
}

function SafePost({ author, mood, content, time, warmth, sensitive }: { 
  author: string, mood: any, content: string, time: string, warmth: number, sensitive?: boolean 
}) {
  const [isBlurred, setIsBlurred] = useState(sensitive);

  return (
    <Card className="glass border-white/5 overflow-hidden group rounded-[2rem] transition-all duration-500 hover:border-primary/20">
      <div className="p-8 flex flex-col md:flex-row gap-6">
        <div className="flex flex-row md:flex-col items-center gap-4">
          <SoulAvatar mood={mood} size="md" />
          <div className="text-center md:mt-2">
            <p className="text-sm font-bold truncate max-w-[100px]">{author}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">{mood}</p>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{time}</span>
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
              <Shield className="w-3 h-3" />
              Vibe Guard Safe
            </div>
          </div>

          <div className={`relative ${isBlurred ? "cursor-pointer" : ""}`} onClick={() => setIsBlurred(false)}>
            <p className={`text-lg leading-relaxed text-foreground/90 transition-all duration-700 ${isBlurred ? "blur-xl select-none opacity-40 scale-[0.98]" : "scale-100"}`}>
              {content}
            </p>
            {isBlurred && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass-card px-6 py-3 rounded-full flex items-center gap-3 text-xs font-bold text-primary shadow-2xl animate-pulse">
                  <Shield className="w-4 h-4" />
                  Potentially Heavy - Tap to reveal
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-white/5">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 group/warmth">
                <div className="p-2 rounded-full bg-primary/10 group-hover/warmth:bg-primary/20 transition-colors">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs font-bold text-muted-foreground group-hover/warmth:text-primary transition-colors">{warmth} Warmth</span>
              </button>
              <button className="flex items-center gap-2 group/reply">
                <span className="text-xs font-bold text-muted-foreground group-hover/reply:text-primary transition-colors">Reply Supportively</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
