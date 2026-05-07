"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { SoulAvatar } from "@/components/soul-avatar";
import { MessageSquare, Heart, Shield, Plus, Sparkles, Loader2, AlertTriangle } from "lucide-react";
import { realtimeVibeGuard, type RealtimeVibeGuardOutput } from "@/ai/flows/realtime-vibe-guard-flow";

export default function ForumsPage() {
  const [isPosting, setIsPosting] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [vibeGuardResult, setVibeGuardResult] = useState<RealtimeVibeGuardOutput | null>(null);

  const handlePost = async () => {
    setIsAnalyzing(true);
    try {
      const result = await realtimeVibeGuard({ content: newPostContent });
      setVibeGuardResult(result);
      setIsAnalyzing(false);
      
      if (result.moderationStatus === 'Safe') {
        // Success logic here
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
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Safe Forums</h1>
          <p className="text-muted-foreground">Community-driven support, AI-moderated for peace of mind.</p>
        </div>
        <Button onClick={() => setIsPosting(true)} className="rounded-full bg-primary text-primary-foreground gap-2">
          <Plus className="w-4 h-4" />
          Start Topic
        </Button>
      </div>

      {isPosting && (
        <Card className="glass-card border-primary/20 p-6 animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-lg font-semibold mb-4">Share your thoughts</h3>
          <Textarea 
            placeholder="What's on your mind? (AI Vibe Guard will moderate in real-time)" 
            className="min-h-[120px] bg-background/50 border-white/10 mb-4 resize-none"
            value={newPostContent}
            onChange={(e) => {
              setNewPostContent(e.target.value);
              setVibeGuardResult(null);
            }}
          />
          
          {vibeGuardResult && (
            <div className={`p-4 rounded-xl mb-4 flex items-start gap-3 text-sm ${
              vibeGuardResult.moderationStatus === 'Safe' ? 'bg-emerald-400/10 text-emerald-400' :
              vibeGuardResult.moderationStatus === 'Warning' ? 'bg-amber-400/10 text-amber-400' :
              'bg-destructive/10 text-destructive'
            }`}>
              {vibeGuardResult.moderationStatus === 'Safe' ? <Sparkles className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
              <div>
                <p className="font-bold">{vibeGuardResult.moderationStatus} Status</p>
                <p>{vibeGuardResult.reason}</p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsPosting(false)}>Cancel</Button>
            <Button 
              onClick={handlePost} 
              disabled={isAnalyzing || newPostContent.length < 5 || (vibeGuardResult && vibeGuardResult.moderationStatus === 'Block')}
              className="bg-primary text-primary-foreground"
            >
              {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Post Discussion"}
            </Button>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        <ForumPost 
          author="SereneCloud" 
          mood="calm" 
          content="I found a really beautiful park today where the birds were so loud it drowned out all my thoughts. It was the first time in weeks I felt truly quiet."
          time="4h ago"
          warmth={42}
          replies={8}
          tags={["Healing", "Nature"]}
        />
        <ForumPost 
          author="SeekingLight" 
          mood="anxious" 
          content="Dealing with a lot of pressure at work lately. Does anyone have small grounding techniques they use during meetings?"
          time="6h ago"
          warmth={128}
          replies={32}
          tags={["Advice", "Grounding"]}
          sensitive
        />
        <ForumPost 
          author="GratefulHeart" 
          mood="joy" 
          content="Just wanted to share that I finished my first painting in a year! It feels so good to create again without judging the outcome."
          time="1d ago"
          warmth={215}
          replies={15}
          tags={["Art", "Success"]}
        />
      </div>
    </div>
  );
}

function ForumPost({ author, mood, content, time, warmth, replies, tags, sensitive }: { 
  author: string, mood: any, content: string, time: string, warmth: number, replies: number, tags: string[], sensitive?: boolean 
}) {
  const [isBlurred, setIsBlurred] = useState(sensitive);

  return (
    <Card className="glass border-white/5 overflow-hidden group">
      <CardHeader className="p-5 pb-2 flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3">
          <SoulAvatar mood={mood} size="sm" />
          <div>
            <span className="text-sm font-semibold">{author}</span>
            <span className="text-xs text-muted-foreground ml-2">{time}</span>
          </div>
        </div>
        <div className="flex gap-2">
          {tags.map(t => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground border border-white/5">
              {t}
            </span>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-3">
        <div className={`relative ${isBlurred ? "cursor-pointer" : ""}`} onClick={() => setIsBlurred(false)}>
          <p className={`text-foreground leading-relaxed transition-all duration-500 ${isBlurred ? "blur-md select-none" : ""}`}>
            {content}
          </p>
          {isBlurred && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 text-xs font-medium text-primary shadow-2xl">
                <Shield className="w-3 h-3" />
                Sensitive Content - Click to reveal
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
            <Heart className="w-4 h-4" />
            <span>{warmth} Warmth</span>
          </button>
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
            <MessageSquare className="w-4 h-4" />
            <span>{replies} Replies</span>
          </button>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-400">
          <Shield className="w-3 h-3" />
          <span>Vibe Guard Safe</span>
        </div>
      </CardFooter>
    </Card>
  );
}