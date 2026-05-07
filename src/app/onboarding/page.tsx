'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { Loader2, ArrowRight, Check, Heart, Sparkles } from 'lucide-react';

const SUPPORT_CATEGORIES = [
  "Anxiety", "Burnout", "Overthinking", "Loneliness", "ADHD", 
  "Grief", "Emotional Numbness", "Relationship Healing", "Academic Stress"
];

const REASONS_FOR_JOINING = [
  "I want to support someone", "I want a safe community", 
  "I feel emotionally curious", "I enjoy meaningful conversations", 
  "I want to learn more about mental wellness", "Other"
];

const INTERESTS = [
  "Music", "Books", "Gaming", "Movies", "Coffee", "Walking", "Photography", "Art"
];

const EMOTIONAL_VIBES = [
  "Quiet", "Hopeful", "Drained", "Numb", "Calm", "Overwhelmed", "Curious"
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const [struggling, setStruggling] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [reasonForJoining, setReasonForJoining] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleNext = async () => {
    if (step === 1 && struggling) {
      setStep(struggling === 'Yes' ? 2 : 3);
    } else if (step === 2 && selectedCategories.length > 0) {
      setStep(4);
    } else if (step === 3 && reasonForJoining) {
      setStep(4);
    } else if (step === 4 && selectedInterests.length > 0) {
      setStep(5);
    } else if (step === 5 && selectedVibe) {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          onboarding_completed: true,
          struggling_status: struggling,
          support_categories: selectedCategories,
          reason_for_joining: reasonForJoining,
          interests: selectedInterests,
          emotional_vibe: selectedVibe,
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast({
        title: "Onboarding complete",
        description: "Welcome to your personalized sanctuary.",
      });

      router.push('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float-delayed" />

      <Card className="w-full max-w-xl glass border-white/10 p-8 md:p-12 relative z-10 rounded-[2.5rem]">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/5 overflow-hidden rounded-t-[2.5rem]">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out" 
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Step 1: Initial Question */}
        {step === 1 && (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-3xl font-normal text-foreground" style={{ fontFamily: 'Instrument Serif' }}>Welcome to Amity</h2>
              <p className="text-muted-foreground">Are you currently struggling with your mental well-being?</p>
            </div>
            <div className="space-y-3">
              {['Yes', 'No', 'Prefer not to say'].map((option) => (
                <button
                  key={option}
                  onClick={() => setStruggling(option)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 ${
                    struggling === option 
                      ? "bg-primary/10 border-primary text-primary" 
                      : "bg-white/5 border-white/5 hover:border-white/20 text-foreground"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <Button 
              disabled={!struggling} 
              onClick={handleNext}
              className="w-full h-14 rounded-full text-lg gap-2"
            >
              Continue <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Step 2: Supportive Categories (If Yes) */}
        {step === 2 && (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-3xl font-normal text-foreground" style={{ fontFamily: 'Instrument Serif' }}>We're here for you</h2>
              <p className="text-muted-foreground">Which of these resonate with you? Select all that apply.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {SUPPORT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategories(prev => 
                      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                    );
                  }}
                  className={`p-4 rounded-2xl border text-sm text-center transition-all duration-300 ${
                    selectedCategories.includes(cat) 
                      ? "bg-primary/10 border-primary text-primary" 
                      : "bg-white/5 border-white/5 hover:border-white/20 text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <Button 
              disabled={selectedCategories.length === 0} 
              onClick={handleNext}
              className="w-full h-14 rounded-full text-lg gap-2"
            >
              Continue <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Step 3: Reasons for Joining (If No/Prefer not to say) */}
        {step === 3 && (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-3xl font-normal text-foreground" style={{ fontFamily: 'Instrument Serif' }}>A safe community</h2>
              <p className="text-muted-foreground">What brings you to Amity today?</p>
            </div>
            <div className="space-y-3">
              {REASONS_FOR_JOINING.map((option) => (
                <button
                  key={option}
                  onClick={() => setReasonForJoining(option)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 ${
                    reasonForJoining === option 
                      ? "bg-primary/10 border-primary text-primary" 
                      : "bg-white/5 border-white/5 hover:border-white/20 text-foreground"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <Button 
              disabled={!reasonForJoining} 
              onClick={handleNext}
              className="w-full h-14 rounded-full text-lg gap-2"
            >
              Continue <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Step 4: Interests/Hobbies */}
        {step === 4 && (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-3xl font-normal text-foreground" style={{ fontFamily: 'Instrument Serif' }}>Find common ground</h2>
              <p className="text-muted-foreground">What do you enjoy? This helps us find your tribe.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {INTERESTS.map((interest) => (
                <button
                  key={interest}
                  onClick={() => {
                    setSelectedInterests(prev => 
                      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
                    );
                  }}
                  className={`p-4 rounded-2xl border text-sm text-center transition-all duration-300 ${
                    selectedInterests.includes(interest) 
                      ? "bg-primary/10 border-primary text-primary" 
                      : "bg-white/5 border-white/5 hover:border-white/20 text-foreground"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
            <Button 
              disabled={selectedInterests.length === 0} 
              onClick={handleNext}
              className="w-full h-14 rounded-full text-lg gap-2"
            >
              Continue <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Step 5: Current Emotional Vibe */}
        {step === 5 && (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-3xl font-normal text-foreground" style={{ fontFamily: 'Instrument Serif' }}>Your current vibe</h2>
              <p className="text-muted-foreground">How are you feeling in this moment?</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {EMOTIONAL_VIBES.map((vibe) => (
                <button
                  key={vibe}
                  onClick={() => setSelectedVibe(vibe)}
                  className={`px-6 py-3 rounded-full border text-sm transition-all duration-300 ${
                    selectedVibe === vibe 
                      ? "bg-primary text-white border-primary" 
                      : "bg-white/5 border-white/5 hover:border-white/20 text-foreground"
                  }`}
                >
                  {vibe}
                </button>
              ))}
            </div>
            <Button 
              disabled={!selectedVibe || isLoading} 
              onClick={handleNext}
              className="w-full h-14 rounded-full text-lg gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <>Enter Sanctuary <Sparkles className="w-5 h-5" /></>}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
