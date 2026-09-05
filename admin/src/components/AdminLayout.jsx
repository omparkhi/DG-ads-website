import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FolderKanban,
  MessageSquareQuote,
  Image,
  LogOut,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

import ManageCaseStudies from "./ManageCaseStudies";
import ManageTestimonials from "./ManageTestimonials";
import ManageLogos from "./ManageLogos";

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState("case-studies");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("dgads_admin_token");
    if (!token) {
      navigate("/login");
      return;
    }
    setUser(localStorage.getItem("dgads_admin_user") || "Admin");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("dgads_admin_token");
    localStorage.removeItem("dgads_admin_user");
    navigate("/login");
  };

  const navItems = [
    { id: "case-studies", label: "Case Studies", icon: FolderKanban },
    { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
    { id: "logos", label: "Client Logos", icon: Image },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200/80 p-5 flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold shadow-md shadow-orange-600/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-lg leading-tight">DGads CMS</h1>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Connected</span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-200/80 space-y-2 mt-6">
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout ({user})</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl">
        {activeTab === "case-studies" && <ManageCaseStudies />}
        {activeTab === "testimonials" && <ManageTestimonials />}
        {activeTab === "logos" && <ManageLogos />}
      </main>
    </div>
  );
}
