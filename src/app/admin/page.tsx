"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Download, Copy, Check, Trash2, Edit2, Save, X, MessageSquare, Settings, Image as ImageIcon, Menu as MenuIcon, Link as LinkIcon } from "lucide-react";

type TabType = "images" | "menu" | "settings" | "assistant";

interface PizzaItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  popular: boolean;
  image?: string;
}

interface SiteSettings {
  siteName: string;
  heroTitle: string;
  heroSubtitle: string;
  phone: string;
  email: string;
  address: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>("images");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Image Generator
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Menu Manager
  const [pizzas, setPizzas] = useState<PizzaItem[]>([]);
  const [editingPizza, setEditingPizza] = useState<PizzaItem | null>(null);
  const [newPizza, setNewPizza] = useState({ name: "", description: "", price: "", category: "classic", popular: false, image: "" });
  const [selectedImageForPizza, setSelectedImageForPizza] = useState<string>("");

  // Settings
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "Pizza Lab",
    heroTitle: "Pizza Lab",
    heroSubtitle: "Authentic Italian flavors, crafted with passion and the finest ingredients.",
    phone: "(555) 123-4567",
    email: "hello@pizzalab.com",
    address: "123 Pizza Street, Food City, FC 12345",
  });

  // AI Assistant
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Hi! I'm your AI assistant. I can help you manage the Pizza Lab website. Ask me about menu items, settings, images, or anything else!" }
  ]);
  const [assistantInput, setAssistantInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("pizzaLabMenu");
    if (saved) {
      setPizzas(JSON.parse(saved));
    } else {
      setPizzas([
        { _id: "1", name: "Margherita", description: "Fresh mozzarella, tomato sauce, basil", price: 12, category: "classic", popular: true, image: "" },
        { _id: "2", name: "Pepperoni", description: "Classic pepperoni with mozzarella", price: 14, category: "classic", popular: true, image: "" },
        { _id: "3", name: "Hawaiian", description: "Ham, pineapple, mozzarella", price: 15, category: "classic", popular: false, image: "" },
        { _id: "4", name: "BBQ Chicken", description: "Grilled chicken, BBQ sauce, red onions", price: 16, category: "signature", popular: true, image: "" },
        { _id: "5", name: "Truffle Mushroom", description: "Wild mushrooms, truffle oil, fontina", price: 18, category: "specialty", popular: false, image: "" },
        { _id: "6", name: "Garlic Knots", description: "Freshly baked with marinara", price: 6, category: "sides", popular: false, image: "" },
      ]);
    }

    const savedSettings = localStorage.getItem("pizzaLabSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const savePizzas = (updated: PizzaItem[]) => {
    setPizzas(updated);
    localStorage.setItem("pizzaLabMenu", JSON.stringify(updated));
  };

  const saveSettings = (updated: SiteSettings) => {
    setSettings(updated);
    localStorage.setItem("pizzaLabSettings", JSON.stringify(updated));
  };

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setGeneratedImage(null);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
      } else {
        alert("Failed to generate image: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      alert("Network error while generating image");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `pizza-lab-${Date.now()}.png`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const useImageForPizza = () => {
    if (!generatedImage) return;
    setSelectedImageForPizza(generatedImage);
    if (editingPizza) {
      setEditingPizza({ ...editingPizza, image: generatedImage });
    } else {
      setNewPizza({ ...newPizza, image: generatedImage });
    }
  };

  const addPizza = () => {
    if (!newPizza.name || !newPizza.price) return;
    const pizza: PizzaItem = {
      _id: Date.now().toString(),
      name: newPizza.name,
      description: newPizza.description,
      price: parseFloat(newPizza.price),
      category: newPizza.category,
      popular: newPizza.popular,
      image: newPizza.image,
    };
    savePizzas([...pizzas, pizza]);
    setNewPizza({ name: "", description: "", price: "", category: "classic", popular: false, image: "" });
    setSelectedImageForPizza("");
  };

  const deletePizza = (id: string) => {
    savePizzas(pizzas.filter((p) => p._id !== id));
  };

  const updatePizza = (updated: PizzaItem) => {
    savePizzas(pizzas.map((p) => (p._id === updated._id ? updated : p)));
    setEditingPizza(null);
    setSelectedImageForPizza("");
  };

  const startEdit = (pizza: PizzaItem) => {
    setEditingPizza(pizza);
    setSelectedImageForPizza(pizza.image || "");
  };

  const sendAssistantMessage = () => {
    if (!assistantInput.trim()) return;
    const userMsg = assistantInput;
    setMessages([...messages, { role: "user", content: userMsg }]);
    setAssistantInput("");

    setTimeout(() => {
      let response = "";
      const lower = userMsg.toLowerCase();
      if (lower.includes("menu") || lower.includes("pizza")) {
        response = `You currently have ${pizzas.length} pizzas on the menu. You can add, edit, or remove items in the Menu tab. Popular items are highlighted with a special badge.`;
      } else if (lower.includes("image") || lower.includes("photo")) {
        response = "You can generate images using the Images tab. Just type a description like 'pepperoni pizza on wooden table' and I'll generate it for you using free AI.";
      } else if (lower.includes("setting") || lower.includes("hero") || lower.includes("title")) {
        response = `Current site name: ${settings.siteName}. Hero title: ${settings.heroTitle}. You can update these in the Settings tab.`;
      } else if (lower.includes("contact") || lower.includes("phone") || lower.includes("email")) {
        response = `Contact info: ${settings.phone}, ${settings.email}, ${settings.address}. Update these in Settings.`;
      } else if (lower.includes("help")) {
        response = "I can help you with: 1) Managing menu items, 2) Generating images, 3) Updating settings, 4) Answering questions about the website. Just ask!";
      } else {
        response = "I understand. You can manage menu items, generate images, update settings, or ask me specific questions about the website. What would you like to do?";
      }
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    }, 500);
  };

  const tabs = [
    { id: "images" as TabType, label: "Image Generator", icon: ImageIcon },
    { id: "menu" as TabType, label: "Menu Manager", icon: MenuIcon },
    { id: "settings" as TabType, label: "Settings", icon: Settings },
    { id: "assistant" as TabType, label: "AI Assistant", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">🛠️</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Website Admin
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your Pizza Lab website with AI-powered tools
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Image Generator Tab */}
        {activeTab === "images" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900">AI Image Generator</h2>
            <p className="text-gray-600 mb-6">Generate pizza and food images using free AI. No API key required.</p>
            
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-3 text-gray-900">Prompt</label>
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
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
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
                  onClick={() => { navigator.clipboard.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  disabled={!prompt}
                  className="px-6 py-4 border-2 border-gray-200 rounded-2xl font-semibold hover:border-amber-500 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                  {copied ? "Copied" : "Copy"}
                </motion.button>
              </div>
            </div>

            {generatedImage && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Generated Image</h3>
                  <div className="flex gap-3">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={useImageForPizza} className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg">
                      <LinkIcon className="w-5 h-5" />
                      Use for Pizza
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={downloadImage} className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg">
                      <Download className="w-5 h-5" />
                      Download
                    </motion.button>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-lg">
                  <img src={generatedImage} alt="Generated" className="w-full h-auto" />
                </div>
                <p className="text-sm text-gray-500 mt-3">Tip: Click "Use for Pizza" then go to Menu Manager tab to assign this image to a pizza.</p>
              </motion.div>
            )}

            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4 text-gray-900">Quick Prompts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "A delicious pepperoni pizza on a wooden table, professional food photography, warm lighting, 4K",
                  "Wood fired pizza oven with flames, artisan baker stretching dough, rustic kitchen background",
                  "Fresh Italian ingredients: tomatoes, mozzarella, basil on marble counter, overhead shot",
                  "Pizza Margherita with fresh basil leaves, steam rising, shallow depth of field, restaurant setting",
                ].map((quickPrompt) => (
                  <button key={quickPrompt} onClick={() => setPrompt(quickPrompt)} className="text-left p-4 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors text-sm text-gray-700 border border-amber-100">
                    {quickPrompt}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Menu Manager Tab */}
        {activeTab === "menu" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Menu Manager</h2>
            
            {/* Add New Pizza */}
            <div className="bg-amber-50 rounded-2xl p-6 mb-8 border border-amber-100">
              <h3 className="text-lg font-bold mb-4 text-gray-900">Add New Pizza</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="Pizza name" value={newPizza.name} onChange={(e) => setNewPizza({ ...newPizza, name: e.target.value })} className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500" />
                <input type="text" placeholder="Description" value={newPizza.description} onChange={(e) => setNewPizza({ ...newPizza, description: e.target.value })} className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500" />
                <input type="number" placeholder="Price ($)" value={newPizza.price} onChange={(e) => setNewPizza({ ...newPizza, price: e.target.value })} className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500" />
                <select value={newPizza.category} onChange={(e) => setNewPizza({ ...newPizza, category: e.target.value })} className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500">
                  <option value="classic">Classic</option>
                  <option value="signature">Signature</option>
                  <option value="specialty">Specialty</option>
                  <option value="sides">Sides</option>
                </select>
                <input type="text" placeholder="Image URL (or generate in Images tab)" value={newPizza.image} onChange={(e) => setNewPizza({ ...newPizza, image: e.target.value })} className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500" />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={newPizza.popular} onChange={(e) => setNewPizza({ ...newPizza, popular: e.target.checked })} className="w-5 h-5 text-amber-600 rounded" />
                  <span className="font-medium text-gray-700">Popular</span>
                </label>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={addPizza} className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg">
                  Add Pizza
                </motion.button>
              </div>
            </div>

            {/* Pizza List */}
            <div className="space-y-3">
              {pizzas.map((pizza) => (
                <motion.div key={pizza._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-amber-200 transition-colors">
                  {editingPizza?._id === pizza._id ? (
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-3">
                      <input type="text" value={editingPizza.name} onChange={(e) => setEditingPizza({ ...editingPizza, name: e.target.value })} placeholder="Name" className="p-2 border border-gray-200 rounded-lg" />
                      <input type="text" value={editingPizza.description} onChange={(e) => setEditingPizza({ ...editingPizza, description: e.target.value })} placeholder="Description" className="p-2 border border-gray-200 rounded-lg" />
                      <input type="number" value={editingPizza.price.toString()} onChange={(e) => setEditingPizza({ ...editingPizza, price: parseFloat(e.target.value) || 0 })} placeholder="Price" className="p-2 border border-gray-200 rounded-lg" />
                      <input type="text" value={editingPizza.image || ""} onChange={(e) => setEditingPizza({ ...editingPizza, image: e.target.value })} placeholder="Image URL" className="p-2 border border-gray-200 rounded-lg" />
                      <div className="flex gap-2">
                        <button onClick={() => updatePizza(editingPizza)} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"><Save className="w-4 h-4" /></button>
                        <button onClick={() => { setEditingPizza(null); setSelectedImageForPizza(""); }} className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"><X className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                        {pizza.image ? (
                          <img src={pizza.image} alt={pizza.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">🍕</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900 truncate">{pizza.name}</h3>
                          {pizza.popular && <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full flex-shrink-0">Popular</span>}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{pizza.description}</p>
                        <p className="text-sm text-amber-600 font-semibold">${pizza.price} • {pizza.category}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => startEdit(pizza)} className="p-2 text-gray-600 hover:text-amber-600 transition-colors"><Edit2 className="w-5 h-5" /></button>
                        <button onClick={() => deletePizza(pizza._id)} className="p-2 text-gray-600 hover:text-red-600 transition-colors"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Site Settings</h2>
            <div className="space-y-6">
              {[
                { key: "siteName", label: "Site Name", value: settings.siteName },
                { key: "heroTitle", label: "Hero Title", value: settings.heroTitle },
                { key: "heroSubtitle", label: "Hero Subtitle", value: settings.heroSubtitle },
                { key: "phone", label: "Phone Number", value: settings.phone },
                { key: "email", label: "Email", value: settings.email },
                { key: "address", label: "Address", value: settings.address },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">{field.label}</label>
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => saveSettings({ ...settings, [field.key]: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              ))}
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => alert("Settings saved! Changes will reflect on the site after redeploy.")} className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg">
                Save Settings
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* AI Assistant Tab */}
        {activeTab === "assistant" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">AI Assistant</h2>
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-2xl p-4 rounded-2xl ${msg.role === "user" ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-900"}`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                value={assistantInput}
                onChange={(e) => setAssistantInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendAssistantMessage()}
                placeholder="Ask me anything about managing the website..."
                className="flex-1 p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={sendAssistantMessage} className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg">
                Send
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
