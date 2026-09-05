import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FolderKanban,
  MessageSquareQuote,
  Image,
  BarChart3,
  Inbox,
  LogOut,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

import ManageCaseStudies from "./ManageCaseStudies";
import ManageTestimonials from "./ManageTestimonials";
import ManageLogos from "./ManageLogos";
import ManageStats from "./ManageStats";
import ManageInquiries from "./ManageInquiries";

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState("case-studies");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("dgads_admin_token");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    setUser(localStorage.getItem("dgads_admin_user") || "Admin");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("dgads_admin_token");
    localStorage.removeItem("dgads_admin_user");
    navigate("/admin/login");
  };

  const navItems = [
    { id: "case-studies", label: "Case Studies", icon: FolderKanban },
    { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
    { id: "logos", label: "Client Logos", icon: Image },
    { id: "stats", label: "Statistics", icon: BarChart3 },
    { id: "inquiries", label: "Lead Submissions", icon: Inbox },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-600/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-white leading-tight">DGads CMS</h1>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                <ShieldCheck className="w-3 h-3" />
                <span>Admin Connected</span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
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
        <div className="pt-6 border-t border-slate-800/80 space-y-2 mt-6">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
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
        {activeTab === "stats" && <ManageStats />}
        {activeTab === "inquiries" && <ManageInquiries />}
      </main>
    </div>
  );
}
