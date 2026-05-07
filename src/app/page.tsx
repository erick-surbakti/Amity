'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Instagram, Twitter, Linkedin, Phone, Heart } from 'lucide-react';

export default function LandingPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const fadeDuration = 0.5;

    const handleVideoTime = () => {
      const { currentTime, duration } = video;
      if (currentTime < fadeDuration) {
        setVideoOpacity(Math.min(currentTime / fadeDuration, 1));
      } else if (currentTime > duration - fadeDuration) {
        setVideoOpacity(Math.max((duration - currentTime) / fadeDuration, 0));
      } else {
        setVideoOpacity(1);
      }
    };

    const handleVideoEnded = () => {
      setVideoOpacity(0);
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 100);
    };

    video.addEventListener('timeupdate', handleVideoTime);
    video.addEventListener('ended', handleVideoEnded);
    video.play().catch(() => {});

    return () => {
      video.removeEventListener('timeupdate', handleVideoTime);
      video.removeEventListener('ended', handleVideoEnded);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const testimonials = [
    {
      quote: "Amity helped me find peace I didn't think was possible anymore. The space feels safe.",
      name: "Sarah P.",
      role: "Therapy Member • 7 months",
    },
    {
      quote: "For the first time, I actually look forward to checking in with myself every day.",
      name: "Marcus Chen",
      role: "Daily Practice User",
    },
    {
      quote: "The gentle design and compassionate approach made therapy feel less intimidating.",
      name: "Aisha Rahman",
      role: "Member since Jan 2026",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-white selection:bg-black selection:text-white">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          ref={videoRef}
          className="absolute object-cover transition-opacity duration-300"
          style={{ top: '300px', left: 0, right: 0, bottom: 0, opacity: videoOpacity }}
          playsInline
          muted
          loop={false}
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/90 z-10" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="flex justify-between items-center px-8 max-w-7xl mx-auto w-full">
          <button onClick={() => router.push('/')} className="text-3xl font-normal text-black" style={{ fontFamily: 'Instrument Serif' }}>
            Amity<span className="text-xs align-super opacity-50">®</span>
          </button>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ fontFamily: 'Inter' }}>
            {['Sanctuary', 'Method', 'About', 'Journal'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-500 hover:text-black transition-colors">
                {item}
              </a>
            ))}
            <button 
              onClick={() => router.push('/login')} 
              className="ml-4 rounded-full px-6 py-2.5 text-white bg-black hover:scale-105 active:scale-95 transition-all"
            >
              Begin Healing
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 min-h-screen pt-20" id="home">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl max-w-5xl font-normal text-black leading-[0.95] tracking-tighter" style={{ fontFamily: 'Instrument Serif' }}>
          Find <span className="text-gray-400 italic font-light">clarity</span> in the chaos,<br />
          and <span className="text-gray-400 italic font-light">rest</span> in the noise.
        </h1>
        <p className="text-base sm:text-lg max-w-2xl mt-10 leading-relaxed text-gray-600 font-light" style={{ fontFamily: 'Inter' }}>
          A modern sanctuary for your mind. Evidence-based therapy meets thoughtful technology.
        </p>
        <button 
          onClick={() => router.push('/login')} 
          className="rounded-full px-16 py-5 text-lg text-white bg-black mt-12 hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center gap-3 group"
        >
          Start Your Journey 
          <span className="group-hover:translate-x-1 transition">→</span>
        </button>
      </div>

      {/* Sanctuary Section */}
      <section id="sanctuary" className="relative z-20 min-h-screen bg-white px-8 py-32 flex items-center">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <h2 className="text-6xl font-normal text-black leading-tight" style={{ fontFamily: 'Instrument Serif' }}>
            A space built <br />for <span className="italic text-gray-400">reflection.</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter' }}>
            We’ve removed the clinical coldness of traditional mental health platforms. 
            Amity feels like a warm, private garden for your mind.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-20 bg-[#F9F9F9] py-28 px-8" id="testimonials">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Heart className="w-10 h-10 text-rose-300" />
          </div>
          <h2 className="text-5xl font-normal mb-4" style={{ fontFamily: 'Instrument Serif' }}>
            Real voices. Real healing.
          </h2>
          <p className="text-gray-500 mb-16">Don’t just take our word for it.</p>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <p className="text-lg leading-relaxed text-gray-700 mb-8 italic">“{t.quote}”</p>
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgent Help Banner */}
      <div className="relative z-30 bg-rose-50 border-y border-rose-100 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 text-rose-600 mb-3">
            <Phone className="w-6 h-6" />
            <span className="font-medium uppercase tracking-widest text-sm">If you need support right now</span>
          </div>
          <p className="text-xl text-gray-700">
            You are not alone. Help is available 24/7.
          </p>
          <a 
            href="tel:911" 
            className="inline-flex items-center gap-3 mt-6 px-10 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-medium transition-all active:scale-95"
          >
            Call Emergency Services (911)
          </a>
          <p className="mt-6 text-sm text-gray-500">
            Or visit <a href="#" className="underline hover:text-rose-600">International Crisis Hotlines</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 bg-[#F9F9F9] border-t border-gray-100 pt-24 pb-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-3xl mb-6" style={{ fontFamily: 'Instrument Serif' }}>Amity</h3>
              <p className="text-gray-600 max-w-xs mb-8" style={{ fontFamily: 'Inter' }}>
                Cultivating mental resilience through thoughtful design and compassionate care.
              </p>
              
              <div className="flex gap-4">
                <a href="#" className="w-11 h-11 rounded-2xl bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-11 h-11 rounded-2xl bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-11 h-11 rounded-2xl bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-6 text-sm uppercase tracking-widest text-gray-400">Platform</h4>
              <ul className="space-y-4 text-gray-600 text-sm" style={{ fontFamily: 'Inter' }}>
                <li className="hover:text-black cursor-pointer">Online Therapy</li>
                <li className="hover:text-black cursor-pointer">Guided Sessions</li>
                <li className="hover:text-black cursor-pointer">Meditation Library</li>
                <li className="hover:text-black cursor-pointer">Daily Reflections</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-6 text-sm uppercase tracking-widest text-gray-400">Company</h4>
              <ul className="space-y-4 text-gray-600 text-sm" style={{ fontFamily: 'Inter' }}>
                <li className="hover:text-black cursor-pointer">Our Mission</li>
                <li className="hover:text-black cursor-pointer">The Team</li>
                <li className="hover:text-black cursor-pointer">Privacy & Safety</li>
                <li className="hover:text-black cursor-pointer">Contact Us</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            <p className="text-gray-400">© 2026 Amity Health Collective. All rights reserved.</p>
            
            <p className="text-rose-600/80 text-center md:text-right max-w-md">
              <strong>In a life-threatening emergency, call 911 or your local emergency services immediately.</strong>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Crisis Button */}
      <a
        href="tel:911"
        className="fixed bottom-8 right-8 z-50 bg-rose-600 text-white p-4 rounded-2xl shadow-xl hover:bg-rose-700 transition-all flex items-center gap-3 group"
      >
        <Phone className="w-5 h-5" />
        <span className="hidden sm:inline font-medium group-hover:pr-1">Crisis Support</span>
      </a>
    </div>
  );
}