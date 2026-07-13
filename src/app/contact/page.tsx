"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const localImages = {
  heroOven: "/images/wood-oven.jpg",
  mapLocation: "/images/kitchen-interior.jpg",
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative h-[400px] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center parallax-bg brightness-[0.4]"
            style={{
              backgroundImage: `url(${localImages.heroOven})`,
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
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed"
            >
              Whether you have a question about our fermentation process or want to book a private event, our lab doors are always open for conversation.
            </motion.p>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-on-surface-variant"
        >
          <span className="font-label-md text-label-md uppercase tracking-widest opacity-60">Scroll</span>
          <span className="material-symbols-outlined animate-bounce">expand_more</span>
        </motion.div>
      </motion.section>

      {/* Contact Form & Info */}
      <motion.main
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pt-20 pb-20 bg-mesh-dark"
      >
        <div className="max-w-container-max mx-auto px-margin-desktop">
          {/* Header */}
          <motion.header
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-16"
          >
            <h1 className="font-display-lg text-display-lg text-flour-white mb-4">Get in Touch</h1>
            <div className="w-24 h-1 bg-oven-ember" />
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-8 max-w-2xl">
              Whether you have a question about our fermentation process or want to book a private event, our lab doors are always open for conversation.
            </p>
          </motion.header>

          {/* Two-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left: Contact Form */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="lg:col-span-7 bg-charcoal-slate p-8 md:p-12 border border-outline-variant/30 rounded-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-[120px]">local_pizza</span>
              </div>
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col space-y-2">
                    <label className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-transparent border-0 border-b border-outline-variant/50 py-3 text-flour-white focus:ring-0 focus:border-oven-ember transition-all placeholder:text-outline-variant"
                      placeholder="Enzo Ferrari"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-transparent border-0 border-b border-outline-variant/50 py-3 text-flour-white focus:ring-0 focus:border-oven-ember transition-all placeholder:text-outline-variant"
                      placeholder="enzo@example.it"
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-transparent border-0 border-b border-outline-variant/50 py-3 text-flour-white focus:ring-0 focus:border-oven-ember transition-all placeholder:text-outline-variant"
                    placeholder="Private Lab Reservation"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-transparent border-0 border-b border-outline-variant/50 py-3 text-flour-white focus:ring-0 focus:border-oven-ember transition-all placeholder:text-outline-variant resize-none"
                    placeholder="Tell us what's on your mind..."
                    rows={4}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-oven-ember text-flour-white px-10 py-4 rounded-lg font-label-lg text-label-lg uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all w-full md:w-auto"
                  disabled={submitted}
                >
                  {submitted ? "Message Sent!" : "Send Message"}
                </button>
              </form>
            </motion.div>

            {/* Right: Contact Info & Map */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5 space-y-12"
            >
              {/* Info Cards */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="space-y-8"
              >
                <div className="flex items-start space-x-6 group">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-award-gold border border-outline-variant/20 transition-all group-hover:bg-award-gold group-hover:text-surface-container-lowest">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-flour-white mb-1">Laboratory Address</h3>
                    <p className="text-on-surface-variant font-body-md">123 Pizza Street, Naples District<br/>New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6 group">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-award-gold border border-outline-variant/20 transition-all group-hover:bg-award-gold group-hover:text-surface-container-lowest">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-flour-white mb-1">Hotline</h3>
                    <p className="text-on-surface-variant font-body-md">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6 group">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-award-gold border border-outline-variant/20 transition-all group-hover:bg-award-gold group-hover:text-surface-container-lowest">
                    <span className="material-symbols-outlined">alternate_email</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-flour-white mb-1">Digital Mail</h3>
                    <p className="text-on-surface-variant font-body-md">hello@pizzalab.com</p>
                  </div>
                </div>
              </motion.div>

              {/* Business Hours */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-surface-container-low p-8 border border-outline-variant/10 rounded-xl"
              >
                <h3 className="font-headline-md text-headline-md text-award-gold mb-6 flex items-center">
                  <span className="material-symbols-outlined mr-3">schedule</span>
                  Business Hours
                </h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
                    <span className="font-label-lg text-on-surface">Monday - Thursday</span>
                    <span className="text-on-surface-variant">11:00 AM - 10:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
                    <span className="font-label-lg text-on-surface">Friday - Saturday</span>
                    <span className="text-on-surface-variant">11:00 AM - 11:30 PM</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-label-lg text-on-surface">Sunday</span>
                    <span className="text-on-surface-variant">12:00 PM - 9:00 PM</span>
                  </li>
                </ul>
              </motion.div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl overflow-hidden border border-outline-variant/30 grayscale hover:grayscale-0 transition-all duration-700 h-64 relative group"
              >
                <Image
                  src={localImages.mapLocation}
                  alt="A highly detailed, cinematic drone view of a vibrant New York City street corner featuring the modern industrial storefront of Pizza Lab at dusk. Warm amber light glows from the large industrial windows, spilling onto the charcoal-colored sidewalk. The architectural style is a mix of exposed red brick and sleek black steel frames, perfectly capturing the professional yet warm atmosphere of the brand. Cinematic lighting creates long, soft shadows and highlights the high-contrast textures of the city."
                  fill
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-background/40 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity">
                  <div className="bg-charcoal-slate/80 backdrop-blur-sm px-6 py-3 rounded-full border border-award-gold/30 text-award-gold font-label-lg">
                    NYC Laboratory Location
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </div>
  );
}