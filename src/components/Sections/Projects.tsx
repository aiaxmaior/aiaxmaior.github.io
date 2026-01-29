import { motion } from 'framer-motion';
import { projects } from '../../data/content';

// Category icons for projects
const CategoryIcon = ({ isOcean }: { isOcean: boolean }) => (
  <svg 
    className="w-8 h-8" 
    viewBox="0 0 32 32" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
  >
    {isOcean ? (
      // Wave/ocean icon
      <>
        <path d="M4 20 Q8 16 12 20 Q16 24 20 20 Q24 16 28 20" strokeLinecap="round"/>
        <path d="M4 14 Q8 10 12 14 Q16 18 20 14 Q24 10 28 14" strokeLinecap="round"/>
        <path d="M4 26 Q8 22 12 26 Q16 30 20 26 Q24 22 28 26" strokeLinecap="round" opacity="0.5"/>
      </>
    ) : (
      // Tech/circuit icon
      <>
        <rect x="10" y="10" width="12" height="12" rx="2"/>
        <path d="M16 4 V10 M16 22 V28 M4 16 H10 M22 16 H28"/>
        <circle cx="16" cy="16" r="3" fill="currentColor"/>
      </>
    )}
  </svg>
);

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 bg-black/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-metal-light">
            Where creativity meets computation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className={`
                  h-full glass rounded-2xl overflow-hidden
                  border transition-all duration-300
                  ${project.isOcean 
                    ? 'border-accent-cyan/20 hover:border-accent-cyan/50' 
                    : 'border-accent/20 hover:border-accent/50'
                  }
                `}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Header */}
                <div className={`
                  p-6 
                  ${project.isOcean 
                    ? 'bg-gradient-to-br from-ocean-mid/50 to-ocean-deep/50' 
                    : 'bg-gradient-to-br from-metal-dark/50 to-ocean-deep/50'
                  }
                `}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={project.isOcean ? 'text-accent-cyan' : 'text-accent'}>
                      <CategoryIcon isOcean={project.isOcean} />
                    </div>
                    {project.isOcean ? (
                      <span className="px-2 py-1 bg-accent-cyan/20 text-accent-cyan text-xs rounded-full">
                        Marine
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
                        Tech
                      </span>
                    )}
                  </div>
                  <h3 className={`text-xl font-bold mb-1 ${
                    project.isOcean ? 'text-accent-cyan' : 'text-accent'
                  }`}>
                    {project.title}
                  </h3>
                  <p className="text-metal-light text-sm">
                    {project.subtitle}
                  </p>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-metal-chrome text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map(tech => (
                      <span
                        key={tech}
                        className={`
                          px-2 py-1 text-xs rounded-lg
                          ${project.isOcean 
                            ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20' 
                            : 'bg-accent/10 text-accent border border-accent/20'
                          }
                        `}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* GitHub link */}
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        inline-flex items-center gap-2 text-sm font-medium
                        ${project.isOcean ? 'text-accent-cyan' : 'text-accent'}
                        hover:underline
                      `}
                      whileHover={{ x: 5 }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View on GitHub
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
