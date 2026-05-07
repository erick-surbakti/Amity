"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Heart, Sparkles, MessageCircle, Share2, Loader2 } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export default function GlimmersPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [glimmers, setGlimmers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = ["All", "Nature", "Pets", "Food", "Self-Care", "Art"];
  const { user } = useAuth();
  const supabase = createClient();

  useEffect(() => {
    async function fetchGlimmers() {
      const { data, error } = await supabase
        .from('glimmers')
        .select(`
          *,
          profiles:user_id (
            username
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching glimmers:', error);
      } else {
        setGlimmers(data || []);
      }
      setIsLoading(false);
    }

    fetchGlimmers();
  }, [supabase]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Glimmer Wall</h1>
          <p className="text-muted-foreground">Find and share small moments of light in the everyday.</p>
        </div>
        <Button className="rounded-full bg-primary text-primary-foreground h-11 px-8 gap-2 shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5" />
          Share a Glimmer
        </Button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <Button 
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-6 transition-all ${
              activeCategory === cat ? "bg-primary text-primary-foreground" : "glass border-white/10"
            }`}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : glimmers.length > 0 ? (
          glimmers.map((glimmer) => (
            <GlimmerCard 
              key={glimmer.id}
              author={glimmer.profiles?.username || "Anonymous"} 
              image={glimmer.image_url} 
              caption={glimmer.caption}
              warmth={glimmer.warmth || 0}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20 glass rounded-[2.5rem] border border-dashed border-white/10">
            <p className="text-muted-foreground italic">No glimmers shared yet. Be the first to share some light.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function GlimmerCard({ author, image, caption, warmth }: { author: string, image: string, caption: string, warmth: number }) {
  const [liked, setLiked] = useState(false);

  return (
    <Card className="glass border-white/5 overflow-hidden group rounded-3xl flex flex-col h-full">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img src={image} alt="Glimmer" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-4 left-4">
          <div className="glass-card px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold text-white shadow-xl">
            <div className="w-4 h-4 rounded-full bg-primary/80 animate-pulse" />
            {author}
          </div>
        </div>
        <div className="absolute bottom-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <Button 
            size="icon" 
            variant="ghost" 
            className={`rounded-full glass h-10 w-10 ${liked ? "text-red-400" : "text-white"}`}
            onClick={() => setLiked(!liked)}
          >
            <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full glass h-10 w-10 text-white">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-sm text-foreground/90 leading-relaxed mb-6 italic">
          &ldquo;{caption}&rdquo;
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-primary" />
              {warmth + (liked ? 1 : 0)} warmth
            </span>
          </div>
          <button className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
            Send Warmth <Heart className="w-3 h-3 fill-current" />
          </button>
        </div>
      </div>
    </Card>
  );
}