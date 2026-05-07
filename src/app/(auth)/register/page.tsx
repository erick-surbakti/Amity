'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const supabase = createClient();
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            username: formData.fullName.replace(/\s+/g, '').toLowerCase(),
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            full_name: formData.fullName,
            username: formData.fullName.replace(/\s+/g, '').toLowerCase(),
            onboarding_completed: false,
          });

        if (profileError) throw profileError;
      }

      toast({
        title: "Account created",
        description: "Welcome to Amity. Let's personalize your sanctuary.",
      });

      router.push('/onboarding');
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-white via-gray-50 to-gray-100 flex items-center justify-center px-6 py-12">
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
            Create your account
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 backdrop-blur-xl bg-white/90 border border-white/20">
          <h1 className="text-2xl font-normal text-black mb-1" style={{ fontFamily: 'Instrument Serif' }}>
            Get Started
          </h1>
          <p className="text-gray-500 text-sm mb-8" style={{ fontFamily: 'Inter' }}>
            Join us and start your journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter' }}>
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full px-4 py-3 rounded-lg border bg-white/50 focus:bg-white focus:outline-none transition-all text-gray-900 placeholder-gray-400 ${
                  errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-black'
                }`}
                style={{ fontFamily: 'Inter' }}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter' }}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-lg border bg-white/50 focus:bg-white focus:outline-none transition-all text-gray-900 placeholder-gray-400 ${
                  errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-black'
                }`}
                style={{ fontFamily: 'Inter' }}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter' }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-lg border bg-white/50 focus:bg-white focus:outline-none transition-all text-gray-900 placeholder-gray-400 pr-10 ${
                    errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-black'
                  }`}
                  style={{ fontFamily: 'Inter' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter' }}>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-lg border bg-white/50 focus:bg-white focus:outline-none transition-all text-gray-900 placeholder-gray-400 pr-10 ${
                    errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-black'
                  }`}
                  style={{ fontFamily: 'Inter' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms & Conditions */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer" style={{ fontFamily: 'Inter' }}>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 border border-gray-300 rounded accent-black cursor-pointer mt-1"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#terms" className="text-black font-medium hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#privacy" className="text-black font-medium hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.agreeToTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms}</p>}
            </div>

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
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
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

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-8" style={{ fontFamily: 'Inter' }}>
            Already have an account?{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-black font-medium hover:underline transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-500 mt-8" style={{ fontFamily: 'Inter' }}>
          We respect your privacy.{' '}
          <a href="#privacy" className="hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
