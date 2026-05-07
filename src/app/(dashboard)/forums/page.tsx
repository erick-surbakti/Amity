
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

const SAFE_SPACES = [
  { id: "anxiety", name: "Anxiety", description: "A gentle harbor for overactive thoughts.", tone: "Calming", members: 1240, color: "from-blue-500/20" },
  { id: "burnout", name: "Burnout", description: "Rest and recover without the guilt.", tone: "Restful", members: 890, color: "from-orange-500/20" },
  { id: "loneliness", name: "Loneliness", description: "You are here, and so are we.", tone: "Intimate", members: 2100, color: "from-indigo-500/20" },
  { id: "grief", name: "Grief", description: "A space to hold the weight of loss.", tone: "Tender", members: 450, color: "from-slate-500/20" },
  { id: "adhd", name: "ADHD", description: "Low-stimulus focus and shared focus.", tone: "Soft", members: 3200, color: "from-emerald-500/20" },
  { id: "trauma-recovery", name: "Trauma Recovery", description: "Safe steps toward healing.", tone: "Protected", members: 670, color: "from-rose-500/20" },
];

export default function SpacesDiscoveryPage() {
  const [search, setSearch] = useState("");

  const filteredSpaces = SAFE_SPACES.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Safe Spaces</h1>
          <p className="text-muted-foreground italic mt-1">Select a harbor that resonates with your current soul state.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search spaces..." 
            className="pl-10 bg-background/50 border-white/10 rounded-full h-11 focus:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSpaces.map((space) => (
          <Link key={space.id} href={`/forums/${space.id}`}>
            <Card className={`group relative h-full overflow-hidden glass border-white/5 transition-all duration-500 hover:border-primary/40 hover:-translate-y-1 cursor-pointer`}>
              {/* Ambient Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${space.color} to-transparent opacity-20 group-hover:opacity-40 transition-opacity`} />
              
              <CardHeader className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-primary">
                    <Sparkles className="w-3 h-3" />
                    {space.tone}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                    <Users className="w-3 h-3" />
                    {space.members} souls
                  </div>
                </div>
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{space.name}</h3>
              </CardHeader>
              
              <CardContent className="p-8 pt-0 relative z-10 space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  &ldquo;{space.description}&rdquo;
                </p>
                
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Vibe Guard Protected
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
