"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MenuCard from "@/components/MenuCard";
import AnimatedSection from "@/components/AnimatedSection";
import { useCart } from "@/context/CartContext";
import { AnimatedHero, HERO_IMAGES } from "@/components/AnimatedHero";

interface PizzaData {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: { asset?: { url?: string } } | string;
  popular?: boolean;
  category: string;
}

export default function MenuPage() {
  const [pizzas, setPizzas] = useState<PizzaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const { dispatch } = useCart();

  useEffect(() => {
    const loadPizzas = async () => {
      try {
        const localPizzas = localStorage.getItem("pizzaLabMenu");
        if (localPizzas) {
          const parsed = JSON.parse(localPizzas);
          setPizzas(parsed);
          setLoading(false);
          return;
        }

        const res = await fetch("/api/menu");
        const data = await res.json();
        setPizzas(data);
      } catch (error) {
        console.error("Failed to fetch pizzas:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPizzas();
  }, []);

  const categories = ["all", ...new Set(pizzas.map((p) => p.category))];
  const filtered = activeCategory === "all" ? pizzas : pizzas.filter((p) => p.category === activeCategory);

  const addToCart = (pizza: PizzaData) => {
    dispatch({ type: "ADD_ITEM", payload: { ...pizza, quantity: 1 } });
  };

  return (
    <div className="pt-16">
      {/* Hero Section with Animated Image */}
      <AnimatedHero
        title="Our Menu"
        subtitle="From classic Margherita to our signature creations, every pizza is made fresh to order."
        imageUrl={HERO_IMAGES.menu}
        imageAlt="Variety of artisan pizzas on wooden table"
        animationType="zoom"
        height="h-[450px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Category Filters */}
        <AnimatedSection className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full font-semibold transition-all shadow-lg ${
                activeCategory === cat
                  ? "bg-shiny-orange text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </motion.button>
          ))}
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((pizza, i) => (
              <AnimatedSection key={pizza._id} delay={i * 0.1}>
                <MenuCard {...pizza} onAddToCart={() => addToCart(pizza)} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
