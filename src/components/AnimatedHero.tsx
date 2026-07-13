"use client";

import { motion, Transition } from "framer-motion";

interface AnimatedHeroProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  imageAlt: string;
  animationType?: "slide-up" | "slide-left" | "slide-right" | "zoom" | "parallax" | "fade-scale";
  className?: string;
  height?: string;
  showPattern?: boolean;
}

interface AnimationConfig {
  initial: { x?: number; y?: number; scale?: number; opacity: number };
  animate: { x?: number; y?: number; scale?: number; opacity: number };
  transition: Transition;
}

export function AnimatedHero({
  title,
  subtitle,
  imageUrl,
  imageAlt,
  animationType = "slide-up",
  className = "",
  height = "h-[500px]",
  showPattern = true,
}: AnimatedHeroProps) {
  const easing = [0.25, 0.46, 0.45, 0.94] as const;

  const animations: Record<string, AnimationConfig> = {
    "slide-up": {
      initial: { y: 100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.8, ease: easing },
    },
    "slide-left": {
      initial: { x: -100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { duration: 0.8, ease: easing },
    },
    "slide-right": {
      initial: { x: 100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { duration: 0.8, ease: easing },
    },
    zoom: {
      initial: { scale: 1.15, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { duration: 1.2, ease: easing },
    },
    parallax: {
      initial: { y: 50, opacity: 0, scale: 1.05 },
      animate: { y: 0, opacity: 1, scale: 1 },
      transition: { duration: 1, ease: easing },
    },
    "fade-scale": {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { duration: 0.7, ease: easing },
    },
  };

  const anim = animations[animationType] || animations["slide-up"];

  return (
    <section className={`relative ${height} flex items-center justify-center overflow-hidden ${className}`}>
      <motion.div
        {...anim}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      {showPattern && <div className="absolute inset-0 bg-pattern opacity-20" />}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 via-transparent to-transparent" />

      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: easing }}
          className="text-7xl mb-6 animate-float"
        >
          🍕
        </motion.div>
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7, ease: easing }}
          className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg"
          style={{ textShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7, ease: easing }}
          className="text-xl md:text-2xl max-w-2xl mx-auto font-light"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
        >
          {subtitle}
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20 md:h-24">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

export const HERO_IMAGES = {
  about: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80",
  menu: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1920&q=80",
  contact: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1920&q=80",
  order: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1920&q=80",
  admin: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1920&q=80",
};