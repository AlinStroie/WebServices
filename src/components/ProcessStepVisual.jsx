import { motion } from "framer-motion";
import {
  CheckCircle2,
  Code2,
  FileText,
  LayoutGrid,
  MessageCircle,
  MousePointer2,
  Rocket,
  ShieldCheck,
} from "lucide-react";

function FloatingDot({ className = "", delay = 0 }) {
  return (
    <motion.span
      className={`absolute h-2 w-2 rounded-full bg-white/45 ${className}`}
      animate={{
        y: [0, -8, 0],
        opacity: [0.25, 0.8, 0.25],
      }}
      transition={{
        duration: 2.4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function BriefVisual() {
  return (
    <div className="relative h-full overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-4">
      <FloatingDot className="right-8 top-6" />
      <FloatingDot className="bottom-8 left-10" delay={0.4} />

      <div className="space-y-3">
        <motion.div
          className="ml-auto w-28 rounded-2xl bg-white/15 px-4 py-3"
          animate={{ x: [0, -4, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-2 w-16 rounded-full bg-white/45" />
          <div className="mt-2 h-2 w-10 rounded-full bg-white/20" />
        </motion.div>

        <motion.div
          className="w-36 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-2 w-24 rounded-full bg-white/35" />
          <div className="mt-2 h-2 w-14 rounded-full bg-white/15" />
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/45">
        <MessageCircle size={17} />
        <span className="text-xs">brief & obiective</span>
      </div>
    </div>
  );
}

function SitemapVisual() {
  return (
    <div className="relative h-full overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-5">
      <motion.div
        className="mx-auto h-10 w-28 rounded-2xl bg-white/18"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto h-8 w-px bg-white/15" />

      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((item, index) => (
          <motion.div
            key={item}
            className="h-16 rounded-2xl border border-white/10 bg-black/30"
            animate={{
              y: [0, -5, 0],
              opacity: [0.65, 1, 0.65],
            }}
            transition={{
              duration: 2.4,
              delay: index * 0.18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/45">
        <FileText size={17} />
        <span className="text-xs">structură logică</span>
      </div>
    </div>
  );
}

function DesignVisual() {
  return (
    <div className="relative h-full overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-4">
      <div className="grid h-full grid-cols-[0.8fr_1.2fr] gap-3">
        <motion.div
          className="rounded-2xl bg-white/12"
          animate={{ opacity: [0.45, 0.9, 0.45] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="space-y-3">
          <motion.div
            className="h-10 rounded-2xl bg-white/18"
            animate={{ width: ["70%", "100%", "70%"] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="h-16 rounded-2xl border border-white/10 bg-black/30" />
            <div className="h-16 rounded-2xl border border-white/10 bg-white/10" />
          </div>

          <div className="h-7 rounded-full bg-white/10" />
        </div>
      </div>

      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/45">
        <LayoutGrid size={17} />
        <span className="text-xs">UI premium</span>
      </div>
    </div>
  );
}

function CodeVisual() {
  const lines = [70, 45, 85, 55, 75];

  return (
    <div className="relative h-full overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/40 p-5">
      <div className="mb-4 flex gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
      </div>

      <div className="space-y-3">
        {lines.map((width, index) => (
          <motion.div
            key={index}
            className="h-2 rounded-full bg-white/25"
            initial={{ width: 0 }}
            animate={{ width: `${width}%` }}
            transition={{
              duration: 1.3,
              delay: index * 0.18,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.8,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/45">
        <Code2 size={17} />
        <span className="text-xs">React + Tailwind</span>
      </div>
    </div>
  );
}

function LaunchVisual() {
  return (
    <div className="relative h-full overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-5">
      <motion.div
        className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black"
        animate={{
          y: [0, -10, 0],
          rotate: [0, -8, 0],
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Rocket size={20} />
      </motion.div>

      <div className="space-y-3 pt-4">
        {["Responsive", "Linkuri", "Formular"].map((item, index) => (
          <motion.div
            key={item}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2.2,
              delay: index * 0.25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <CheckCircle2 size={16} className="text-white/60" />
            <span className="text-xs text-white/45">{item}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SupportVisual() {
  return (
    <div className="relative h-full overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-5">
      <motion.div
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
      >
        <ShieldCheck size={19} className="text-white/60" />
      </motion.div>

      <div className="absolute bottom-5 left-5 right-5 space-y-3">
        <div className="rounded-2xl bg-white/14 px-4 py-3">
          <div className="h-2 w-24 rounded-full bg-white/35" />
        </div>

        <motion.div
          className="ml-auto w-32 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
          animate={{ x: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-2 w-20 rounded-full bg-white/25" />
        </motion.div>
      </div>

      <div className="absolute left-5 top-5 flex items-center gap-2 text-white/45">
        <MousePointer2 size={17} />
        <span className="text-xs">suport & update</span>
      </div>
    </div>
  );
}

function ProcessStepVisual({ type }) {
  const visuals = {
    brief: BriefVisual,
    sitemap: SitemapVisual,
    design: DesignVisual,
    code: CodeVisual,
    checklist: LaunchVisual,
    support: SupportVisual,
  };

  const Visual = visuals[type] || BriefVisual;

  return <Visual />;
}

export default ProcessStepVisual;