import React from 'react';
import { motion } from 'motion/react';
import { Construction, Sparkles, ArrowRight } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => {
  return (
    <motion.div 
      {...fadeInUpProps}
      className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#e31c3d]/20 to-transparent" />
      <div className="absolute -top-24 -right-24 size-48 bg-[#e31c3d]/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 size-48 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative">
        <div className="size-24 bg-[#e31c3d]/10 rounded-3xl flex items-center justify-center text-[#e31c3d] mb-8 mx-auto rotate-12 group hover:rotate-0 transition-transform duration-500">
          <Construction size={40} strokeWidth={1.5} />
        </div>
        
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles size={16} className="text-orange-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Section in Development</span>
          <Sparkles size={16} className="text-orange-400" />
        </div>

        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
          {title}
        </h2>
        
        <p className="text-slate-500 max-w-md mx-auto mb-10 leading-relaxed font-medium">
          We're currently perfecting the <span className="text-slate-900 font-bold">{title}</span> module to give you the most premium experience possible. Check back soon for powerful updates.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-3 bg-[#e31c3d] text-white font-black rounded-xl hover:bg-[#c81935] transition-all shadow-lg shadow-[#e31c3d]/20 flex items-center gap-2 text-sm uppercase tracking-widest">
            Back to Overview <ArrowRight size={18} />
          </button>
          <button className="px-8 py-3 bg-slate-50 text-slate-600 font-black rounded-xl hover:bg-slate-100 transition-all border border-slate-200 text-sm uppercase tracking-widest">
            Notify Me
          </button>
        </div>
      </div>
      
      {/* Progress placeholder */}
      <div className="mt-12 w-full max-w-xs space-y-2">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
          <span>Development Progress</span>
          <span>85%</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '85%' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-[#e31c3d] rounded-full shadow-[0_0_8px_rgba(227,28,61,0.5)]"
          />
        </div>
      </div>
    </motion.div>
  );
};
