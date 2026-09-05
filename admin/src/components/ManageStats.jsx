import React, { useState, useEffect } from "react";
import { apiGetStats, apiCreateStat, apiUpdateStat, apiDeleteStat } from "../services/api";
import { Plus, Trash2, Edit2 } from "lucide-react";

export default function ManageStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    label: "",
    number: 0,
    suffix: "+",
    decimals: 0,
    caseStudy: "",
  });

  const loadData = async () => {
    setLoading(true);
    const res = await apiGetStats();
    if (res.success && res.data) {
      setStats(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await apiUpdateStat(editingId, formData);
    } else {
      await apiCreateStat(formData);
    }
    setShowModal(false);
    resetForm();
    loadData();
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      label: item.label,
      number: item.number,
      suffix: item.suffix || "+",
      decimals: item.decimals || 0,
      caseStudy: item.caseStudy || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this stat?")) {
      await apiDeleteStat(id);
      loadData();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      label: "",
      number: 0,
      suffix: "+",
      decimals: 0,
      caseStudy: "",
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Statistics & Performance Counters</h2>
          <p className="text-sm text-slate-400">Manage metric counters shown on the homepage strip</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-orange-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Stat</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading stats...</div>
      ) : stats.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          No stats found. Click "Add Stat" to create homepage counter metrics.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => (
            <div key={item._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block mb-2">{item.label}</span>
              <div className="text-4xl font-extrabold text-white mb-2">
                <span className="text-orange-500">{item.number}</span>
                <span className="text-slate-400 text-2xl">{item.suffix}</span>
              </div>
              {item.caseStudy && <p className="text-xs text-slate-400 line-clamp-2">{item.caseStudy}</p>}

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800/80 justify-end">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">
              {editingId ? "Edit Statistic" : "Add Statistic"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Label
                </label>
                <input
                  type="text"
                  required
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g. Brands Built"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    Number Value
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    Suffix (e.g. +, %, ×)
                  </label>
                  <input
                    type="text"
                    value={formData.suffix}
                    onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-lg shadow-orange-600/20"
                >
                  Save Statistic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
