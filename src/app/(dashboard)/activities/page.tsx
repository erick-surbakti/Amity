"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarHeart, Users, MapPin, Clock, ArrowRight, ShieldCheck } from "lucide-react";

export default function ActivitiesPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shared Moments</h1>
          <p className="text-muted-foreground italic">Low-pressure gatherings for quiet connection.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border-white/5 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
          <ShieldCheck className="w-3 h-3" />
          Safe & Vetted
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ActivityCard 
          title="Coffee in Silence"
          description="A group meet-up at a quiet café. Bring a book or your journal. No pressure to talk, just shared presence."
          location="Riverside Arts District"
          time="Sat, 10:00 AM"
          participants={4}
          category="Quiet Meetup"
        />
        <ActivityCard 
          title="Sunset Watch"
          description="Gathering at the hilltop park to watch the sun go down. We'll listen to a curated ambient playlist together."
          location="Skyline Point"
          time="Sun, 5:45 PM"
          participants={12}
          category="Nature"
        />
        <ActivityCard 
          title="Community Painting"
          description="A soft, non-judgmental space to paint how you feel. All supplies provided. Beginners encouraged."
          location="The Healing Studio"
          time="Next Wed, 6:00 PM"
          participants={8}
          category="Art Therapy"
        />
        <ActivityCard 
          title="Forest Walk"
          description="A slow-paced walk through the pine trails. We'll stop frequently to notice small details in nature."
          location="Pine Ridge Trails"
          time="May 14, 9:00 AM"
          participants={6}
          category="Gentle Activity"
        />
      </div>
    </div>
  );
}

function ActivityCard({ title, description, location, time, participants, category }: { 
  title: string, description: string, location: string, time: string, participants: number, category: string 
}) {
  return (
    <Card className="glass border-white/5 overflow-hidden flex flex-col group hover:border-primary/40 transition-all duration-500">
      <CardHeader className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">{category}</span>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Users className="w-3 h-3" />
            {participants} joined
          </div>
        </div>
        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{title}</h3>
      </CardHeader>
      <CardContent className="p-6 pt-0 flex-1 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed italic">
          &ldquo;{description}&rdquo;
        </p>
        <div className="space-y-2 pt-4">
          <div className="flex items-center gap-3 text-xs text-foreground/70">
            <MapPin className="w-4 h-4 text-primary/50" />
            {location}
          </div>
          <div className="flex items-center gap-3 text-xs text-foreground/70">
            <Clock className="w-4 h-4 text-primary/50" />
            {time}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full rounded-xl bg-white/5 hover:bg-primary hover:text-primary-foreground group-hover:shadow-lg transition-all gap-2">
          View Details
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
