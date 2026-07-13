"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Lock, ShoppingBag, Sparkles, Shield, Truck, RotateCcw } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function OrderPage() {
  const { state, totalPrice, dispatch } = useCart();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");

  const handleStripeCheckout = async () => {
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

  const handleBackToCart = () => setStep("cart");
  const handleContinueShopping = () => {
    dispatch({ type: "CLEAR_CART" });
    setStep("cart");
  };

  if (step === "success") {
    return (
      <div className="pt-24 pb-12 min-h-[70vh] flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/5 backdrop-blur-md border border-basil-green/30 rounded-3xl p-8 md:p-12 text-center max-w-md mx-auto px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 rounded-full bg-basil-green/20 flex items-center justify-center mx-auto mb-6"
          >
            <span className="material-symbols-outlined text-basil-green text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </motion.div>
          <h2 className="font-display-lg text-display-lg text-flour-white mb-4">Order Confirmed!</h2>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            Your payment was successful. You'll receive a confirmation email shortly with your order details and estimated delivery time.
          </p>
          <button
            onClick={handleContinueShopping}
            className="bg-oven-ember text-flour-white px-10 py-4 rounded-lg font-label-lg text-label-lg hover:opacity-90 transition-all"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-12">
      {/* Hero */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative h-[400px] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBVCGTDKVNOKxWpsFc8s2pp0xoNJP6OgkqROkdgA9OMUywYxFiE1J5hB1uf2Xw03D5IpcwiFwefpdmcqcGNAcfOtr17sNcXstMYdHbdvim94YNOrOzw6zlXAVI0gHyL2SGlX4coAKeNxt_Hs0M_k4hI1d8tWTJjSiOD8zDoBzqkOiHkixQjWECPaHPhYGDZ0Ki0FSOsQK3PhclCc5Vl6E82d8avzkoAfN95J9WnYP0Rj5yEyp155ojSiIqY8Cd5JpeilguQ0uFbMn7N')",
            }}
            data-alt="A classic Neapolitan Margherita Verace pizza with vibrant red San Marzano sauce, white spots of melted buffalo mozzarella, and bright green basil leaves. The crust has distinct charred spots (leopard spotting) and is resting on a dark slate surface. Professional food photography, high contrast, warm rustic lighting."
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        <div className="absolute inset-0 bg-pattern opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-7xl mb-6 animate-float"
          >
            💳
          </motion.div>
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <h1 className="font-display-lg text-display-lg font-bold mb-4 text-white drop-shadow-lg">Order Online</h1>
            <p className="font-body-lg text-body-lg text-white/90">Secure checkout powered by Stripe</p>
          </motion.div>
        </div>
      </motion.section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-8 h-8 text-award-gold" />
            <h2 className="font-headline-lg text-headline-lg bg-shiny-orange bg-clip-text text-transparent">Your Order</h2>
          </div>

          {state.items.length === 0 ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-16"
            >
              <ShoppingBag className="w-20 h-20 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Your cart is empty</p>
              <p className="text-gray-500 mt-2">Add items from our menu to get started!</p>
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
                    className="flex items-center justify-between p-5 bg-charcoal-slate rounded-2xl border border-white/10 hover:border-award-gold/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-900/50 to-orange-900/50 rounded-xl flex items-center justify-center text-3xl">
                        {typeof item.image === "string" ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                        ) : item.image?.asset?.url ? (
                          <img src={item.image.asset.url} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                        ) : (
                          "🍕"
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white">{item.name}</h3>
                        <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-xl bg-shiny-orange bg-clip-text text-transparent">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="border-t-2 border-dashed border-white/10 pt-6 mb-8">
                <div className="flex justify-between items-center text-2xl font-bold">
                  <span className="text-white">Total</span>
                  <span className="bg-shiny-orange bg-clip-text text-transparent">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStripeCheckout}
                disabled={loading}
                className="w-full bg-shiny-orange text-white py-5 rounded-2xl font-bold text-xl hover:opacity-90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    />
                    Redirecting to Stripe...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-6 h-6" />
                    Pay ${totalPrice.toFixed(2)} via Stripe
                  </>
                )}
              </motion.button>

              <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 text-sm">
                <Lock className="w-4 h-4" />
                Secure checkout powered by Stripe
              </div>
            </>
          )}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-12"
        >
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center">
            <Shield className="w-8 h-8 text-award-gold mx-auto mb-3" />
            <h4 className="font-label-md text-label-md text-white mb-1">Secure Payment</h4>
            <p className="text-gray-400 text-sm">SSL encrypted via Stripe</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center">
            <Truck className="w-8 h-8 text-award-gold mx-auto mb-3" />
            <h4 className="font-label-md text-label-md text-white mb-1">Fast Delivery</h4>
            <p className="text-gray-400 text-sm">30 min or it's free</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center">
            <RotateCcw className="w-8 h-8 text-award-gold mx-auto mb-3" />
            <h4 className="font-label-md text-label-md text-white mb-1">Easy Returns</h4>
            <p className="text-gray-400 text-sm">Satisfaction guaranteed</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}