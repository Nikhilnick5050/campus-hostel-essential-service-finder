"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Explore Services" },
  { href: "/map", label: "Campus Map" },
  { href: "/about", label: "About Project" },
  { href: "/contact", label: "Contact / Help" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <Icon name="compass" size={22} />
          </span>
          <span className="brand-text">
            Campus<span>Finder</span>
          </span>
        </Link>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/admin" className="btn btn-outline nav-login" onClick={() => setOpen(false)}>
            <Icon name="lock" size={16} />
            Admin Login
          </Link>
        </nav>

        <button
          className="nav-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <Icon name={open ? "x" : "menu"} size={24} />
        </button>
      </div>
    </header>
  );
}