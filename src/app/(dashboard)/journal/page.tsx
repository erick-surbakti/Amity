"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, History, NotebookPen, Loader2, Heart, Shield } from "lucide-react";

export default function JournalPage() {
  const [entry, setEntry] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reflection, setReflection] = useState<string | null>(null);

  const handleReflect = () => {
    setIsAnalyzing(true);
    // Simulate AI Reflection
    setTimeout(() => {
      setReflection("It sounds like you're carrying a lot of responsibility right now. Remember that your worth isn't tied to how much you 'fix' today. You're allowed to just be.");
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/10">
            <NotebookPen className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Private Journal</h1>
            <p className="text-muted-foreground">Your words are encrypted and seen only by you.</p>
          </div>
        </div>
        <Button variant="outline" className="rounded-full glass gap-2 border-white/5">
          <History className="w-4 h-4" />
          Past Entries
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card border-none p-0 overflow-hidden">
            <Textarea 
              placeholder="Start writing... don't worry about grammar or sense." 
              className="min-h-[400px] bg-background/30 border-none p-8 text-lg leading-relaxed focus-visible:ring-0 resize-none"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
            <div className="p-4 bg-background/50 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                <Shield className="w-3 h-3" />
                End-to-End Encrypted Space
              </div>
              <Button 
                onClick={handleReflect}
                disabled={entry.length < 20 || isAnalyzing}
                className="bg-primary text-primary-foreground gap-2 rounded-xl"
              >
                {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                AI Reflection
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary/70">AI Reflection</h3>
            <Card className="glass-card border-none min-h-[200px] flex items-center justify-center p-6 text-center italic relative overflow-hidden">
              {reflection ? (
                <div className="animate-fade-in space-y-4">
                  <p className="text-foreground/80 leading-relaxed">&ldquo;{reflection}&rdquo;</p>
                  <div className="flex justify-center pt-2">
                    <Heart className="w-4 h-4 text-primary fill-current opacity-40" />
                  </div>
                </div>
              ) : (
                <div className="text-muted-foreground/40 text-sm">
                  <Sparkles className="w-8 h-8 mx-auto mb-4 opacity-20" />
                  <p>Write at least 20 words for a gentle AI reflection.</p>
                </div>
              )}
            </Card>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary/70">Mood Patterns</h3>
            <Card className="glass-card border-none p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Consistency</span>
                  <span className="text-primary font-bold">4 Day Streak</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[60%]" />
                </div>
                <p className="text-[10px] text-muted-foreground italic">You typically feel more energized in the evenings after journaling.</p>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
