"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { AnimatedHero, HERO_IMAGES } from "@/components/AnimatedHero";

export default function ContactPage() {
  return (
    <div className="pt-16">
      <AnimatedHero
        title="Visit Us"
        subtitle="We would love to see you at our pizzeria"
        imageUrl={HERO_IMAGES.contact}
        imageAlt="Pizza restaurant interior with cozy seating"
        animationType="slide-right"
        height="h-[400px]"
      />

      <section className="py-24 bg-gradient-to-b from-white to-amber-50 relative">
        <div className="absolute inset-0 bg-aurora-subtle opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100"
              >
                <h2 className="text-4xl font-bold mb-8 bg-shiny-orange bg-clip-text text-transparent">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {[
                    { icon: MapPin, label: "Address", value: "123 Pizza Street, Food City, FC 12345" },
                    { icon: Phone, label: "Phone", value: "(555) 123-4567" },
                    { icon: Mail, label: "Email", value: "hello@pizzalab.com" },
                    { 
                      icon: Clock, 
                      label: "Hours", 
                      value: "Mon - Thu: 11:00 AM - 10:00 PM\nFri - Sat: 11:00 AM - 12:00 AM\nSunday: 12:00 PM - 9:00 PM" 
                    },
                  ].map((item) => (
                    <motion.div 
                      key={item.label}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-amber-50 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-shiny-orange flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">{item.label}</p>
                        <p className="text-gray-600 whitespace-pre-line">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-3xl p-4 shadow-xl border border-gray-100 h-full"
              >
                <div className="w-full h-full min-h-[500px] rounded-2xl overflow-hidden bg-amber-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🗺️</div>
                    <p className="text-amber-700 font-medium">Google Maps Integration</p>
                    <p className="text-amber-600 text-sm mt-1">Add your Google Maps embed iframe here</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}