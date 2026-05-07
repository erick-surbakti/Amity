"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SoulAvatar } from "@/components/soul-avatar";
import { Heart, MessageCircle, MapPin, Sparkles, UserPlus } from "lucide-react";

export default function MatchesPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Soul Connections</h1>
        <p className="text-muted-foreground">People who share your vibe and common ground.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MatchCard 
          name="AuraBlue" 
          mood="calm" 
          distance="2 miles away" 
          commonGround={["Meditation", "Gardening", "Safe Spaces"]} 
          description="I'm here to listen and share quiet moments. I love growing herbs and morning yoga."
        />
        <MatchCard 
          name="KindSpirit" 
          mood="joy" 
          distance="5 miles away" 
          commonGround={["Art Therapy", "Journaling", "Pets"]} 
          description="Looking for creative souls! I believe in the power of color to heal our minds."
        />
        <MatchCard 
          name="QuietStorm" 
          mood="neutral" 
          distance="Nearby" 
          commonGround={["Reading", "Philosophy", "Tea"]} 
          description="Introverted soul looking for meaningful conversation over a virtual cup of tea."
        />
        <MatchCard 
          name="BraveHeart" 
          mood="calm" 
          distance="10 miles away" 
          commonGround={["Mental Health Advocacy", "Writing", "Nature"]} 
          description="Advocating for self-love every single day. Let's support each other's growth."
        />
      </div>
    </div>
  );
}

function MatchCard({ name, mood, distance, commonGround, description }: { 
  name: string, mood: any, distance: string, commonGround: string[], description: string 
}) {
  return (
    <Card className="glass border-white/5 overflow-hidden group p-6 hover:border-primary/30 transition-all">
      <div className="flex items-start gap-6">
        <div className="relative">
          <SoulAvatar mood={mood} size="lg" />
          <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full border-2 border-background" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">{name}</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {distance}
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="rounded-full glass h-9 w-9 text-primary">
                <MessageCircle className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full glass h-9 w-9 text-primary">
                <UserPlus className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed italic">
            &ldquo;{description}&rdquo;
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {commonGround.map(tag => (
              <div key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/10 text-[10px] font-bold text-primary">
                <Sparkles className="w-3 h-3" />
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}