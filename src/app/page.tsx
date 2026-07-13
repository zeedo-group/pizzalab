"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Flame, Clock, Award } from "lucide-react";
import { HeroAnimation } from "@/components/HeroAnimation";

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Animation Section */}
      <HeroAnimation />

      {/* Image Gallery Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-aurora-subtle" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 text-aurora-gradient">
              Experience Pizza Lab
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A glimpse into our world of authentic Italian pizza
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Our Kitchen", emoji: "👨‍🍳", desc: "Watch our pizzas being crafted" },
              { title: "Fresh Ingredients", emoji: "🍅", desc: "Only the finest imports" },
              { title: "Wood Fired Oven", emoji: "🔥", desc: "900°F authentic brick oven" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-64 placeholder-image text-6xl">
                  {item.emoji}
                </div>
                <div className="p-6 bg-gradient-to-br from-amber-50 to-white">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                  <p className="text-xs text-amber-600 mt-2 font-medium">[Image placeholder - add your photo here]</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-amber-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-aurora-subtle opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 text-aurora-gradient">
              Why Choose Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We bring you the authentic taste of Italy with a modern twist
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Flame, 
                title: "Wood Fired", 
                desc: "Authentic brick oven cooking at 900°F for that perfect char and flavor",
                color: "from-amber-400 to-orange-500"
              },
              { 
                icon: Clock, 
                title: "Fast Delivery", 
                desc: "Hot and fresh to your door in 30 minutes or it's free",
                color: "from-aurora-green to-aurora-blue"
              },
              { 
                icon: Award, 
                title: "Award Winning", 
                desc: "Voted best pizza in the city 2024 - three years running",
                color: "from-aurora-purple to-aurora-pink"
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <div className="relative">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-shiny-orange animate-gradient" />
        <div className="absolute inset-0 bg-pattern opacity-20" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Taste the Magic?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Order now and experience the perfect blend of tradition and innovation
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-white text-amber-600 px-10 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-xl hover:scale-105"
            >
              Explore Menu <ChevronRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
