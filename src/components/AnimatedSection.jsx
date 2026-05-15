import { motion } from "framer-motion";

function AnimatedSection({ id, className = "", children }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{
        opacity: 0,
        y: 22,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.06,
        margin: "0px 0px -100px 0px",
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.section>
  );
}

export default AnimatedSection;