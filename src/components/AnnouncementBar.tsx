import React from 'react';
import { motion } from 'motion/react';
import { ANNOUNCEMENTS } from '../data';

export const AnnouncementBar = () => {
  return (
    <div className="bg-[#e31c3d] text-white py-2 px-4 text-center text-sm font-medium overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-block"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {ANNOUNCEMENTS.map((announcement, index) => (
          <React.Fragment key={index}>
            {announcement}
            {index < ANNOUNCEMENTS.length - 1 && (
              <span className="mx-12"></span>
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
