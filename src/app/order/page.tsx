"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { CreditCard, Lock, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

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
    <div className="pt-24 pb-12">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600 animate-gradient" />
        <div className="absolute inset-0 bg-pattern opacity-20" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-7xl mb-6 animate-float"
          >
            💳
          </motion.div>
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
              Order Online
            </h1>
            <p className="text-xl text-white/90">
              Secure checkout powered by Stripe
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <AnimatedSection delay={0.2}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-8 h-8 text-red-600" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
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
                      className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-red-200 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl flex items-center justify-center text-3xl">
                          {item.image?.asset?.url ? (
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
                      <p className="font-bold text-xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="border-t-2 border-dashed border-gray-200 pt-6 mb-8">
                  <div className="flex justify-between items-center text-2xl font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  disabled={loading || state.items.length === 0}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-5 rounded-2xl font-bold text-xl hover:from-red-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
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
