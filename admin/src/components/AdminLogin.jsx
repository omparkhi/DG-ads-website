import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiLogin } from "../services/api";
import { Lock, User, AlertCircle, Sparkles } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await apiLogin({ username, password });
      if (res.success && res.token) {
        localStorage.setItem("dgads_admin_token", res.token);
        localStorage.setItem("dgads_admin_user", res.user?.username || username);
        navigate("/dashboard");
      } else {
        setError(res.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to server. Check your backend status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden text-slate-100">
      {/* Background Orbs */}
      <div className="absolute w-96 h-96 bg-orange-600/20 rounded-full blur-3xl -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-96 h-96 bg-slate-800/40 rounded-full blur-3xl -bottom-20 -right-20 pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-600/10 border border-orange-500/20 text-orange-500 mb-4">
            <Sparkles className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">DGads Admin CMS</h2>
          <p className="text-slate-400 text-sm mt-1">Sign in to manage client website content</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Username
            </label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Admin username"
                className="w-full bg-slate-950/60 border border-slate-800 focus:border-orange-500 text-white rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950/60 border border-slate-800 focus:border-orange-500 text-white rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-orange-600/20 active:scale-[0.98] disabled:opacity-50 text-sm cursor-pointer mt-2"
          >
            {loading ? "Authenticating..." : "Login to CMS"}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-500">
          Powered by Node + Express + MongoDB + Cloudinary
        </div>
      </div>
    </div>
  );
}
