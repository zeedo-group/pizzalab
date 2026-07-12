"use client";

import { motion } from "framer-motion";
import { Pizza } from "lucide-react";
import Image from "next/image";

interface MenuCardProps {
  name: string;
  description: string;
  price: number;
  image?: { asset?: { url?: string } };
  popular?: boolean;
  onAddToCart: () => void;
}

export default function MenuCard({ name, description, price, image, popular, onAddToCart }: MenuCardProps) {
  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      <div className="relative h-56 bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
        {image?.asset?.url ? (
          <Image 
            src={image.asset.url} 
            alt={name} 
            fill 
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
            🍕
            <span className="text-xs text-amber-700 mt-2 font-medium">[Add pizza image]</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {popular && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-4 right-4 bg-shiny-orange text-white text-sm px-4 py-1.5 rounded-full font-bold shadow-lg"
          >
            Popular
          </motion.span>
        )}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddToCart}
          className="absolute bottom-4 left-4 right-4 bg-white text-amber-600 py-3 rounded-xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:bg-shiny-orange hover:text-white flex items-center justify-center gap-2"
        >
          <Pizza className="w-5 h-5" />
          Add to Cart
        </motion.button>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
            {name}
          </h3>
          <span className="text-2xl font-bold bg-shiny-orange bg-clip-text text-transparent">
            ${price}
          </span>
        </div>
        <p className="text-gray-600 leading-relaxed line-clamp-2">{description}</p>
      </div>
    </motion.div>
  );
}
