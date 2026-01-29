import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ocean-deep border-t border-ocean-mid/30 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-metal-light text-sm"
          >
            © {currentYear} Arjun Joshi | Navigating the confluence of nature and technology
          </motion.p>

          {/* Tech stack mention */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-sm text-metal-light"
          >
            <span>Built with</span>
            <span className="text-accent">React</span>
            <span>+</span>
            <span className="text-accent-cyan">TypeScript</span>
            <span>+</span>
            <span className="text-accent-purple">Framer Motion</span>
          </motion.div>
        </div>

        {/* Decorative wave */}
        <motion.div
          className="mt-6 h-1 w-full rounded-full overflow-hidden bg-ocean-mid/30"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-accent via-accent-cyan to-accent-purple"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ width: '50%' }}
          />
        </motion.div>
      </div>
    </footer>
  );
}
