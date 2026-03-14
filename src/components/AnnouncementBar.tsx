import React, { useState, useEffect } from 'react';
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

  const displayItems = isLoading ? [] : (announcements.length > 0 ? announcements : staticAnnouncements);

  if (isLoading) {
    return (
      <div className="bg-[#e31c3d] h-[36px] md:h-[40px] border-b border-black/10" />
    );
  }

  if (displayItems.length === 0) return null;

  // Duplicate items 4× so there's always content filling the viewport during the loop
  const loopItems = [...displayItems, ...displayItems, ...displayItems, ...displayItems];

  return (
    <div className="bg-[#e31c3d] text-white py-2 overflow-hidden relative border-b border-black/10">
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll linear infinite;
          will-change: transform;
        }
      `}</style>

      <div
        className="marquee-track"
        style={{ animationDuration: `${speed}s` }}
      >
        {loopItems.map((announcement, index) => (
          <div key={index} className="flex items-center gap-4 mx-10 md:mx-12">
            <Zap className="w-3.5 h-3.5 fill-current shrink-0" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] whitespace-nowrap">
              {announcement}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
