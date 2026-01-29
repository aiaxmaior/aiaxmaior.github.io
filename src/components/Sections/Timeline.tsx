import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timeline } from '../../data/content';

// Type indicator icons (no emojis)
const TypeIcon = ({ type }: { type: string }) => {
  const iconClass = "w-5 h-5";
  
  switch (type) {
    case 'education':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 14l9-5-9-5-9 5 9 5z"/>
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
        </svg>
      );
    case 'work':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
        </svg>
      );
    case 'achievement':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="6"/>
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
        </svg>
      );
    default:
      return null;
  }
};

export function Timeline() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="timeline" className="py-24 px-6 md:px-12 bg-ocean-deep/70">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            An Unconventional Path
          </h2>
          <p className="text-xl text-metal-light">
            From marine ecosystems to AI ecosystems
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent-cyan to-accent-purple hidden md:block" />

          {timeline.map((event, index) => {
            const isEven = index % 2 === 0;
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center mb-16 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:gap-8`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Content card */}
                <div className={`flex-1 ${isEven ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                  <motion.div
                    className="glass rounded-2xl p-6 hover:border-accent/40 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'} justify-start`}>
                      <div className={`
                        p-2 rounded-lg
                        ${event.type === 'education' ? 'bg-accent-purple/20 text-accent-purple' : ''}
                        ${event.type === 'work' ? 'bg-accent/20 text-accent' : ''}
                        ${event.type === 'achievement' ? 'bg-accent-cyan/20 text-accent-cyan' : ''}
                      `}>
                        <TypeIcon type={event.type} />
                      </div>
                      <span className="text-accent font-mono font-bold text-lg">{event.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-metal-chrome mb-2">
                      {event.title}
                    </h3>
                    <p className="text-metal-light leading-relaxed">
                      {event.description}
                    </p>
                    <div className="mt-3">
                      <span className={`
                        inline-block px-3 py-1 rounded-full text-xs font-medium
                        ${event.type === 'education' ? 'bg-accent-purple/20 text-accent-purple' : ''}
                        ${event.type === 'work' ? 'bg-accent/20 text-accent' : ''}
                        ${event.type === 'achievement' ? 'bg-accent-cyan/20 text-accent-cyan' : ''}
                      `}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Timeline node */}
                <motion.div
                  className="hidden md:flex w-6 h-6 rounded-full bg-accent items-center justify-center z-10 shadow-lg flex-shrink-0"
                  style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)' }}
                  whileHover={{ scale: 1.3 }}
                  animate={{
                    scale: isHovered ? 1.3 : 1,
                    boxShadow: isHovered 
                      ? '0 0 30px rgba(0, 255, 136, 0.8)' 
                      : '0 0 20px rgba(0, 255, 136, 0.5)',
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-ocean-deep" />
                </motion.div>

                {/* Image placeholder on opposite side */}
                <div className={`flex-1 ${isEven ? 'md:pl-8' : 'md:pr-8'} hidden md:block`}>
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: isEven ? -20 : 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: isEven ? -20 : 20 }}
                        transition={{ duration: 0.3 }}
                        className="glass rounded-2xl p-4 overflow-hidden"
                      >
                        {/* Placeholder image container */}
                        <div className="aspect-video bg-ocean-mid/50 rounded-lg flex items-center justify-center border border-accent/20">
                          <div className="text-center p-4">
                            <div className={`
                              w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center
                              ${event.type === 'education' ? 'bg-accent-purple/20 text-accent-purple' : ''}
                              ${event.type === 'work' ? 'bg-accent/20 text-accent' : ''}
                              ${event.type === 'achievement' ? 'bg-accent-cyan/20 text-accent-cyan' : ''}
                            `}>
                              <TypeIcon type={event.type} />
                            </div>
                            <p className="text-metal-light text-sm">
                              Image placeholder
                            </p>
                            <p className="text-metal-mid text-xs mt-1">
                              {event.image?.split('/').pop() || 'Add image'}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
