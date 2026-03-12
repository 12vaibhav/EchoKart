import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';
import { ANNOUNCEMENTS as staticAnnouncements } from '../data';
import { supabase } from '../lib/supabase';

export const AnnouncementBar = () => {
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [speed, setSpeed] = useState(30);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [announcementsRes, settingsRes] = await Promise.all([
          supabase
            .from('announcements')
            .select('text')
            .order('order', { ascending: true }),
          supabase
            .from('store_settings')
            .select('value')
            .eq('key', 'announcement_speed')
            .single()
        ]);

        if (announcementsRes.data && announcementsRes.data.length > 0) {
          setAnnouncements(announcementsRes.data.map(a => a.text));
        } else {
          setAnnouncements(staticAnnouncements);
        }

        if (settingsRes.data) {
          setSpeed(Number(settingsRes.data.value));
        }
      } catch (error) {
        console.error('Error fetching announcement data:', error);
        setAnnouncements(staticAnnouncements);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Only show static announcements if we've finished loading and found no data in DB
  const displayItems = isLoading ? [] : (announcements.length > 0 ? announcements : staticAnnouncements);

  if (isLoading) {
    return (
      <div className="bg-[#e31c3d] h-[36px] md:h-[40px] border-b border-black/10 flex items-center justify-center">
        {/* Simple subtle loading indicator if needed, or just a blank bar */}
      </div>
    );
  }

  if (displayItems.length === 0) return null;

  return (
    <div className="bg-[#e31c3d] text-white py-2 px-4 overflow-hidden relative border-b border-black/10">
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{ x: [0, "-50%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
      >
        {[...displayItems, ...displayItems].map((announcement, index) => (
          <div key={index} className="flex items-center gap-4 mx-12">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em]">
              {announcement}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

