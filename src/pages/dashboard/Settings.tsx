import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Image as ImageIcon,
  LayoutGrid,
  Megaphone,
  Palette,
  Video,
  ChevronRight,
  Plus,
  Trash2,
  Edit3,
  Star,
  Save,
  X,
  Upload,
  GripVertical,
  Eye,
  ArrowUp,
  ArrowDown,
  Link as LinkIcon,
  Search
} from 'lucide-react';

import { supabase } from '../../lib/supabase';


const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

type Section = 'hero' | 'videos' | 'reviews' | 'announcements';

export const Settings = ({ products = [] }: { products?: any[] }) => {
  const [activeSection, setActiveSection] = useState<Section>('hero');
  const [showSuccess, setShowSuccess] = useState(false);

  // Hero Banners State
  const [banners, setBanners] = useState<any[]>([]);
  const [editingBanner, setEditingBanner] = useState<string | null>(null);

  // Video Showcase State
  const [videos, setVideos] = useState<any[]>([]);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [newVideo, setNewVideo] = useState({ title: '', video_url: '', product_name: '' });

  // Reviews State
  const [reviews, setReviews] = useState<any[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '', product_name: '' });

  // Announcements State
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [announcementSpeed, setAnnouncementSpeed] = useState(30);

  // Categories State
  const [categories, setCategories] = useState<string[]>([]);

  const fetchSettingsData = async () => {
    const { data: bData } = await supabase.from('banners').select('*').order('order', { ascending: true });
    if (bData) setBanners(bData);

    const { data: catData } = await supabase.from('products').select('category');
    const { data: catTableData } = await supabase.from('categories').select('name');
    
    const uniqueCats = new Set<string>();
    
    if (catData) {
      catData.forEach(p => {
        if (p.category) uniqueCats.add(p.category);
      });
    }
    
    if (catTableData) {
      catTableData.forEach(c => {
        if (c.name) uniqueCats.add(c.name);
      });
    }
    
    setCategories(Array.from(uniqueCats).sort());
    
    const { data: vData } = await supabase.from('videos').select('*').order('order', { ascending: true });
    if (vData) setVideos(vData);
    
    const { data: rData } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    if (rData) setReviews(rData);
    const { data: aData } = await supabase.from('announcements').select('*').order('order', { ascending: true });
    if (aData) setAnnouncements(aData);

    const { data: sData } = await supabase.from('store_settings').select('value').eq('key', 'announcement_speed').single();
    if (sData) setAnnouncementSpeed(Number(sData.value));
  };

  useEffect(() => {
    fetchSettingsData();
  }, []);


  // Product picker states
  const [showTrendingPicker, setShowTrendingPicker] = useState(false);
  const [showArrivalsPicker, setShowArrivalsPicker] = useState(false);
  const [pickerSearch, setPickerSearch] = useState('');

  // All store products (source of truth from Supabase)
  const ALL_STORE_PRODUCTS = products.map((p: any) => ({
    id: p.id,
    title: p.name || p.title,
    price: p.price || 0,
    image: p.image || (p.images && p.images[0]) || '',
  }));

  const handleImageUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `banner-${Math.random()}.${fileExt}`;
      const filePath = `banners/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) return;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setBanners(banners.map(b => b.id === id ? { ...b, image_url: publicUrl } : b));
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `video-${Math.random()}.${fileExt}`;
      const filePath = `videos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) return;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setNewVideo({ ...newVideo, video_url: publicUrl });
    }
  };


  const handleSave = async () => {
    try {
      // Bulk save banners
      for (const banner of banners) {
        const { id, created_at, image, ...rest } = banner;
        const bannerToSave = {
          image_url: banner.image_url,
          badge: banner.badge,
          title: banner.title,
          category_name: banner.category_name,
          order: banner.order || 0
        };
        if (id.toString().length > 15) {
            const { error } = await supabase.from('banners').upsert({ id, ...bannerToSave });
            if (error) throw error;
        } else {
            const { error } = await supabase.from('banners').insert([bannerToSave]);
            if (error) throw error;
        }
      }

      // Bulk save videos
      for (const video of videos) {
        const { id, created_at, src, product, ...rest } = video;
        const videoToSave = {
          video_url: video.video_url,
          title: video.title,
          product_name: video.product_name,
          order: video.order || 0
        };
        if (id.toString().length > 15) {
            const { error } = await supabase.from('videos').upsert({ id, ...videoToSave });
            if (error) throw error;
        } else {
            const { error } = await supabase.from('videos').insert([videoToSave]);
            if (error) throw error;
        }
      }

      // Bulk save reviews
      for (const review of reviews) {
        const { id, created_at, text, product, ...rest } = review;
        const reviewToSave = {
          name: review.name,
          rating: review.rating,
          comment: review.comment,
          product_name: review.product_name,
          avatar_url: review.avatar_url
        };
        if (id.toString().length > 15) {
            const { error } = await supabase.from('reviews').upsert({ id, ...reviewToSave });
            if (error) throw error;
        } else {
            const { error } = await supabase.from('reviews').insert([reviewToSave]);
            if (error) throw error;
        }
      }

      // Bulk save announcements
      for (const ann of announcements) {
        const { id, created_at, ...rest } = ann;
        const annToSave = {
          text: ann.text,
          order: ann.order || 0
        };
        if (id.toString().length > 15) {
            const { error } = await supabase.from('announcements').upsert({ id, ...annToSave });
            if (error) throw error;
        } else {
            const { error } = await supabase.from('announcements').insert([annToSave]);
            if (error) throw error;
        }
      }

      // Save announcement speed
      const { error: sError } = await supabase.from('store_settings').upsert({ key: 'announcement_speed', value: announcementSpeed.toString() });
      if (sError) throw sError;

      // Re-fetch data to sync frontend IDs with database UUIDs
      await fetchSettingsData();

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } catch (error: any) {
      console.error('Error saving settings:', error);
      alert('Failed to save changes: ' + (error.message || 'Unknown error'));
    }
  };


  const SECTIONS: { key: Section; label: string; icon: React.ReactNode }[] = [
    { key: 'hero', label: 'Hero Banners', icon: <ImageIcon className="w-5 h-5" /> },
    { key: 'announcements', label: 'Announcement Bar', icon: <Megaphone className="w-5 h-5" /> },
    { key: 'videos', label: 'Video Showcase', icon: <Video className="w-5 h-5" /> },
    { key: 'reviews', label: 'Manage Reviews', icon: <Palette className="w-5 h-5" /> },
  ];

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Store Customizations</h1>
        <p className="text-slate-500 font-medium">Manage your storefront sections, banners, products, and reviews</p>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-8 z-50 bg-green-50 text-green-700 px-6 py-3 rounded-2xl font-bold text-sm border border-green-100 shadow-xl"
          >
            ✓ Changes saved successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
              activeSection === s.key
                ? 'bg-[#e31c3d] text-white shadow-lg shadow-[#e31c3d]/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-[#e31c3d]/30'
            }`}
          >
            {s.icon}
            {s.label}
          </button>
        ))}
      </div>

      {/* =================== HERO BANNERS =================== */}
      {activeSection === 'hero' && (
        <motion.div {...fadeIn} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900">Hero Banner Slides</h2>
            <button
              onClick={() => setBanners([...banners, { id: Date.now(), image: '', badge: '', title: '' }])}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors"
            >
              <Plus size={16} /> Add Slide
            </button>
          </div>

          <div className="space-y-4">
            {banners.map((banner, idx) => (
              <div key={banner.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex items-stretch">
                  <div className="w-48 h-32 bg-slate-100 shrink-0 overflow-hidden relative group cursor-pointer" onClick={() => document.getElementById(`banner-upload-${banner.id}`)?.click()}>
                    <input 
                      type="file" 
                      id={`banner-upload-${banner.id}`} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={(e) => handleImageUpload(banner.id, e)} 
                    />
                    {banner.image_url ? (
                      <img src={banner.image_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2">
                        <ImageIcon size={32} />
                        <span className="text-[10px] uppercase font-bold text-slate-400">Upload Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                      <Upload size={20} className="text-white relative z-10" />
                      <span className="text-white text-xs font-bold relative z-10">Upload Image</span>
                    </div>
                  </div>
                  <div className="flex-1 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Slide {idx + 1}</span>
                      <button 
                        onClick={async () => {
                          if (banner.id.toString().length > 15) {
                            await supabase.from('banners').delete().eq('id', banner.id);
                          }
                          setBanners(banners.filter(b => b.id !== banner.id));
                        }} 
                        className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={banner.image_url}
                      onChange={(e) => setBanners(banners.map(b => b.id === banner.id ? {...b, image_url: e.target.value} : b))}
                      placeholder="Image URL..."
                      className="w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#e31c3d] transition-colors"
                    />

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={banner.badge}
                        onChange={(e) => setBanners(banners.map(b => b.id === banner.id ? {...b, badge: e.target.value} : b))}
                        placeholder="Badge text..."
                        className="flex-1 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#e31c3d] transition-colors"
                      />
                      <input
                        type="text"
                        value={banner.title}
                        onChange={(e) => setBanners(banners.map(b => b.id === banner.id ? {...b, title: e.target.value} : b))}
                        placeholder="Headline..."
                        className="flex-[2] bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#e31c3d] transition-colors"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <LayoutGrid size={14} className="text-slate-400" />
                      <select
                        value={banner.category_name || ''}
                        onChange={(e) => setBanners(banners.map(b => b.id === banner.id ? {...b, category_name: e.target.value} : b))}
                        className="flex-1 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#e31c3d] transition-colors font-bold text-slate-700"
                      >
                        <option value="">Link to Category (None)</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* =================== ANNOUNCEMENT BAR =================== */}
      {activeSection === 'announcements' && (
        <motion.div {...fadeIn} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900">Announcement Bar Content</h2>
          </div>

          <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm p-6 space-y-8">
            {/* Speed Control */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-sm font-black text-slate-900">Animation Speed</h3>
                        <p className="text-[11px] text-slate-500 font-medium">Control how fast the announcements scroll (lower is faster)</p>
                    </div>
                    <span className="px-3 py-1 bg-white rounded-lg border border-slate-200 text-xs font-black text-[#e31c3d]">
                        {announcementSpeed}s
                    </span>
                </div>
                <input 
                    type="range" 
                    min="5" 
                    max="60" 
                    step="5"
                    value={announcementSpeed}
                    onChange={(e) => setAnnouncementSpeed(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#e31c3d]"
                />
                <div className="flex justify-between mt-2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                    <span>Fast (5s)</span>
                    <span>Slow (60s)</span>
                </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
              <input 
                type="text" 
                value={newAnnouncement}
                onChange={(e) => setNewAnnouncement(e.target.value)}
                placeholder="Type new announcement here..."
                className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#e31c3d] font-bold transition-all"
              />
              <button 
                onClick={() => {
                  if (newAnnouncement.trim()) {
                    setAnnouncements([...announcements, { id: Date.now(), text: newAnnouncement.trim(), order: announcements.length + 1 }]);
                    setNewAnnouncement('');
                  }
                }}
                className="bg-slate-900 text-white px-6 rounded-xl font-bold text-sm hover:bg-black transition-colors flex items-center gap-2"
              >
                <Plus size={18} /> Add
              </button>
            </div>

            <div className="space-y-3">
              {announcements.map((ann, idx) => (
                <div key={ann.id} className="flex items-center gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100 group">
                  <span className="size-8 bg-white rounded-lg flex items-center justify-center text-xs font-black text-slate-400 border border-slate-100">
                    {idx + 1}
                  </span>
                  <input 
                    type="text" 
                    value={ann.text}
                    onChange={(e) => setAnnouncements(announcements.map(a => a.id === ann.id ? {...a, text: e.target.value} : a))}
                    className="flex-1 bg-transparent border-none outline-none font-bold text-slate-700 text-sm"
                  />
                  <button 
                    onClick={async () => {
                      if (ann.id.toString().length > 15) {
                        await supabase.from('announcements').delete().eq('id', ann.id);
                      }
                      setAnnouncements(announcements.filter(a => a.id !== ann.id));
                    }}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        </motion.div>
      )}

      {/* =================== VIDEO SHOWCASE =================== */}
      {activeSection === 'videos' && (
        <motion.div {...fadeIn} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900">Video Showcase</h2>
            <button
              onClick={() => setShowVideoForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors"
            >
              <Plus size={16} /> Add Video
            </button>
          </div>

          {/* Add Video Form */}
          <AnimatePresence>
            {showVideoForm && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-black text-slate-900">Add New Video</h3>
                  <button onClick={() => setShowVideoForm(false)} className="p-1 hover:bg-slate-100 rounded-lg transition-colors"><X size={16} /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input type="text" value={newVideo.title} onChange={(e) => setNewVideo({...newVideo, title: e.target.value})} placeholder="Video title..." className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e31c3d] font-bold transition-colors" />
                  <div className="relative flex items-center col-span-1 md:col-span-1 border border-slate-100 rounded-xl bg-slate-50 transition-colors focus-within:border-[#e31c3d]">
                    <input type="text" value={newVideo.video_url} onChange={(e) => setNewVideo({...newVideo, video_url: e.target.value})} placeholder="Video URL or upload..." className="w-full px-4 py-2.5 text-sm outline-none bg-transparent font-bold" />
                    <button type="button" onClick={() => document.getElementById('video-upload')?.click()} className="px-3 shrink-0 text-slate-400 hover:text-[#e31c3d] transition-colors"><Upload size={18} /></button>
                    <input type="file" id="video-upload" className="hidden" accept="video/*" onChange={handleVideoUpload} />
                  </div>
                  <input type="text" value={newVideo.product_name} onChange={(e) => setNewVideo({...newVideo, product_name: e.target.value})} placeholder="Linked product name..." className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e31c3d] font-bold transition-colors" />
                </div>
                <button
                  onClick={() => {
                    if (newVideo.title && newVideo.video_url) {
                      setVideos([...videos, { id: Date.now(), ...newVideo }]);
                      setNewVideo({ title: '', video_url: '', product_name: '' });
                      setShowVideoForm(false);
                    }
                  }}
                  className="px-6 py-2.5 bg-[#e31c3d] text-white rounded-xl font-bold text-sm hover:bg-[#c81935] transition-colors"
                >
                  Add Video
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-3">
            {videos.map((video) => (
              <div key={video.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 p-4">
                <div className="size-16 bg-slate-900 rounded-xl flex items-center justify-center shrink-0">
                  <Video size={24} className="text-white/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-black text-slate-900">{video.title}</h4>
                  <p className="text-xs text-slate-400 font-medium truncate">{video.product_name}</p>
                  <p className="text-[10px] text-slate-300 font-mono truncate mt-0.5">{video.video_url}</p>
                </div>
                <button
                  onClick={async () => {
                    await supabase.from('videos').delete().eq('id', video.id);
                    setVideos(videos.filter(v => v.id !== video.id));
                  }}
                  className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors shrink-0"
                >
                  <Trash2 size={16} />
                </button>

              </div>
            ))}
            {videos.length === 0 && (
              <div className="text-center py-16 text-slate-300">
                <Video size={40} className="mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-400">No videos added yet</p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* =================== MANAGE REVIEWS =================== */}
      {activeSection === 'reviews' && (
        <motion.div {...fadeIn} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900">Customer Reviews</h2>
            <button
              onClick={() => setShowReviewForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors"
            >
              <Plus size={16} /> Add Review
            </button>
          </div>

          {/* Add Review Form */}
          <AnimatePresence>
            {showReviewForm && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-black text-slate-900">Add New Review</h3>
                  <button onClick={() => setShowReviewForm(false)} className="p-1 hover:bg-slate-100 rounded-lg transition-colors"><X size={16} /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input type="text" value={newReview.name} onChange={(e) => setNewReview({...newReview, name: e.target.value})} placeholder="Customer name..." className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e31c3d] font-bold transition-colors" />
                  <input type="text" value={newReview.product_name} onChange={(e) => setNewReview({...newReview, product_name: e.target.value})} placeholder="Product name..." className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e31c3d] font-bold transition-colors" />
                </div>
                <div className="mb-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => setNewReview({...newReview, rating: star})} className="p-0.5">
                        <Star size={20} className={`${star <= newReview.rating ? 'fill-[#ff9c1a] text-[#ff9c1a]' : 'text-slate-200'} transition-colors`} />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  placeholder="Review text..."
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e31c3d] font-bold transition-colors resize-none mb-4"
                />
                <button
                  onClick={() => {
                    if (newReview.name && newReview.comment) {
                      setReviews([...reviews, { id: Date.now(), ...newReview }]);
                      setNewReview({ name: '', rating: 5, comment: '', product_name: '' });
                      setShowReviewForm(false);
                    }
                  }}
                  className="px-6 py-2.5 bg-[#e31c3d] text-white rounded-xl font-bold text-sm hover:bg-[#c81935] transition-colors"
                >
                  Add Review
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-3">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-black text-slate-500">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900">{review.name}</h4>
                        <p className="text-[10px] text-slate-400 font-bold">{review.product_name}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={14} className={`${star <= review.rating ? 'fill-[#ff9c1a] text-[#ff9c1a]' : 'text-slate-200'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">"{review.comment}"</p>
                  </div>
                  <button
                    onClick={async () => {
                      if (review.id.toString().length > 15) {
                        await supabase.from('reviews').delete().eq('id', review.id);
                      }
                      setReviews(reviews.filter(r => r.id !== review.id));
                    }}
                    className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {reviews.length === 0 && (
              <div className="text-center py-16 text-slate-300">
                <Star size={40} className="mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-400">No reviews yet</p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Save Bar */}
      <div className="mt-10 flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-3 bg-slate-900 hover:bg-black text-white px-10 py-4 rounded-[1.5rem] font-black uppercase text-xs tracking-widest shadow-xl transition-all group"
        >
          <Save size={18} className="group-hover:scale-110 transition-transform" />
          Save Changes
        </button>
      </div>
    </div>
  );
};
