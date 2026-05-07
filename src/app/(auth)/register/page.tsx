"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { ArrowLeft, Loader2, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { onboardingEmpathyGate, type OnboardingEmpathyGateOutput } from '@/ai/flows/onboarding-empathy-gate';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [moodText, setMoodText] = useState("");
  const [aiResult, setAiResult] = useState<OnboardingEmpathyGateOutput | null>(null);
  const router = useRouter();

  const handleNextStep = async () => {
    if (step === 1) {
      setStep(2);
      return;
    }
    
    if (step === 2) {
      setIsLoading(true);
      try {
        const result = await onboardingEmpathyGate({ userEmotionalInput: moodText });
        setAiResult(result);
        setIsLoading(false);
        if (!result.hasHarmfulIntent) {
          // Proceed after a short delay to show analysis
          setTimeout(() => {
            router.push('/dashboard');
          }, 3000);
        }
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative py-12">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="w-full max-w-lg animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <div className="w-6 h-6 rounded-full bg-primary animate-morph" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Join the community</h1>
          <p className="text-muted-foreground text-sm">A thoughtful approach to connecting</p>
        </div>

        <Card className="glass-card border-white/5 overflow-hidden">
          <div className="h-1 bg-muted w-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out" 
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
          
          <CardHeader>
            <CardTitle>
              {step === 1 ? "Basic Details" : "Empathy Gate"}
            </CardTitle>
            <CardDescription>
              {step === 1 
                ? "Start your journey with a few simple steps." 
                : "Tell us a bit about how you're feeling today. Our Empathy Gate helps keep Amity safe for everyone."}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {step === 1 ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Display Name (Anonymous is okay)</Label>
                  <Input 
                    id="username" 
                    placeholder="E.g. PeacefulSoul" 
                    className="bg-background/50 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="bg-background/50 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    className="bg-background/50 border-white/10"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {!aiResult ? (
                  <>
                    <Label htmlFor="mood">How are you arriving at Amity today?</Label>
                    <Textarea 
                      id="mood" 
                      placeholder="I've been feeling a bit overwhelmed lately and I'm looking for a supportive community..." 
                      className="min-h-[150px] bg-background/50 border-white/10 resize-none"
                      value={moodText}
                      onChange={(e) => setMoodText(e.target.value)}
                    />
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/10 text-xs text-primary">
                      <Sparkles className="w-4 h-4 mt-0.5 shrink-0" />
                      <p>Our AI analyzes this to ensure a supportive environment and detect if you might need immediate professional resources.</p>
                    </div>
                  </>
                ) : (
                  <div className="py-8 text-center space-y-4 animate-fade-in">
                    {aiResult.hasHarmfulIntent ? (
                      <>
                        <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
                        <h3 className="text-xl font-bold">Safe Space Boundary</h3>
                        <p className="text-muted-foreground">{aiResult.analysis}</p>
                        <p className="text-sm font-medium">{aiResult.suggestedAction}</p>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
                        <h3 className="text-xl font-bold">Welcome warmly, friend.</h3>
                        <p className="text-muted-foreground">{aiResult.analysis}</p>
                        <div className="p-4 rounded-xl bg-emerald-400/10 text-emerald-400 text-sm">
                          Preparing your sanctuary...
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            {!aiResult && (
              <Button 
                onClick={handleNextStep} 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11"
                disabled={isLoading || (step === 2 && moodText.length < 10)}
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : step === 1 ? "Next" : "Submit & Join"}
              </Button>
            )}
            
            <div className="text-center text-sm text-muted-foreground">
              Already a member?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign In
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}