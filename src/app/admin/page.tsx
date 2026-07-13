"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Download, Copy, Check, Trash2, Edit2, Save, X, MessageSquare, Settings, Image as ImageIcon, Menu as MenuIcon, Link as LinkIcon, Upload } from "lucide-react";

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

const defaultPizzas: PizzaItem[] = [
  { _id: "1", name: "Margherita", description: "Fresh mozzarella, tomato sauce, basil", price: 12, category: "classic", popular: true, image: "/images/pizza-closeup.jpg" },
  { _id: "2", name: "Pepperoni", description: "Classic pepperoni with mozzarella", price: 14, category: "classic", popular: true, image: "/images/pizza-pepperoni.jpg" },
  { _id: "3", name: "Garden Pizza", description: "Tomato, mushrooms, olives, basil, and mozzarella", price: 15, category: "classic", popular: false, image: "/images/pizza-veg.jpg" },
  { _id: "4", name: "BBQ Chicken", description: "Grilled chicken, BBQ sauce, red onions", price: 16, category: "signature", popular: true, image: "/images/pizza-meat.jpg" },
  { _id: "5", name: "Truffle Mushroom", description: "Wild mushrooms, truffle oil, fontina", price: 18, category: "specialty", popular: false, image: "/images/pizza-truffle.jpg" },
  { _id: "6", name: "Wood-Fired Pepperoni", description: "Pepperoni, mozzarella, tomato sauce, and charred crust", price: 16, category: "signature", popular: false, image: "/images/wood-fire-oven.jpg" },
];

const defaultSettings: SiteSettings = {
  siteName: "Pizza Lab",
  heroTitle: "Pizza Lab",
  heroSubtitle: "Authentic Italian flavors, crafted with passion and the finest ingredients.",
  phone: "(555) 123-4567",
  email: "hello@pizzalab.com",
  address: "123 Pizza Street, Food City, FC 12345",
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>("images");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Image Generator
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Menu Manager
  const [pizzas, setPizzas] = useState<PizzaItem[]>(() => {
    if (typeof window === "undefined") return defaultPizzas;
    const saved = localStorage.getItem("pizzaLabMenu");
    return saved ? JSON.parse(saved) : defaultPizzas;
  });
  const [editingPizza, setEditingPizza] = useState<PizzaItem | null>(null);
  const [newPizza, setNewPizza] = useState({ name: "", description: "", price: "", category: "classic", popular: false, image: "" });
  const [selectedImageForPizza, setSelectedImageForPizza] = useState<string>("");

  // Settings
  const [settings, setSettings] = useState<SiteSettings>(() => {
    if (typeof window === "undefined") return defaultSettings;
    const savedSettings = localStorage.getItem("pizzaLabSettings");
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  // AI Assistant
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Hi! I'm your AI assistant. I can help you manage the Pizza Lab website. Ask me about menu items, settings, images, or anything else!" }
  ]);
  const [assistantInput, setAssistantInput] = useState("");

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
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">🛠️</div>
          <h1 className="font-display-lg text-display-lg font-bold mb-4 bg-gradient-to-r from-oven-ember to-award-gold bg-clip-text text-transparent">
            Website Admin
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Manage your Pizza Lab website with AI-powered tools
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-label-lg text-label-lg transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-oven-ember to-orange-600 text-flour-white shadow-lg"
                  : "bg-charcoal-slate text-on-surface-variant hover:bg-surface-container hover:text-flour-white border border-outline-variant/20"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Image Generator Tab */}
        {activeTab === "images" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-charcoal-slate border border-outline-variant/20 rounded-3xl shadow-xl p-8"
          >
            <h2 className="font-headline-lg text-headline-lg text-flour-white mb-6">AI Image Generator</h2>
            <p className="text-on-surface-variant font-body-lg mb-6">Generate pizza and food images using free AI. No API key required.</p>

            <div className="mb-6">
              <label className="block font-label-lg text-label-lg uppercase tracking-widest text-on-surface-variant mb-3">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate..."
                className="w-full p-4 bg-surface-container border border-outline-variant/30 rounded-2xl focus:ring-2 focus:ring-oven-ember focus:border-transparent resize-none h-32 mb-4 text-flour-white placeholder:text-outline-variant"
              />
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generateImage}
                  disabled={loading || !prompt.trim()}
                  className="flex-1 bg-gradient-to-r from-oven-ember to-orange-600 text-flour-white py-4 rounded-2xl font-label-lg text-label-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-flour-white border-t-transparent rounded-full" />
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
                  className="px-6 py-4 border-2 border-outline-variant/30 rounded-2xl font-label-lg text-label-lg hover:border-oven-ember transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {copied ? <Check className="w-5 h-5 text-basil-green" /> : <Copy className="w-5 h-5" />}
                  {copied ? "Copied" : "Copy"}
                </motion.button>
              </div>
            </div>

            {generatedImage && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-headline-md text-headline-md text-flour-white">Generated Image</h3>
                  <div className="flex gap-3">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={useImageForPizza} className="flex items-center gap-2 bg-gradient-to-r from-basil-green to-emerald-600 text-flour-white px-6 py-3 rounded-xl font-semibold hover:from-basil-green/90 hover:to-emerald-600/90 transition-all shadow-lg">
                      <LinkIcon className="w-5 h-5" />
                      Use for Pizza
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={downloadImage} className="flex items-center gap-2 bg-gradient-to-r from-oven-ember to-orange-600 text-flour-white px-6 py-3 rounded-xl font-semibold hover:from-oven-ember/90 hover:to-orange-600/90 transition-all shadow-lg">
                      <Download className="w-5 h-5" />
                      Download
                    </motion.button>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-outline-variant/20 shadow-lg">
                  <img src={generatedImage} alt="Generated" className="w-full h-auto" />
                </div>
                <p className="text-sm text-on-surface-variant/60 mt-3">Tip: Click &quot;Use for Pizza&quot; then go to Menu Manager tab to assign this image to a pizza.</p>
              </motion.div>
            )}

            <div className="mt-8">
              <h3 className="font-label-lg text-label-lg text-flour-white mb-4">Quick Prompts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "A delicious pepperoni pizza on a wooden table, professional food photography, warm lighting, 4K",
                  "Wood fired pizza oven with flames, artisan baker stretching dough, rustic kitchen background",
                  "Fresh Italian ingredients: tomatoes, mozzarella, basil on marble counter, overhead shot",
                  "Pizza Margherita with fresh basil leaves, steam rising, shallow depth of field, restaurant setting",
                ].map((quickPrompt) => (
                  <button key={quickPrompt} onClick={() => setPrompt(quickPrompt)} className="text-left p-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-sm text-on-surface-variant border border-outline-variant/20">
                    {quickPrompt}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Menu Manager Tab */}
        {activeTab === "menu" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-charcoal-slate border border-outline-variant/20 rounded-3xl shadow-xl p-8">
            <h2 className="font-headline-lg text-headline-lg text-flour-white mb-6">Menu Manager</h2>

            {/* Add New Pizza */}
            <div className="bg-surface-container p-6 md:p-8 border border-outline-variant/20 rounded-2xl mb-8">
              <h3 className="font-label-lg text-label-lg text-flour-white mb-4">Add New Pizza</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="Pizza name" value={newPizza.name} onChange={(e) => setNewPizza({ ...newPizza, name: e.target.value })} className="p-3 bg-background border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-oven-ember focus:border-transparent text-flour-white placeholder:text-outline-variant" />
                <input type="text" placeholder="Description" value={newPizza.description} onChange={(e) => setNewPizza({ ...newPizza, description: e.target.value })} className="p-3 bg-background border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-oven-ember focus:border-transparent text-flour-white placeholder:text-outline-variant" />
                <input type="number" placeholder="Price ($)" value={newPizza.price} onChange={(e) => setNewPizza({ ...newPizza, price: e.target.value })} className="p-3 bg-background border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-oven-ember focus:border-transparent text-flour-white placeholder:text-outline-variant" />
                <select value={newPizza.category} onChange={(e) => setNewPizza({ ...newPizza, category: e.target.value })} className="p-3 bg-background border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-oven-ember focus:border-transparent text-flour-white">
                  <option value="classic">Classic</option>
                  <option value="signature">Signature</option>
                  <option value="specialty">Specialty</option>
                  <option value="sides">Sides</option>
                </select>
                <input type="text" placeholder="Image URL (or generate in Images tab)" value={newPizza.image} onChange={(e) => setNewPizza({ ...newPizza, image: e.target.value })} className="p-3 bg-background border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-oven-ember focus:border-transparent text-flour-white placeholder:text-outline-variant" />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={newPizza.popular} onChange={(e) => setNewPizza({ ...newPizza, popular: e.target.checked })} className="w-5 h-5 text-oven-ember rounded border-outline-variant/30 bg-background focus:ring-oven-ember" />
                  <span className="font-label-md text-on-surface">Popular</span>
                </label>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={addPizza} className="bg-gradient-to-r from-oven-ember to-orange-600 text-flour-white px-6 py-3 rounded-xl font-bold hover:from-oven-ember/90 hover:to-orange-600/90 transition-all shadow-lg">
                  Add Pizza
                </motion.button>
              </div>
            </div>

            {/* Pizza List */}
            <div className="space-y-3">
              {pizzas.map((pizza) => (
                <motion.div key={pizza._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 p-4 bg-surface-container border border-outline-variant/10 rounded-xl hover:border-oven-ember/30 transition-colors">
                  {editingPizza?._id === pizza._id ? (
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-3">
                      <input type="text" value={editingPizza.name} onChange={(e) => setEditingPizza({ ...editingPizza, name: e.target.value })} placeholder="Name" className="p-2 bg-background border border-outline-variant/30 rounded-lg text-flour-white" />
                      <input type="text" value={editingPizza.description} onChange={(e) => setEditingPizza({ ...editingPizza, description: e.target.value })} placeholder="Description" className="p-2 bg-background border border-outline-variant/30 rounded-lg text-flour-white" />
                      <input type="number" value={editingPizza.price.toString()} onChange={(e) => setEditingPizza({ ...editingPizza, price: parseFloat(e.target.value) || 0 })} placeholder="Price" className="p-2 bg-background border border-outline-variant/30 rounded-lg text-flour-white" />
                      <input type="text" value={editingPizza.image || ""} onChange={(e) => setEditingPizza({ ...editingPizza, image: e.target.value })} placeholder="Image URL" className="p-2 bg-background border border-outline-variant/30 rounded-lg text-flour-white" />
                      <div className="flex gap-2">
                        <button onClick={() => updatePizza(editingPizza)} className="p-2 bg-basil-green text-flour-white rounded-lg hover:bg-basil-green/90"><Save className="w-4 h-4" /></button>
                        <button onClick={() => { setEditingPizza(null); setSelectedImageForPizza(""); }} className="p-2 bg-surface-container-high text-on-surface-variant rounded-lg hover:bg-surface-container-highest"><X className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-surface-container-highest rounded-xl overflow-hidden flex-shrink-0">
                        {pizza.image ? (
                          <img src={pizza.image} alt={pizza.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">🍕</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-flour-white truncate">{pizza.name}</h3>
                          {pizza.popular && <span className="text-xs bg-oven-ember text-flour-white px-2 py-0.5 rounded-full flex-shrink-0">Popular</span>}
                        </div>
                        <p className="text-sm text-on-surface-variant truncate">{pizza.description}</p>
                        <p className="text-sm text-secondary font-semibold">${pizza.price} • {pizza.category}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => startEdit(pizza)} className="p-2 text-on-surface-variant hover:text-oven-ember transition-colors"><Edit2 className="w-5 h-5" /></button>
                        <button onClick={() => deletePizza(pizza._id)} className="p-2 text-on-surface-variant hover:text-red-400 transition-colors"><Trash2 className="w-5 h-5" /></button>
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-charcoal-slate border border-outline-variant/20 rounded-3xl shadow-xl p-8">
            <h2 className="font-headline-lg text-headline-lg text-flour-white mb-6">Site Settings</h2>
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
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">{field.label}</label>
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => saveSettings({ ...settings, [field.key]: e.target.value })}
                    className="w-full p-3 bg-background border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-oven-ember focus:border-transparent text-flour-white placeholder:text-outline-variant"
                  />
                </div>
              ))}
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => alert("Settings saved! Changes will reflect on the site after redeploy.")} className="bg-gradient-to-r from-oven-ember to-orange-600 text-flour-white px-8 py-3 rounded-xl font-bold hover:from-oven-ember/90 hover:to-orange-600/90 transition-all shadow-lg">
                Save Settings
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* AI Assistant Tab */}
        {activeTab === "assistant" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-charcoal-slate border border-outline-variant/20 rounded-3xl shadow-xl p-8">
            <h2 className="font-headline-lg text-headline-lg text-flour-white mb-6">AI Assistant</h2>
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-2xl p-4 rounded-2xl ${msg.role === "user" ? "bg-oven-ember text-flour-white" : "bg-surface-container text-flour-white"}`}>
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
                className="flex-1 p-4 bg-background border border-outline-variant/30 rounded-2xl focus:ring-2 focus:ring-oven-ember focus:border-transparent text-flour-white placeholder:text-outline-variant"
              />
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={sendAssistantMessage} className="bg-gradient-to-r from-oven-ember to-orange-600 text-flour-white px-8 py-4 rounded-2xl font-bold hover:from-oven-ember/90 hover:to-orange-600/90 transition-all shadow-lg">
                Send
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
