import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, Shield, Camera, Save, ArrowLeft } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const AdminProfilePage = ({ onBack }: { onBack: () => void }) => {
  const [profile, setProfile] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@echokart.admin',
    phone: '+91 98765 43210',
    role: 'Store Manager',
    twoFactor: true
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-slate-900"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Profile</h1>
          <p className="text-slate-500 font-medium">Manage your personal information and security settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div {...fadeInUpProps} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm text-center">
            <div className="relative inline-block mb-6">
              <div className="size-32 rounded-[2.5rem] bg-slate-100 overflow-hidden border-4 border-white shadow-xl">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2quoNL_tLzNe9Z_Dh7FvNXv-c7qbKhnU1O_hCSoW9-PsI1sN19ygCRqbX4I_pQG7btubE8kV3rUg2eaZIcdupN5ey_5k_3PZal1mcc2cDPZU7nK43ns3G685n5Lnpv-STrH1uCAgUyflFzG2tkqHnC1IpIQPi_OrqlQ1K-wpqWp054TKr9G8jMhdG3oOYVCdXePFXJFH5HHFO6mbl8CGzZuOzRjG6Axzx1_JZOjDBxIrE8HYe0D4BYBum6jeUJr8DcQgqgPvY5ZmI" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute -bottom-2 -right-2 p-2.5 bg-slate-900 text-white rounded-2xl border-4 border-white hover:bg-[#e31c3d] transition-colors">
                <Camera size={18} />
              </button>
            </div>
            
            <h2 className="text-xl font-black text-slate-900 leading-none mb-2">{profile.name}</h2>
            <p className="text-xs font-black text-[#e31c3d] uppercase tracking-widest">{profile.role}</p>
            
            <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Joined</span>
                <span className="text-slate-900 font-bold">Oct 2023</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Status</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-600 rounded-lg font-black text-[10px] uppercase">
                  Active
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Settings */}
        <div className="lg:col-span-2 space-y-8">
          {/* Success Message */}
          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-green-50 text-green-700 p-4 rounded-2xl font-bold text-sm flex items-center justify-center border border-green-100"
            >
              Profile updated successfully!
            </motion.div>
          )}

          {/* Personal Info */}
          <motion.section {...fadeInUpProps} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
              <User size={20} className="text-[#e31c3d]" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                <input 
                  type="text" 
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-5 py-3.5 outline-none focus:border-[#e31c3d] focus:bg-white font-bold transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Phone Number</label>
                <input 
                  type="text" 
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-5 py-3.5 outline-none focus:border-[#e31c3d] focus:bg-white font-bold transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="email" 
                    value={profile.email}
                    disabled
                    className="w-full bg-slate-100 border-2 border-slate-100 rounded-2xl pl-14 pr-5 py-3.5 font-bold text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </motion.section>


          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-3 bg-slate-900 hover:bg-black text-white px-10 py-4 rounded-[1.5rem] font-black uppercase text-xs tracking-widest shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isSaving ? (
                <div className="size-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={18} className="group-hover:scale-110 transition-transform" />
              )}
              {isSaving ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
