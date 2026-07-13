"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest dark:bg-surface-container-lowest border-t border-outline-variant/30">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop py-16 max-w-container-max mx-auto">
        <div className="space-y-6">
          <h2 className="font-headline-md text-headline-md font-bold text-flour-white">Pizza Lab</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Authentic Neapolitan tradition meet modern industrial precision.
          </p>
          <div className="flex gap-4">
            <a className="text-on-surface-variant hover:text-award-gold transition-colors" href="#" aria-label="Website">
              <span className="material-symbols-outlined text-xl">public</span>
            </a>
            <a className="text-on-surface-variant hover:text-award-gold transition-colors" href="#" aria-label="Chat">
              <span className="material-symbols-outlined text-xl">chat</span>
            </a>
            <a className="text-on-surface-variant hover:text-award-gold transition-colors" href="#" aria-label="Photos">
              <span className="material-symbols-outlined text-xl">photo_camera</span>
            </a>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-label-lg text-label-lg text-secondary uppercase tracking-widest mb-6">Navigation</h4>
          <ul className="space-y-4">
            <li><Link href="/" className="font-label-md text-label-md text-on-surface-variant hover:text-award-gold transition-colors">Home</Link></li>
            <li><Link href="/menu" className="font-label-md text-label-md text-on-surface-variant hover:text-award-gold transition-colors">Menu</Link></li>
            <li><Link href="/about" className="font-label-md text-label-md text-secondary transition-colors">About</Link></li>
            <li><Link href="/contact" className="font-label-md text-label-md text-on-surface-variant hover:text-award-gold transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-label-lg text-label-lg text-secondary uppercase tracking-widest mb-6">Legal</h4>
          <ul className="space-y-4">
            <li><Link href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-award-gold transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-award-gold transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-award-gold transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-label-lg text-label-lg text-secondary uppercase tracking-widest mb-6">Visit Us</h4>
          <p className="font-body-md text-body-md text-on-surface-variant">123 Pizza Street, Naples District<br/>New York, NY 10001</p>
          <p className="font-body-md text-body-md text-on-surface-variant">Open Daily: 11am — 10pm</p>
          <a className="text-award-gold font-label-md text-label-md flex items-center gap-1 hover:underline" href="#">
            <span className="material-symbols-outlined text-[16px]">map</span>
            Get Directions
          </a>
        </div>
      </div>
      <div className="px-margin-desktop py-8 border-t border-outline-variant/10 max-w-container-max mx-auto text-center">
        <p className="font-label-md text-label-md text-on-surface-variant/60">© 2024 Pizza Lab. Authentic Neapolitan Tradition.</p>
      </div>
    </footer>
  );
}