"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import MenuCard from "@/components/MenuCard";
import AnimatedSection from "@/components/AnimatedSection";
import { useCart } from "@/context/CartContext";

interface PizzaData {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: { asset?: { url?: string } } | string;
  popular?: boolean;
  category: string;
}

const localMenuImages = [
  "/images/pizza-truffle.jpg",
  "/images/pizza-pepperoni.jpg",
  "/images/pizza-vegan.jpg",
  "/images/pizza-seafood.jpg",
  "/images/pizza-meat.jpg",
  "/images/pizza-white.jpg",
  "/images/pizza-veg.jpg",
  "/images/pizza-closeup.jpg",
  "/images/ingredients.jpg",
  "/images/kitchen-interior.jpg",
  "/images/wood-oven.jpg",
  "/images/chef-hands.jpg",
];

export default function MenuPage() {
  const [pizzas, setPizzas] = useState<PizzaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Signature Pizzas");
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

  const categories = ["Signature Pizzas", "Build Your Own", "Sides", "Drinks"];
  const filtered = pizzas.filter((p) => p.category === "signature" || p.category === "classic" || p.category === "specialty" || p.category === "sides");

  const addToCart = (pizza: PizzaData) => {
    dispatch({ type: "ADD_ITEM", payload: { ...pizza, quantity: 1 } });
  };

  return (
    <div className="pt-24 pb-12">
      {/* Hero Header */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-margin-desktop py-20 max-w-container-max mx-auto text-center border-b border-outline-variant/10"
      >
        <h1 className="font-display-lg text-display-lg mb-6 text-flour-white">Our Menu</h1>
        <p className="font-body-lg text-body-lg max-w-2xl mx-auto text-on-surface-variant">
          Every creation at Pizza Lab is a product of scientific precision and Neapolitan soul. We utilize a 72-hour fermentation process and 900°F wood-fired ovens to achieve the perfect leopard-spotted crust.
        </p>
      </motion.section>

      {/* Category Tabs */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="sticky top-[73px] z-40 bg-background/95 backdrop-blur-sm border-b border-outline-variant/20"
      >
        <div className="flex justify-center items-center gap-8 py-6 px-margin-desktop overflow-x-auto whitespace-nowrap scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-label-lg text-label-lg pb-2 transition-colors ${
                activeCategory === cat
                  ? "text-secondary border-b-2 border-secondary"
                  : "text-on-surface-variant hover:text-flour-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Specialty Highlight: Bento Section */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="px-margin-desktop py-16 max-w-container-max mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-8 group relative overflow-hidden rounded-xl border border-outline-variant/20 bg-charcoal-slate transition-all hover:border-award-gold/50 h-[450px]">
            <div className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${localMenuImages[0]})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute top-6 left-6 z-10">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-award-gold text-on-primary-fixed font-label-lg text-label-lg uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                Chef's Choice
              </span>
            </div>
            <div className="absolute bottom-10 left-10 z-10 max-w-lg">
              <h3 className="font-headline-lg text-headline-lg text-flour-white mb-2">The Truffle Alchemy</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                A decadent blend of black truffle cream, buffalo mozzarella, wild porcini mushrooms, and 24-month aged Parmigiano Reggiano. Finished with a drizzle of white truffle oil.
              </p>
              <div className="flex items-center gap-6">
                <span className="font-headline-md text-headline-md text-secondary">$24.00</span>
                <button className="bg-oven-ember text-flour-white px-8 py-3 rounded-lg font-label-lg text-label-lg hover:brightness-110 transition-all flex items-center gap-2">
                  Add to Order
                  <span className="material-symbols-outlined">shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-center p-10 bg-basil-green/10 rounded-xl border border-basil-green/30">
            <span className="material-symbols-outlined text-basil-green text-5xl mb-4">potted_plant</span>
            <h4 className="font-headline-md text-headline-md text-basil-green mb-4">Plant-Based Mastery</h4>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              We don't compromise. Our house-made cashew mozzarella and fermentation-led dough ensure every vegan option is a scientific marvel of flavor.
            </p>
            <Link href="/menu" className="text-basil-green font-label-lg text-label-lg flex items-center gap-2 hover:underline">
              Explore Vegan Menu
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Menu Grid */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="px-margin-desktop py-16 max-w-container-max mx-auto"
      >
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="font-headline-lg text-headline-lg text-flour-white">Signature Pizzas</h2>
          <span className="text-on-surface-variant font-label-md text-label-md uppercase tracking-widest">12 Items</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filtered.map((pizza, i) => (
            <motion.div
              key={pizza._id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-charcoal-slate border border-outline-variant/10 rounded-xl overflow-hidden hover:border-secondary/30 transition-all duration-300"
            >
              <div className="h-64 overflow-hidden relative">
                <Image
                  src={localMenuImages[i % localMenuImages.length]}
                  alt={pizza.name}
                  fill
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {(pizza.category === "classic" || pizza.popular) && (
                  <span className="absolute top-4 right-4 bg-basil-green/90 text-flour-white px-3 py-1 rounded-full text-label-md font-label-md">
                    Vegetarian
                  </span>
                )}
                {pizza.popular && (
                  <span className="absolute top-4 right-4 bg-award-gold text-on-primary-fixed px-3 py-1 rounded-full text-label-md font-label-md uppercase tracking-tighter">
                    Bestseller
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-headline-md text-headline-md text-flour-white">{pizza.name}</h4>
                  <span className="text-secondary font-headline-md text-headline-md">${pizza.price.toFixed(2)}</span>
                </div>
                <p className="text-on-surface-variant font-body-md text-body-md mb-6 leading-relaxed">
                  {pizza.description}
                </p>
                <button
                  onClick={() => addToCart(pizza)}
                  className="w-full py-3 border border-award-gold/40 text-award-gold rounded-lg font-label-lg text-label-lg hover:bg-award-gold hover:text-on-primary-fixed transition-colors"
                >
                  Quick Add
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Process Highlight: Visual Break */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="bg-surface-container-lowest py-24 border-y border-outline-variant/20"
      >
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-secondary text-5xl mb-6">science</span>
            <h5 className="font-headline-md text-headline-md text-flour-white mb-2">72-Hour Ferment</h5>
            <p className="font-body-md text-body-md text-on-surface-variant">Precision temperature control for a lighter, more digestible dough.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-secondary text-5xl mb-6">local_fire_department</span>
            <h5 className="font-headline-md text-headline-md text-flour-white mb-2">900°F Volcanic Ovens</h5>
            <p className="font-body-md text-body-md text-on-surface-variant">Imported stone hearths from Vesuvius for that authentic leopard crust.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-secondary text-5xl mb-6">agriculture</span>
            <h5 className="font-headline-md text-headline-md text-flour-white mb-2">Direct Trade Imports</h5>
            <p className="font-body-md text-body-md text-on-surface-variant">We source tomatoes and oil directly from small farms in Campania.</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}