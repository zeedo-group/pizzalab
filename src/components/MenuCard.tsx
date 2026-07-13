"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface MenuCardProps {
  name: string;
  description: string;
  price: number;
  image?: { asset?: { url?: string } } | string;
  popular?: boolean;
  onAddToCart: () => void;
}

function getImageUrl(image?: { asset?: { url?: string } } | string): string | undefined {
  if (!image) return undefined;
  if (typeof image === "string") return image;
  return image.asset?.url;
}

const menuImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBVCGTDKVNOKxWpsFc8s2pp0xoNJP6OgkqROkdgA9OMUywYxFiE1J5hB1uf2Xw03D5IpcwiFwefpdmcqcGNAcfOtr17sNcXstMYdHbdvim94YNOrOzw6zlXAVI0gHyL2SGlX4coAKeNxt_Hs0M_k4hI1d8tWTJjSiOD8zDoBzqkOiHkixQjWECPaHPhYGDZ0Ki0FSOsQK3PhclCc5Vl6E82d8avzkoAfN95J9WnYP0Rj5yEyp155ojSiIqY8Cd5JpeilguQ0uFbMn7N",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBUI95m43wUPQf7GQu-aLYfUHs5neuri4nA5xmDfGeyAfnZesRl03x0thPerUaDYaz-FV8t2tvx1cMmFXa5Q9HEZ-mpvlhD0WYVVMhesp_IaS1oWv1aCOjOfbbZnsTbjjbnt2aGAcg7OY19jbkIxSzHy4P12BX1W-VTkkmk7VsBElMG78I2sH-CJY20B4zKAV24OoihjRCWXVFRH5cHy5Z8wRrk0ElC1uBckhY-gl1F2EoWgl_M2EPTiKpOf1yOnuC6GW8bBuc69cpw",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC32QsuPg0TJv2J4EdxpQRYbQz6Lb2PyAktjH9m0ORAw-3bWKwXYe8qJU43R1WZULNBSw2MN-j0aBiyCwHEvRLrHFNvXERuew-nrshuXuVJk4AKOqDscidawxTh9czK7J67DcrDU3iMJgn_UU535Eh2fRbleGJpknDiE3_pcJ4IrP-kCah0wckCpY4J4s40Pm3NO6HkRbH9URL_ut__rk0KiKUYoy7irguJN32DQzWq3UbsAm6rQAu61FTpA7M50gxue0Aii8GNA9FT",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAkP5tx5h0WrifUQSKqTtVKdIa7079UT0Jbw4MRWoLBvw2r1P9b5XLQkYDL3VbTboQeZkacKjOgMDzLd-foT91t7ZNsveZK7Rh23k5-vgFDArkR41nAjQ11D9bjoRN5ISTE-rLDcS5B-B1u9YhgOIzW6rSfqMm-v_xbJbxE-aHnU9062exxOlg40o07rYpMxf2tJ3sQCWzYNSWigqstFy6l2OzqijGnW9gRZAAreyezsuKNNTkr2gHV82fJqdFMwq7H9Zf5kJm9CYfk",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDN67i0MHnP_DLJtG3rQ7cj3qNaLWY1n7vfFabvJ-SOkEq6jWZ_nI6k6gH8SToEN-no4gGzfiGGAgdXo725uX41fvPeXf42hwBYRPA2UEZk-5gvty-RULUaZ6rUg91PGAyDxAA_mWjD8eI8naK2Fpovt_OxIbKBHuhR04eG1LceZSwb_G6lD8I31h4e2eUw500ko6xPwMSzAD1X8lDQz4WY6BeT_q00B-lpEeNcknQNW2Cm8-5tWcGwrcb-3umfJatVmrWSQKr0U5tV",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBvxIRyEzymCfnw5n3y7gppyj4mBVJcDxyxgc1x19TvjTMeavPTtETdofU5fgSqw6IxtRLUScF_I6Yvg98ZzeIAVx0TRno75mqq_gOKUtpCcbtbMgwHKfSb8ZsKEbo2nH1TVf4S1jxb0Ou88Vs-kyRue3PBZECqaf_5yhcsiM6UCAMb9Ws0WL41yBaCCXqSH5ra4_qDMMlcIN1u8ul8-4yuhabC8cP9IMTWWFKkHujDHKxp7xSmSTo4zf7EZQDw--AEQyC2PMn9FcEj",
];

export default function MenuCard({ name, description, price, image, popular, onAddToCart }: MenuCardProps) {
  const imageUrl = getImageUrl(image);
  const randomImage = menuImages[Math.floor(Math.random() * menuImages.length)];

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group bg-charcoal-slate border border-outline-variant/10 rounded-xl overflow-hidden hover:border-secondary/30 transition-all duration-300"
    >
      <div className="h-64 overflow-hidden relative">
        <Image
          src={imageUrl || randomImage}
          alt={name}
          fill
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {popular && (
          <span className="absolute top-4 right-4 bg-award-gold text-on-primary-fixed px-3 py-1 rounded-full text-label-md font-label-md uppercase tracking-tighter">
            Bestseller
          </span>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-headline-md text-headline-md text-flour-white">{name}</h4>
          <span className="text-secondary font-headline-md text-headline-md">${price.toFixed(2)}</span>
        </div>
        <p className="text-on-surface-variant font-body-md text-body-md mb-6 leading-relaxed">
          {description}
        </p>
        <button
          onClick={onAddToCart}
          className="w-full py-3 border border-award-gold/40 text-award-gold rounded-lg font-label-lg text-label-lg hover:bg-award-gold hover:text-on-primary-fixed transition-colors"
        >
          Quick Add
        </button>
      </div>
    </motion.div>
  );
}