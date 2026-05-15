import { motion } from "framer-motion";

function OverlayBackdrop({
  onClick,
  blur = 7,
  opacity = 0.6,
  duration = 0.75,
  className = "",
}) {
  return (
    <>
      <motion.div
        onClick={onClick}
        className={`absolute inset-0 bg-black ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.42,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      <motion.div
        onClick={onClick}
        className="absolute inset-0 will-change-[opacity,backdrop-filter] [contain:paint]"
        initial={{
          opacity: 0,
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)",
        }}
        animate={{
          opacity: 1,
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
        }}
        exit={{
          opacity: 0,
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)",
        }}
        transition={{
          duration,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </>
  );
}

export default OverlayBackdrop;