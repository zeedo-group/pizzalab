"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Users, ChefHat, Heart, Star } from "lucide-react";
import { AnimatedHero, HERO_IMAGES } from "@/components/AnimatedHero";

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero Section with Animated Image */}
      <AnimatedHero
        title="Our Story"
        subtitle="Bringing authentic Italian pizza to your neighborhood since 2015"
        imageUrl={HERO_IMAGES.about}
        imageAlt="Italian pizzeria interior with wood fired oven"
        animationType="parallax"
        height="h-[500px]"
      />

      {/* Story Section */}
      <section className="py-24 bg-gradient-to-b from-white to-amber-50 relative">
        <div className="absolute inset-0 bg-aurora-subtle opacity-30" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <div className="prose prose-lg mx-auto text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="text-6xl mb-8"
              >
                🇮🇹
              </motion.div>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed text-left">
                Pizza Lab started with a simple mission: to bring the authentic taste of Naples to our community.
                Our founder, Chef Marco, grew up in a small town outside Naples where pizza-making was a family tradition
                passed down through generations.
              </p>
              <p className="text-lg text-gray-700 mb-12 leading-relaxed text-left">
                Today, we continue that tradition using imported Italian flour, San Marzano tomatoes,
                and fresh mozzarella. Every pizza is hand-tossed and wood-fired to perfection in our custom brick oven.
              </p>
            </div>
          </AnimatedSection>

          {/* Image placeholder */}
          <AnimatedSection delay={0.2}>
            <div className="mb-16">
              <div className="h-80 w-full placeholder-image text-6xl rounded-3xl">
                👨‍🍳
              </div>
              <p className="text-center text-amber-600 text-sm mt-3 font-medium">[Add chef/kitchen photo here]</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Users, 
                title: "Community", 
                desc: "We believe in bringing people together over great food.",
                emoji: "👥"
              },
              { 
                icon: ChefHat, 
                title: "Craftsmanship", 
                desc: "Every pizza is made by hand with care and precision.",
                emoji: "👨‍🍳"
              },
              { 
                icon: Heart, 
                title: "Passion", 
                desc: "We pour our hearts into every pie we serve.",
                emoji: "❤️"
              },
            ].map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.2}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-gray-100"
                >
                  <div className="text-5xl mb-4">{value.emoji}</div>
                  <value.icon className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-shiny-orange relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "50+", label: "Pizza Varieties" },
              { number: "8", label: "Years Experience" },
              { number: "4.9", label: "Average Rating" },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/80 text-lg">
                    {stat.label}
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
