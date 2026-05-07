"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SoulAvatar } from "@/components/soul-avatar";
import { Sparkles, Heart, MessageCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome & Mood Check-in */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass-card border-none overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Sparkles className="w-32 h-32 text-primary" />
          </div>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Good evening, PeacefulSoul.</CardTitle>
            <p className="text-muted-foreground">How is your heart feeling in this moment?</p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4 mt-4">
            {['Calm', 'Anxious', 'Tired', 'Grateful', 'Seeking'].map((mood) => (
              <Button 
                key={mood} 
                variant="outline" 
                className="rounded-full glass hover:bg-primary/20 hover:text-primary border-white/10 px-6"
              >
                {mood}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card border-none flex flex-col items-center justify-center text-center p-6">
          <SoulAvatar mood="calm" size="lg" className="mb-4" />
          <h3 className="text-xl font-semibold">Your Soul Vibe</h3>
          <p className="text-sm text-muted-foreground mb-4">You&apos;ve shared 12 glimmers this week.</p>
          <div className="w-full space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span>Weekly Warmth Meter</span>
              <span className="text-primary">84%</span>
            </div>
            <Progress value={84} className="h-2 bg-muted-foreground/10" />
          </div>
        </Card>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Forum Previews */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              Safe Discussions
            </h2>
            <Link href="/forums" className="text-xs text-primary hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-4">
            <ForumPreviewCard 
              category="Healing" 
              title="Coping with seasonal changes" 
              replies={24} 
              lastActive="2m ago" 
            />
            <ForumPreviewCard 
              category="Gratitude" 
              title="Small wins from today" 
              replies={156} 
              lastActive="5m ago" 
            />
          </div>
        </section>

        {/* Warm Activity / Glimmers */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Recent Glimmers
            </h2>
            <Link href="/glimmer" className="text-xs text-primary hover:underline flex items-center gap-1">
              Share a glimmer <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <GlimmerSmallCard 
              author="AuraBlue" 
              image="https://picsum.photos/seed/amity-glim1/200/200" 
            />
            <GlimmerSmallCard 
              author="KindSpirit" 
              image="https://picsum.photos/seed/amity-glim2/200/200" 
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function ForumPreviewCard({ category, title, replies, lastActive }: { category: string, title: string, replies: number, lastActive: string }) {
  return (
    <Card className="glass border-white/5 hover:border-primary/50 transition-all cursor-pointer group">
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary/70 mb-1 block">{category}</span>
          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">{title}</h4>
          <p className="text-xs text-muted-foreground mt-1">{lastActive}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <MessageCircle className="w-3 h-3" />
            {replies}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function GlimmerSmallCard({ author, image }: { author: string, image: string }) {
  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden glass group cursor-pointer">
      <img src={image} alt="Glimmer" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-[8px] font-bold">
            {author[0]}
          </div>
          <span className="text-[10px] font-medium text-white">{author}</span>
        </div>
      </div>
      <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
        <Heart className="w-3 h-3 text-white fill-white" />
      </div>
    </div>
  );
}