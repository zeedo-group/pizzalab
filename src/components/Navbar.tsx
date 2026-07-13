"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant/20">
      <div className="flex justify-between items-center px-margin-desktop py-4 max-w-container-max mx-auto">
        <Link href="/" className="font-headline-md text-headline-md font-bold text-flour-white tracking-tight">
          Pizza Lab
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-flour-white transition-colors" href="/">
            Home
          </Link>
          <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-flour-white transition-colors" href="/menu">
            Menu
          </Link>
          <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-flour-white transition-colors" href="/about">
            About
          </Link>
          <Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-flour-white transition-colors" href="/contact">
            Contact
          </Link>
        </div>
        <Link href="/order">
          <button className="bg-oven-ember text-flour-white px-6 py-2 rounded-lg font-label-lg text-label-lg font-bold hover:brightness-110 active:scale-95 transition-all">
            Order Online
            {totalItems > 0 && (
              <span className="ml-2 bg-award-gold text-charcoal-slate px-2 py-0.5 rounded-full text-xs font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </Link>
      </div>
    </nav>
  );
}