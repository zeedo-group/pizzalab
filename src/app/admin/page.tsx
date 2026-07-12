"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Download, Copy, Check } from "lucide-react";

export default function AdminPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ image?: string; error?: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult({ error: data.error || "Generation failed" });
      } else {
        setResult({ image: data.image });
      }
    } catch (error) {
      setResult({ error: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!result?.image) return;
    const link = document.createElement("a");
    link.href = result.image;
    link.download = `pizza-lab-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyPrompt = () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">🎨</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Image Generator
          </h1>
          <p className="text-gray-600 text-lg">
            Generate pizza and food images using AI (Nano Banana / Gemini)
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100"
        >
          <label className="block text-lg font-semibold mb-3 text-gray-900">
            Image Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none h-32 mb-4"
          />
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generateImage}
              disabled={loading || !prompt.trim()}
              className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Image
                </>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={copyPrompt}
              disabled={!prompt}
              className="px-6 py-4 border-2 border-gray-200 rounded-2xl font-semibold hover:border-amber-500 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
              {copied ? "Copied" : "Copy Prompt"}
            </motion.button>
          </div>
        </motion.div>

        {result?.error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8"
          >
            {result.error}
          </motion.div>
        )}

        {result?.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Generated Image</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadImage}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg"
              >
                <Download className="w-5 h-5" />
                Download
              </motion.button>
            </div>
            <div className="rounded-2xl overflow-hidden border border-gray-100">
              <img src={result.image} alt="Generated" className="w-full h-auto" />
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
        >
          <h3 className="text-xl font-bold mb-4 text-gray-900">Quick Prompts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "A delicious pepperoni pizza on a wooden table, professional food photography, warm lighting, 4K",
              "Wood fired pizza oven with flames, artisan baker stretching dough, rustic kitchen background",
              "Fresh Italian ingredients: tomatoes, mozzarella, basil on marble counter, overhead shot",
              "Pizza Margherita with fresh basil leaves, steam rising, shallow depth of field, restaurant setting",
            ].map((quickPrompt) => (
              <button
                key={quickPrompt}
                onClick={() => setPrompt(quickPrompt)}
                className="text-left p-4 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors text-sm text-gray-700 border border-amber-100"
              >
                {quickPrompt}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
