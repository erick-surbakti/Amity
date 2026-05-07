"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Heart, Sparkles, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";

export default function GlimmersPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Nature", "Pets", "Food", "Self-Care", "Art"];

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
        <GlimmerCard 
          author="SunnyVibe" 
          image="https://picsum.photos/seed/amity-glim1/600/800" 
          caption="The way the light hits my plants every morning makes me feel like everything is going to be okay."
          warmth={342}
        />
        <GlimmerCard 
          author="ForestWalker" 
          image="https://picsum.photos/seed/amity-glim3/600/800" 
          caption="Found this tiny mushroom today. Nature is so patient with its beauty."
          warmth={156}
        />
        <GlimmerCard 
          author="CoffeeLover" 
          image="https://picsum.photos/seed/amity-glim4/600/800" 
          caption="Finally perfected my latte art. It's just foam, but it made me smile."
          warmth={89}
        />
        <GlimmerCard 
          author="KindSoul" 
          image="https://picsum.photos/seed/amity-glim5/600/800" 
          caption="Morning ritual: tea and zero notifications."
          warmth={521}
        />
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