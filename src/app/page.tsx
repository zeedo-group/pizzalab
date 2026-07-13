"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/pizza-closeup.jpg')",
            }}
            data-alt="A cinematic, top-down high-fidelity photograph of an authentic Neapolitan pizza with charred crust bubbles and fresh bubbling mozzarella. The scene is set in a dark, moody industrial kitchen with low-key lighting and warm amber glows coming from a wood-fired oven in the background. The aesthetic is professional and sophisticated, featuring rich textures of flour dusting and fresh basil leaves on a charcoal slate surface."
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>
        <div className="relative z-10 px-margin-desktop max-w-container-max mx-auto w-full">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-display-lg text-display-lg text-flour-white mb-6 leading-tight"
            >
              Authentic Italian flavors,{" "}
              <span className="text-oven-ember">crafted with passion.</span>
            </motion.h1>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <Link href="/order">
                <button className="bg-oven-ember text-flour-white px-10 py-4 rounded-lg font-label-lg text-label-lg font-bold hover:brightness-110 active:scale-95 transition-all">
                  Order Now
                </button>
              </Link>
              <Link href="/menu">
                <button className="border border-award-gold text-award-gold px-10 py-4 rounded-lg font-label-lg text-label-lg font-bold hover:bg-award-gold/10 active:scale-95 transition-all">
                  View Menu
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <span className="material-symbols-outlined text-outline">expand_more</span>
        </motion.div>
      </header>

      {/* Features: Experience Pizza Lab */}
      <section className="py-24 bg-surface px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
          >
            <div>
              <span className="text-award-gold font-label-lg text-label-lg uppercase tracking-widest mb-4 block">The Process</span>
              <h2 className="font-headline-lg text-headline-lg text-flour-white">Experience Pizza Lab</h2>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
              We combine the raw precision of a laboratory with the soul of Neapolitan heritage to deliver the perfect slice every time.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Our Kitchen */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative overflow-hidden rounded-xl h-[500px]"
            >
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: "url('/images/kitchen-interior.jpg')",
                }}
                data-alt="A wide-angle shot of a modern industrial professional kitchen with stainless steel workstations and warm pendant lighting. Chefs in dark aprons are meticulously preparing artisanal pizza dough in a clean, sophisticated environment dominated by charcoal slates and dark metals. The atmosphere is professional, authoritative, and focused on culinary precision."
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="font-headline-md text-headline-md text-flour-white mb-2">Our Kitchen</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Precision in every step of the culinary journey.</p>
              </div>
            </motion.div>
            {/* Fresh Ingredients */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative overflow-hidden rounded-xl h-[500px]"
            >
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: "url('/images/ingredients.jpg')",
                }}
                data-alt="A high-contrast macro shot of vibrant red San Marzano tomatoes, fresh green basil leaves, and artisanal buffalo mozzarella balls on a dark stone surface. Soft natural lighting highlights the dewy textures and vivid colors of the ingredients, emphasizing freshness and quality. The color palette features deep greens, rich reds, and creamy whites against a charcoal background."
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="font-headline-md text-headline-md text-flour-white mb-2">Fresh Ingredients</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Sourced directly from the heart of Italian soil.</p>
              </div>
            </motion.div>
            {/* Wood Fired Oven */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative overflow-hidden rounded-xl h-[500px]"
            >
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: "url('/images/wood-fire-oven.jpg')",
                }}
                data-alt="A close-up view of a traditional stone wood-fired oven with glowing orange embers and dancing flames inside. The intense heat is visible through the shimmering air, illuminating the rough texture of the dark stone oven. The mood is warm and grounded, evoking the ancient tradition of Neapolitan pizza making in a sophisticated dark-mode setting."
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="font-headline-md text-headline-md text-flour-white mb-2">Wood Fired Oven</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">The heart where the magic happens at 900°F.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us: Bento Grid Cards */}
      <section className="py-24 bg-surface-container-low px-margin-desktop">
        <div className="max-w-container-max mx-auto text-center mb-16">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="font-display-lg text-display-lg text-flour-white mb-4"
          >
            Why Choose Us
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-oven-ember mx-auto"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter max-w-container-max mx-auto">
          {/* Card 1 */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-charcoal-slate border border-outline-variant/30 p-10 flex flex-col items-center text-center hover:border-award-gold/50 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-oven-ember/10 flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-oven-ember text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-flour-white mb-4">Wood Fired (900°F)</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Authentic Neapolitan heat that flash-cooks your pizza in 90 seconds for that perfect leopard-spotted crust.</p>
          </motion.div>
          {/* Card 2 */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-charcoal-slate border border-outline-variant/30 p-10 flex flex-col items-center text-center hover:border-award-gold/50 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-basil-green/10 flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-basil-green text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>speed</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-flour-white mb-4">Fast Delivery (30 mins)</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Hot, fresh, and delivered with surgical precision within 30 minutes. We treat every order as a priority mission.</p>
          </motion.div>
          {/* Card 3 */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-charcoal-slate border border-outline-variant/30 p-10 flex flex-col items-center text-center hover:border-award-gold/50 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-award-gold/10 flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-award-gold text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-flour-white mb-4">Award Winning (2024)</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Recognized as the premier artisanal pizza destination for our commitment to quality and tradition.</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
        <div className="relative z-10 px-margin-desktop max-w-container-max mx-auto text-center">
          <h2 className="font-display-lg text-display-lg text-flour-white mb-8">Ready to Taste the Magic?</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-xl mx-auto">
            Join us for a culinary experience that blends scientific precision with traditional Italian artistry. Your perfect pizza is just a click away.
          </p>
          <Link href="/menu">
            <button className="bg-oven-ember text-flour-white px-12 py-5 rounded-lg font-headline-md text-headline-md font-bold hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-oven-ember/20">
              Explore Menu
            </button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
