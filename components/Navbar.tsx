'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#tech-stack", label: "Tech Stack" },
    { href: "#impact", label: "Impact" },
    { href: "#roadmap", label: "Roadmap" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-agro-black/95 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">
              <Image
                src={'/favicon.png'}
                width={40}
                height={40}
                alt="AgroGen Logo"
              />
            </span>
            <span className="text-xl font-bold">
              <span className="text-primary">Agro</span>
              <span className="text-agro-white">Gen</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-agro-white hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          <Link href="/dashboard">
            <Button
              className="text-white bg-green-600 font-semibold hover:bg-green-400 cursor-pointer px-6 py-2 rounded-2xl"
              variant="default"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
