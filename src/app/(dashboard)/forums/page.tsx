
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, Sparkles, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SpacesDiscoveryPage() {
  const [search, setSearch] = useState("");
  const [spaces, setSpaces] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSpaces() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('safe_spaces')
        .select('*');
      
      if (error) {
        console.error('Error fetching spaces:', error);
      } else {
        setSpaces(data || []);
      }
      setIsLoading(false);
    }

    fetchSpaces();
  }, []);

  const filteredSpaces = spaces.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    (s.description?.toLowerCase().includes(search.toLowerCase()) ?? false)
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
        {isLoading ? (
          <div className="col-span-full flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : filteredSpaces.map((space) => (
          <Link key={space.id} href={`/forums/${space.id}`}>
            <Card className={`group relative h-full overflow-hidden glass border-white/5 transition-all duration-500 hover:border-primary/40 hover:-translate-y-1 cursor-pointer`}>
              {/* Ambient Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${space.ambient_color || 'from-primary/20'} to-transparent opacity-20 group-hover:opacity-40 transition-opacity`} />
              
              <CardHeader className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-primary">
                    <Sparkles className="w-3 h-3" />
                    {space.tone}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                    <Users className="w-3 h-3" />
                    {space.member_count || 0} souls
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
