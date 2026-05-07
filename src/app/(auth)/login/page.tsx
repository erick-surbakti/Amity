'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    } else {
      toast({
        title: "Welcome back",
        description: "Successfully signed in to your sanctuary.",
      });
      router.push('/dashboard');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-white via-gray-50 to-gray-100 flex items-center justify-center px-6">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-black/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/3 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />

      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-600 hover:text-black transition-colors group"
        style={{ fontFamily: 'Inter' }}
      >
        <span className="transition-transform group-hover:-translate-x-1">←</span>
        Back
      </button>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <button
            onClick={() => router.push('/')}
            className="inline-block text-3xl tracking-tight font-normal text-black hover:opacity-80 transition-opacity"
            style={{ fontFamily: 'Instrument Serif' }}
          >
            Amity<span className="text-xs align-super">®</span>
          </button>
          <p className="mt-2 text-gray-500 text-sm" style={{ fontFamily: 'Inter' }}>
            Begin your journey
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 backdrop-blur-xl bg-white/90 border border-white/20">
          <h1 className="text-2xl font-normal text-black mb-1" style={{ fontFamily: 'Instrument Serif' }}>
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm mb-8" style={{ fontFamily: 'Inter' }}>
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter' }}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/50 focus:bg-white focus:border-black focus:outline-none transition-all text-gray-900 placeholder-gray-400"
                style={{ fontFamily: 'Inter' }}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/50 focus:bg-white focus:border-black focus:outline-none transition-all text-gray-900 placeholder-gray-400"
                style={{ fontFamily: 'Inter' }}
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer" style={{ fontFamily: 'Inter' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 border border-gray-300 rounded accent-black cursor-pointer"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="#forgot"
                className="text-sm text-gray-600 hover:text-black transition-colors"
                style={{ fontFamily: 'Inter' }}
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full py-3 text-base font-medium text-white bg-black transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden relative mt-8"
              style={{ fontFamily: 'Inter' }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500" style={{ fontFamily: 'Inter' }}>Or continue with</span>
            </div>
          </div>

          {/* Social Auth */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="px-4 py-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              style={{ fontFamily: 'Inter' }}
            >
              <span>Google</span>
            </button>
            <button
              type="button"
              className="px-4 py-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              style={{ fontFamily: 'Inter' }}
            >
              <span>Apple</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 mt-8" style={{ fontFamily: 'Inter' }}>
            Don't have an account?{' '}
            <a href="/register" className="text-black font-medium hover:underline transition-colors">
              Sign up
            </a>
          </p>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-500 mt-8" style={{ fontFamily: 'Inter' }}>
          By signing in, you agree to our{' '}
          <a href="#terms" className="hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#privacy" className="hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}