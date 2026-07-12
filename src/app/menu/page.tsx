"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MenuCard from "@/components/MenuCard";
import AnimatedSection from "@/components/AnimatedSection";
import { useCart } from "@/context/CartContext";
import { Pizza } from "lucide-react";

interface PizzaData {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: { asset?: { url?: string } };
  popular?: boolean;
  category: string;
}

export default function MenuPage() {
  const [pizzas, setPizzas] = useState<PizzaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const res = await fetch("/api/menu");
        const data = await res.json();
        setPizzas(data);
      } catch (error) {
        console.error("Failed to fetch pizzas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPizzas();
  }, []);

  const categories = ["all", ...new Set(pizzas.map((p) => p.category))];
  const filtered = activeCategory === "all" ? pizzas : pizzas.filter((p) => p.category === activeCategory);

  const addToCart = (pizza: PizzaData) => {
    dispatch({ type: "ADD_ITEM", payload: { ...pizza, quantity: 1 } });
  };

  return (
    <div className="pt-24 pb-12">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 animate-gradient" />
        <div className="absolute inset-0 bg-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-7xl mb-6 animate-float"
          >
            🍕
          </motion.div>
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
              Our Menu
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              From classic Margherita to our signature creations, every pizza is made fresh to order.
            </p>
          </AnimatedSection>
        </div>
      </section>

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
                  ? "bg-gradient-to-r from-red-600 to-orange-600 text-white"
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
              className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full"
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
