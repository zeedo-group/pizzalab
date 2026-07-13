"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const FRAME_COUNT = 188;
const FRAME_DURATION = 50;

export function HeroAnimation() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev >= FRAME_COUNT ? 1 : prev + 1));
    }, FRAME_DURATION);

    const img = new Image();
    img.src = `/hero-animation/ezgif-frame-${String(FRAME_COUNT).padStart(3, "0")}.jpg`;
    img.onload = () => setIsLoaded(true);

    return () => clearInterval(interval);
  }, []);

  const frameSrc = `/hero-animation/ezgif-frame-${String(currentFrame).padStart(3, "0")}.jpg`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${frameSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-transparent to-transparent" />

      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="text-8xl mb-4 animate-bounce" style={{ animationDuration: "3s" }}>🍕</div>
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold mb-6 drop-shadow-2xl"
          style={{ textShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
        >
          Pizza Lab
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-3xl mb-8 max-w-3xl mx-auto font-light"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
        >
          Authentic Italian flavors, crafted with passion and the finest ingredients.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link
            href="/menu"
            className="group bg-white text-amber-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/50 hover:scale-105 flex items-center justify-center gap-2"
          >
            View Menu <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/order"
            className="border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-amber-600 transition-all shadow-2xl hover:scale-105"
          >
            Order Now
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}