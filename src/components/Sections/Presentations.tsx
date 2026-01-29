import { motion } from 'framer-motion';
import { presentations } from '../../data/content';

export function Presentations() {
  return (
    <section id="presentations" className="py-24 px-6 md:px-12 bg-black/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Conferences & Talks
          </h2>
          <p className="text-xl text-metal-light">
            Sharing knowledge and insights
          </p>
        </motion.div>

        {presentations.length > 0 ? (
          <div className="space-y-6">
            {presentations.map((presentation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="glass rounded-2xl p-6 hover:border-accent-cyan/40 transition-all duration-300"
                  whileHover={{ x: 8 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-accent-cyan/20 flex items-center justify-center text-accent-cyan">
                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="3" width="20" height="14" rx="2"/>
                          <path d="M8 21h8m-4-4v4"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-accent-cyan mb-1">
                        {presentation.title}
                      </h3>
                      <p className="text-metal-chrome">
                        {presentation.event}
                      </p>
                      {presentation.description && (
                        <p className="text-metal-light text-sm mt-2">
                          {presentation.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Meta */}
                    <div className="flex-shrink-0 text-right">
                      <div className="text-accent-cyan font-mono font-semibold">
                        {presentation.date}
                      </div>
                      <div className="text-metal-light text-sm">
                        {presentation.location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-12 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent-cyan/20 flex items-center justify-center text-accent-cyan">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <path d="M8 21h8m-4-4v4"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-metal-chrome mb-2">
              Coming Soon
            </h3>
            <p className="text-metal-light">
              Conference presentations and public talks will be listed here.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
