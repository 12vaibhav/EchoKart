import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, ArrowRight, CheckCircle2, AlertCircle, Loader2, Eye, EyeOff, X, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const AuthPage = ({ onNavigate, initialMode = 'signin' }: { onNavigate: (path: string) => void, initialMode?: 'signin' | 'signup' | 'forgot' | 'otp' | 'reset' }) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot' | 'otp' | 'reset'>(initialMode);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  React.useEffect(() => {
    // Check if we are in recovery mode from the URL
    const hash = window.location.hash;
    if (hash && hash.includes('type=recovery')) {
      setMode('reset');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            }
          }
        });
        if (signUpError) throw signUpError;
        onNavigate('home');
      } else if (mode === 'signin') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        onNavigate('home');
      } else if (mode === 'forgot') {
        const { data, error: resetError } = await supabase.functions.invoke('send-reset-otp-v2', {
          body: { email }
        });
        if (resetError || (data && data.error)) throw (resetError || new Error(data.error));
        setMode('otp');
      } else if (mode === 'otp') {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        const { data, error: verifyError } = await supabase.functions.invoke('verify-reset-otp-v2', {
          body: { email, code: otp, password }
        });
        if (verifyError || (data && data.error)) throw (verifyError || new Error(data.error));
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setMode('signin');
        }, 5000);
      } else if (mode === 'reset') {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        const { error: updateError } = await supabase.auth.updateUser({
          password: password
        });
        if (updateError) throw updateError;
        onNavigate('home');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-xl p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 relative overflow-hidden group">
          {/* Decorative background accent */}
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#e31c3d] opacity-[0.03] rounded-full blur-3xl group-hover:opacity-[0.05] transition-opacity duration-700" />
          
          <div className="relative z-10">
            <div className="mb-10 text-center">
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter mb-3">
                {mode === 'signin' ? 'Welcome Back' : 
                 mode === 'signup' ? 'Join EchoKart' : 
                 mode === 'forgot' ? 'Reset Password' : 
                 mode === 'otp' ? 'Verify OTP' : 'New Password'}
              </h1>
              <p className="text-slate-500 font-medium">
                {mode === 'signin' ? 'Sign in to access your orders and wishlist' : 
                 mode === 'signup' ? 'Create an account to track orders and more' :
                 mode === 'forgot' ? 'Enter your email to receive a 4-digit code' : 
                 mode === 'otp' ? 'Enter the code sent to your email' : 'Enter your new secure password'}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100 flex items-start gap-3 text-red-600 text-sm font-bold"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                  <button onClick={() => setError(null)} className="ml-auto">
                    <X className="w-4 h-4 opacity-50 hover:opacity-100" />
                  </button>
                </motion.div>
              )}

              {success && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-100 flex items-start gap-3 text-emerald-700 text-sm font-bold"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>{mode === 'otp' ? 'Password updated successfully! Please sign in with your new credentials.' : 'Check your email for the code/confirmation link!'}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === 'signup' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Full Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#e31c3d] transition-colors">
                      <User size={18} />
                    </div>
                    <input 
                      type="text" 
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-slate-50 border border-slate-100 rounded-md py-4 pl-14 pr-6 outline-none focus:bg-white focus:border-[#e31c3d] focus:ring-4 focus:ring-[#e31c3d]/5 transition-all font-medium"
                    />
                  </div>
                </div>
              )}

              {mode !== 'forgot' && mode !== 'reset' && mode !== 'otp' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#e31c3d] transition-colors">
                      <Mail size={18} />
                    </div>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-slate-50 border border-slate-100 rounded-md py-4 pl-14 pr-6 outline-none focus:bg-white focus:border-[#e31c3d] focus:ring-4 focus:ring-[#e31c3d]/5 transition-all font-medium"
                    />
                  </div>
                </div>
              )}

              {mode === 'otp' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">4-Digit Code</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#e31c3d] transition-colors">
                      <Lock size={18} />
                    </div>
                    <input 
                      type="text" 
                      required
                      maxLength={4}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 4-digit code"
                      className="w-full bg-slate-50 border border-slate-100 rounded-md py-4 pl-14 pr-6 outline-none focus:bg-white focus:border-[#e31c3d] focus:ring-4 focus:ring-[#e31c3d]/5 transition-all font-bold text-center text-xl tracking-[0.5em]"
                    />
                  </div>
                </div>
              )}

              {mode === 'forgot' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Account Email</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#e31c3d] transition-colors">
                      <Mail size={18} />
                    </div>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your account email"
                      className="w-full bg-slate-50 border border-slate-100 rounded-md py-4 pl-14 pr-6 outline-none focus:bg-white focus:border-[#e31c3d] focus:ring-4 focus:ring-[#e31c3d]/5 transition-all font-medium"
                    />
                  </div>
                </div>
              )}

              {mode !== 'forgot' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">
                    {(mode === 'reset' || mode === 'otp') ? 'New Password' : 'Password'}
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#e31c3d] transition-colors">
                      <Lock size={18} />
                    </div>
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-100 rounded-md py-4 pl-14 pr-14 outline-none focus:bg-white focus:border-[#e31c3d] focus:ring-4 focus:ring-[#e31c3d]/5 transition-all font-medium"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}

              {(mode === 'reset' || mode === 'otp') && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Confirm New Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#e31c3d] transition-colors">
                      <Lock size={18} />
                    </div>
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-100 rounded-md py-4 pl-14 pr-14 outline-none focus:bg-white focus:border-[#e31c3d] focus:ring-4 focus:ring-[#e31c3d]/5 transition-all font-medium"
                    />
                  </div>
                </div>
              )}

              {mode === 'signin' && (
                <div className="flex justify-end pr-2">
                  <button 
                    type="button" 
                    onClick={() => setMode('forgot')}
                    className="text-xs font-bold text-slate-400 hover:text-[#e31c3d] transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#e31c3d] text-white font-black py-4 rounded-md shadow-xl shadow-red-100 hover:shadow-red-200 hover:-translate-y-1 active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>
                      {mode === 'signin' ? 'Sign In' : 
                       mode === 'signup' ? 'Create Account' : 
                       mode === 'forgot' ? 'Send Code' : 
                       mode === 'otp' ? 'Update & Login' : 'Update Password'}
                    </span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-50 text-center">
              <p className="text-slate-400 font-medium">
                {(mode === 'forgot' || mode === 'otp') ? 'Remembered your password?' : 
                 mode === 'signin' ? "Don't have an account?" : "Already have an account?"}
                <button 
                  onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                  className="ml-2 text-[#e31c3d] font-black hover:underline underline-offset-4"
                >
                  {mode === 'signin' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
        
        {/* Back to Home link */}
        <div className="mt-8 text-center">
           <button 
             onClick={() => onNavigate('home')}
             className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
           >
             Back to Homepage
           </button>
        </div>
      </motion.div>
    </div>
  );
};
