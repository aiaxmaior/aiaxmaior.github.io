import { motion } from 'framer-motion';
import { skillCategories } from '../../data/content';

// Category icons for skills
const SkillCategoryIcon = ({ index }: { index: number }) => {
  const icons = [
    // AI & Machine Learning
    <svg key="ai" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v4m0 12v4M2 12h4m12 0h4"/>
      <path d="M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
    </svg>,
    // Edge & Embedded
    <svg key="edge" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <path d="M9 9h6v6H9z"/>
      <path d="M9 2v2m6-2v2M9 20v2m6-2v2M2 9h2m-2 6h2M20 9h2m-2 6h2"/>
    </svg>,
    // Statistics & Analysis
    <svg key="stats" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3v18h18"/>
      <path d="M7 16l4-4 4 4 5-6"/>
    </svg>,
    // Infrastructure
    <svg key="infra" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>,
  ];
  
  return icons[index % icons.length];
};

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 bg-ocean-deep/70">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Technical Arsenal
          </h2>
          <p className="text-xl text-metal-light">
            Tools forged through diverse experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="glass rounded-2xl p-6 h-full hover:border-accent/40 transition-all duration-300 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-accent/20 text-accent">
                    <SkillCategoryIcon index={index} />
                  </div>
                  <h3 className="text-xl font-semibold text-accent">
                    {category.title}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                      className="flex items-center gap-3 text-metal-chrome"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>{skill}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Decorative corner element */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl pointer-events-none opacity-10">
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-accent to-transparent rotate-45" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional skill highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 glass rounded-2xl p-8 text-center"
        >
          <h4 className="text-lg font-semibold text-metal-chrome mb-4">
            Additional Expertise
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'CARLA Simulator',
              'MediaPipe',
              'DeepFace',
              'ArcFace',
              'ONNX',
              'OpenCV',
              'GStreamer',
              'Apache Kafka',
              'Redis',
              'PostgreSQL',
              'Git',
              'CI/CD',
            ].map(skill => (
              <span
                key={skill}
                className="px-4 py-2 bg-ocean-mid/50 rounded-lg text-sm text-metal-chrome border border-ocean-light/30 hover:border-accent/50 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
