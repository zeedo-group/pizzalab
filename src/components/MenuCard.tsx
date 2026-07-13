"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface MenuCardProps {
  name: string;
  description: string;
  price: number;
  image?: { asset?: { url?: string } } | string;
  popular?: boolean;
  onAddToCart: () => void;
}

function getImageUrl(image?: { asset?: { url?: string } } | string): string | undefined {
  if (!image) return undefined;
  if (typeof image === "string") return image;
  return image.asset?.url;
}

const fallbackMenuImages = [
  "/images/pizza-closeup.jpg",
  "/images/pizza-truffle.jpg",
  "/images/pizza-pepperoni.jpg",
  "/images/pizza-white.jpg",
  "/images/pizza-veg.jpg",
  "/images/pizza-meat.jpg",
];

function getFallbackImage(name: string): string {
  const normalized = name.toLowerCase();

  if (normalized.includes("truffle") || normalized.includes("mushroom")) return "/images/pizza-truffle.jpg";
  if (normalized.includes("pepperoni")) return "/images/pizza-pepperoni.jpg";
  if (normalized.includes("vegan") || normalized.includes("veg")) return "/images/pizza-veg.jpg";
  if (normalized.includes("seafood")) return "/images/pizza-seafood.jpg";
  if (normalized.includes("meat") || normalized.includes("bbq") || normalized.includes("chicken")) return "/images/pizza-meat.jpg";
  if (normalized.includes("white") || normalized.includes("cheese")) return "/images/pizza-white.jpg";

  const index = Math.abs(name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)) % fallbackMenuImages.length;
  return fallbackMenuImages[index];
}

export default function MenuCard({ name, description, price, image, popular, onAddToCart }: MenuCardProps) {
  const imageUrl = getImageUrl(image);
  const fallbackImage = getFallbackImage(name);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group bg-charcoal-slate border border-outline-variant/10 rounded-xl overflow-hidden hover:border-secondary/30 transition-all duration-300"
    >
      <div className="h-64 overflow-hidden relative">
        <Image
          src={imageUrl || fallbackImage}
          alt={name}
          fill
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {popular && (
          <span className="absolute top-4 right-4 bg-award-gold text-on-primary-fixed px-3 py-1 rounded-full text-label-md font-label-md uppercase tracking-tighter">
            Bestseller
          </span>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-headline-md text-headline-md text-flour-white">{name}</h4>
          <span className="text-secondary font-headline-md text-headline-md">${price.toFixed(2)}</span>
        </div>
        <p className="text-on-surface-variant font-body-md text-body-md mb-6 leading-relaxed">
          {description}
        </p>
        <button
          onClick={onAddToCart}
          className="w-full py-3 border border-award-gold/40 text-award-gold rounded-lg font-label-lg text-label-lg hover:bg-award-gold hover:text-on-primary-fixed transition-colors"
        >
          Quick Add
        </button>
      </div>
    </motion.div>
  );
}
