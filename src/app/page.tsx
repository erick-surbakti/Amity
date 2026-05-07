import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, ShieldCheck, Sparkles, MessageCircleHeart } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 glass">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary animate-morph shadow-[0_0_20px_rgba(167,217,255,0.5)]" />
            <span className="text-xl font-bold tracking-tight text-primary">Amity</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-primary transition-colors">Safety</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
            <Link href="/login">
              <Button variant="ghost" className="text-muted-foreground hover:text-primary">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
                Join Amity
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="container mx-auto flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/5 text-xs font-semibold text-primary mb-8 animate-fade-in">
            <Sparkles className="w-3 h-3" />
            <span>AI-Moderated Safe Haven</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight max-w-4xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
            A space to breathe, <br />
            <span className="text-primary italic">to feel, and to be.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Amity is a modern emotional safe-space where technology meets empathy. 
            Connect with a community that understands, moderated by ethical AI to ensure every interaction is kind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link href="/register">
              <Button size="lg" className="rounded-full px-10 h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:scale-105">
                Begin Your Journey
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg glass text-foreground border-white/10 hover:bg-white/5">
                Welcome Back
              </Button>
            </Link>
          </div>
        </div>

        {/* Ambient Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-float" />
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 px-6 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-primary" />}
              title="Vibe Guard AI"
              description="Our real-time moderation identifies harmful content and triggers before they reach you, maintaining a truly safe atmosphere."
            />
            <FeatureCard 
              icon={<Heart className="w-8 h-8 text-primary" />}
              title="Glimmer Sharing"
              description="Share small moments of joy and find 'glimmers' of hope in others' lives through our curated, uplifting feed."
            />
            <FeatureCard 
              icon={<MessageCircleHeart className="w-8 h-8 text-primary" />}
              title="Empathy Gate"
              description="Every member joins through a thoughtful onboarding process that ensures community intent aligns with safety and support."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 glass mt-auto">
        <div className="container mx-auto px-6 flex flex-col md:row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/50" />
            <span className="font-bold text-lg">Amity</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Amity Systems. Designed for the human soul.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary">Privacy</Link>
            <Link href="#" className="hover:text-primary">Community Guidelines</Link>
            <Link href="#" className="hover:text-primary">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-3xl glass-card transition-all hover:-translate-y-2 group">
      <div className="mb-6 p-4 rounded-2xl bg-primary/10 w-fit group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
