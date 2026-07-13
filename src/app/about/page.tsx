"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero Section: Our Story */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative h-[819px] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCbBEV2CTSCJkwZXIcmqmKwt5BsGvqkL9L_Y5NK2sz5d2_AM6ag1JJGAvsGa9thlyhhNWkgcSnH8LWNd5At_8xe-FmZmTBr8NpUc9hk8AniyyULvy3v0r1uk6sQleJJ9wUKLSfueebvDpFtl1EnrEH77PC0lIEnzmk0ZLInZf4lJdCQbsl9MSA5HXAMVxDLg6rsy6L_0TfI4H54GJicnBbOk5ItnQ92ieTUHCrf4gxQhMkRz0FXk7CY3Zr8WuMW4DBnBfQLIlSv35C5')",
              filter: "brightness(0.4)",
            }}
            data-alt="A cinematic, high-contrast close-up of an authentic wood-fired brick oven in a professional kitchen. Glowing orange embers and dancing flames illuminate the textured charcoal bricks. The scene is filled with a soft haze of heat and wood smoke, creating a sophisticated, industrial-chic atmosphere. The color palette is dominated by deep blacks, charcoal slates, and vibrant terracotta oranges, reflecting the professional and authoritative brand identity of Pizza Lab."
          />
        </div>
        <div className="relative z-10 px-margin-desktop max-w-container-max mx-auto w-full">
          <div className="max-w-2xl">
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block px-4 py-1 bg-basil-green text-basil-green bg-opacity-20 rounded-full font-label-md text-label-md uppercase tracking-widest mb-6"
            >
              Since 2015
            </motion.span>
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-display-lg text-display-lg text-flour-white mb-6"
            >
              Our Story
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed"
            >
              Where the raw precision of the lab meets the ancient warmth of the wood-fired hearth. We don't just make pizza; we engineer experiences.
            </motion.p>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-on-surface-variant">
          <span className="font-label-md text-label-md uppercase tracking-widest opacity-60">Scroll</span>
          <motion.span className="material-symbols-outlined animate-bounce">expand_more</motion.span>
        </div>
      </motion.section>

      {/* Narrative Section */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 px-margin-desktop bg-background"
      >
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="font-headline-lg text-headline-lg text-flour-white">Tradition, Decoded.</h2>
                <div className="h-1 w-20 bg-award-gold mt-4"></div>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mt-6">
                  Established in 2015, Pizza Lab was born from a singular obsession: the search for the perfect hydration ratio. We spent years in a literal workshop, testing flour varieties, fermentation timelines, and thermal dynamics until we found the "Golden Constant."
                </p>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  Today, we blend that technical rigor with a deep reverence for Neapolitan tradition. Every pizza is a hypothesis tested by fire, featuring ingredients sourced directly from small-scale volcanic farms in Campania and processed with modern culinary precision.
                </p>
              </motion.div>
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square bg-charcoal-slate rounded-xl border border-outline-variant/30 overflow-hidden shadow-2xl rotate-3">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZyNqu3QD5-JaagyBafb4T-EYTUPN3hwwRUNdh4TVzFuONirYmqywnZTHuDqsGcgZhYDkY0FVYuHsKVfWYr-B5bX5mA5X3FTZx_DwUTlx8fTRa3hHbpVpY8OIZNzVbWu1TI6zVkBUqYW47YgfU0VzHyOuUH19U8Aq1aWxfMvqhCddk84XfgSRFgM1zYRiIbvsjaN1zTksVQShB_4r7sUnVLs3VjeYLXjasaUDoypOTgDNh5SPVoY6n-p8cK0qnNuwxffiMTyvhaU3R"
                  alt="A top-down, high-fidelity photograph of a professional marble countertop covered in a light dusting of white flour. A pair of expert hands is stretching a soft, perfectly fermented pizza dough ball. Beside the dough are high-quality ingredients like vibrant red San Marzano tomatoes, fresh green basil leaves, and artisanal olive oil in a sleek glass bottle. The lighting is focused and moody, highlighting the tactile textures of the food against the dark slate background."
                  fill
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-8 -left-8 w-48 h-48 border-2 border-award-gold/20 -z-10 -rotate-6" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values: Bento Grid */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 bg-surface-container-lowest"
      >
        <div className="px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-headline-lg text-headline-lg text-flour-white mb-4"
            >
              The Pillars of the Lab
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="font-label-lg text-label-lg text-on-surface-variant"
            >
              Our core philosophy, baked into every crust.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1: Quality */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-10 bg-charcoal-slate border border-outline-variant/10 rounded-xl hover:border-award-gold/40 transition-all group"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-oven-ember/10 rounded-lg mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-oven-ember" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-flour-white mb-4">Uncompromising Quality</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">We source 100% of our grain from organic mills and select only the highest grade mozzarella di bufala, ensuring every bite is a standard-setter.</p>
            </motion.div>
            {/* Value 2: Tradition */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-10 bg-charcoal-slate border border-outline-variant/10 rounded-xl hover:border-basil-green/40 transition-all group"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-basil-green/10 rounded-lg mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-basil-green" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-flour-white mb-4">Authentic Tradition</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Our techniques are centuries old. From the 48-hour cold ferment to the 900°F flash-bake, we honor the Neapolitan masters who came before us.</p>
            </motion.div>
            {/* Value 3: Community */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-10 bg-charcoal-slate border border-outline-variant/10 rounded-xl hover:border-award-gold/40 transition-all group"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-award-gold/10 rounded-lg mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-award-gold" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-flour-white mb-4">Local Community</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">A lab is nothing without its collaborators. We partner with local urban farms for our seasonal toppings and host workshops for the neighborhood.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Team/Chef Section: Meet the Makers */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 px-margin-desktop bg-background overflow-hidden"
      >
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="w-full md:w-1/2 relative"
            >
              <div className="aspect-[4/5] bg-surface-container-high rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ8AV1UMBwRt6aGcvC0F0wDIVKVpkDKWkdK0vKcBG1grCLpZVMb1KJiEkZmcMa5arXTaSZoSezisl_wPqQOVKTCNvyVTlf6_mTVmzw_EWfVJD7sKV3vW2IwC4KXKfRfjSZQ46W0hyTG1i_TZbl7SX1jWo2ce0-6m4OrXWdjn6knuZzawPVh8XThn1KRTODsjiAWLpPM6Rid-ixXNm7oTLoY50xVt83_7Kgt1l_K4mPkw4d8EwPGczCFlwDGhccVd3wos-rw9GFbj6f"
                  alt="A sophisticated black and white portrait of a master pizzaiolo in a minimalist charcoal-colored apron. He is standing in a modern industrial kitchen with blurred stainless steel equipment in the background. His expression is focused and authoritative, holding a wooden pizza peel with expertise. The lighting is dramatic side-lighting that emphasizes the texture of his apron and the professional atmosphere. The image feels upscale and authentic, perfectly matching the Pizza Lab brand identity."
                  fill
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-award-gold p-8 rounded-lg shadow-xl hidden md:block">
                <span className="font-display-lg text-basil-green block leading-none">20+</span>
                <span className="font-label-lg text-basil-green uppercase tracking-tighter">Years of Craft</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full md:w-1/2 space-y-8"
            >
              <div className="space-y-2">
                <span className="text-award-gold font-label-lg text-label-lg uppercase tracking-[0.2em]">Meet the Makers</span>
                <h2 className="font-headline-lg text-headline-lg text-flour-white">Chef Marco Rossi</h2>
                <p className="text-on-surface-variant font-label-md text-label-md italic">Head Pizzaiolo & Founder</p>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Marco Rossi isn't just a chef; he's a culinary architect. Trained in the backstreets of Naples before pursuing a degree in food science, Marco founded Pizza Lab to bridge the gap between soulful cooking and technical excellence.
              </p>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                "The dough is a living organism," Marco says. "Our job in the Lab is to provide the perfect environment for it to thrive, then let the fire tell the rest of the story."
              </p>
              <div className="pt-8 flex gap-6">
                <Link href="#" className="text-on-surface-variant hover:text-award-gold transition-colors">
                  <span className="material-symbols-outlined">share</span>
                </Link>
                <Link href="#" className="text-on-surface-variant hover:text-award-gold transition-colors">
                  <span className="material-symbols-outlined">menu_book</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 px-margin-desktop bg-surface-container-low text-center"
      >
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="font-display-lg text-display-lg text-flour-white">Taste the Experiment.</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/menu">
              <button className="w-full sm:w-auto px-10 py-4 bg-oven-ember text-white rounded-lg font-label-lg text-label-lg font-bold hover:opacity-90 transition-all">
                View Current Menu
              </button>
            </Link>
            <Link href="/contact">
              <button className="w-full sm:w-auto px-10 py-4 border border-award-gold text-award-gold rounded-lg font-label-lg text-label-lg font-bold hover:bg-award-gold hover:text-on-secondary transition-all">
                Book a Table
              </button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}