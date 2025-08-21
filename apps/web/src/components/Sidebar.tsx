import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Menu,
  HeartHandshake,
  BookOpen,
  Star,
  Phone,
  Notebook,
} from "lucide-react"; // ✅ Import icons from lucide-react

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/menu", label: "Menu", icon: Menu },
  { to: "/donation", label: "Donation", icon: HeartHandshake },
  { to: "/quran", label: "Quran", icon: BookOpen },
  { to: "/special", label: "Special", icon: Star },
  { to: "/contact", label: "Contact", icon: Phone },
  { to: "/blog", label: "Blog", icon: Notebook },
];

export const Sidebar = () => {
  return (
    <div className="p-4 space-y-2">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
              isActive
                ? "bg-slate-700 text-yellow-300"
                : "text-white hover:bg-slate-600"
            }`
          }
        >
          <item.icon size={20} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
};
