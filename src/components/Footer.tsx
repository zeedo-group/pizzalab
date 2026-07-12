"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-auto overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-aurora-purple/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold bg-shiny-orange bg-clip-text text-transparent mb-4">
                Pizza Lab
              </h3>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Crafting the perfect pizza with passion and premium ingredients since 2015.
                Every slice tells a story of tradition and innovation.
              </p>
              <div className="flex gap-4">
                {["Facebook", "Instagram", "Twitter"].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-shiny-orange transition-all text-sm font-medium"
                  >
                    {social[0]}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { href: "/menu", label: "Menu" },
                  { href: "/about", label: "About Us" },
                  { href: "/contact", label: "Contact" },
                  { href: "/order", label: "Order Online" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-amber-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-lg font-bold mb-6 text-white">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400">
                  <span className="text-amber-500 mt-1">📍</span>
                  <span>123 Pizza Street, Food City, FC 12345</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <span className="text-amber-500 mt-1">📞</span>
                  <span>(555) 123-4567</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <span className="text-amber-500 mt-1">✉️</span>
                  <span>hello@pizzalab.com</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500">
            Pizza Lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
