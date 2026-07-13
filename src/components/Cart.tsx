"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { state, dispatch, totalItems, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch({ type: "TOGGLE_CART" })}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col border-l border-outline-variant/20"
          >
            <div className="p-6 border-b border-outline-variant/20 bg-background/95 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-headline-md text-headline-md font-bold text-flour-white">
                  Your Cart ({totalItems})
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dispatch({ type: "TOGGLE_CART" })}
                  className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"
                >
                  <X className="w-6 h-6 text-on-surface-variant" />
                </motion.button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-on-surface-variant">
                  <ShoppingBag className="w-20 h-20 mb-4 text-outline-variant" />
                  <p className="font-body-lg text-body-lg">Your cart is empty</p>
                  <p className="font-body-md text-body-md mt-2">Add items from our menu to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-charcoal-slate rounded-2xl p-4 border border-outline-variant/20"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-amber-900/50 to-orange-900/50 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 relative overflow-hidden">
                          {typeof item.image === "string" ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                          ) : item.image?.asset?.url ? (
                            <img src={item.image.asset.url} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                          ) : (
                            "🍕"
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-flour-white truncate">{item.name}</h3>
                          <p className="text-secondary font-bold text-lg">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { _id: item._id, quantity: Math.max(0, item.quantity - 1) } })}
                            className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface"
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>
                          <span className="w-8 text-center font-bold text-flour-white">{item.quantity}</span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { _id: item._id, quantity: item.quantity + 1 } })}
                            className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface"
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {state.items.length > 0 && (
              <div className="p-6 border-t border-outline-variant/20 bg-background/95 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-label-lg text-label-lg text-on-surface-variant">Subtotal</span>
                  <span className="font-headline-lg text-headline-lg bg-shiny-orange bg-clip-text text-transparent">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-oven-ember to-orange-600 text-flour-white py-4 rounded-2xl font-bold text-lg hover:from-oven-ember/90 hover:to-orange-600/90 transition-all shadow-lg flex items-center justify-center gap-2"
                  onClick={() => dispatch({ type: "TOGGLE_CART" })}
                >
                  Checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}