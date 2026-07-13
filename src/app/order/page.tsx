"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { CreditCard, Lock, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { AnimatedHero, HERO_IMAGES } from "@/components/AnimatedHero";

export default function OrderPage() {
  const { state, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (state.items.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: state.items }),
      });
      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 pb-12">
      <AnimatedHero
        title="Order Online"
        subtitle="Secure checkout powered by Stripe"
        imageUrl={HERO_IMAGES.order}
        imageAlt="Pizza delivery order"
        animationType="zoom"
        height="h-[400px]"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <AnimatedSection delay={0.2}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-8 h-8 text-amber-500" />
              <h2 className="text-3xl font-bold bg-shiny-orange bg-clip-text text-transparent">
                Your Order
              </h2>
            </div>
            
            {state.items.length === 0 ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-16"
              >
                <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <p className="text-gray-400 mt-2">Add items from our menu to get started!</p>
              </motion.div>
            ) : (
              <>
                <div className="space-y-4 mb-8">
                  {state.items.map((item, i) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between p-5 bg-gradient-to-r from-amber-50 to-white rounded-2xl border border-gray-100 hover:border-amber-200 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center text-3xl">
                          {typeof item.image === "string" ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                          ) : item.image?.asset?.url ? (
                            <img src={item.image.asset.url} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                          ) : (
                            "🍕"
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                          <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-bold text-xl bg-shiny-orange bg-clip-text text-transparent">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="border-t-2 border-dashed border-gray-200 pt-6 mb-8">
                  <div className="flex justify-between items-center text-2xl font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="bg-shiny-orange bg-clip-text text-transparent">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  disabled={loading || state.items.length === 0}
                  className="w-full bg-shiny-orange text-white py-5 rounded-2xl font-bold text-xl hover:opacity-90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-6 h-6" />
                      Pay ${totalPrice.toFixed(2)}
                    </>
                  )}
                </motion.button>
                <div className="flex items-center justify-center gap-2 mt-6 text-gray-500 text-sm">
                  <Lock className="w-4 h-4" />
                  Secure checkout powered by Stripe
                </div>
              </>
            )}
          </motion.div>
        </AnimatedSection>
      </div>
    </div>
  );
}