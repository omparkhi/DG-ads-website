import React, { useState, useEffect } from "react";
import {
  apiGetAdminClientLogos,
  apiCreateClientLogo,
  apiUpdateClientLogo,
  apiDeleteClientLogo,
} from "../../services/api";
import { uploadToCloudinary } from "../../utils/cloudinary";
import { Plus, Trash2, Edit2, Upload } from "lucide-react";

export default function ManageLogos() {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    brandName: "",
    logoUrl: "",
    websiteUrl: "",
    isActive: true,
  });

  const loadData = async () => {
    setLoading(true);
    const res = await apiGetAdminClientLogos();
    if (res.success && res.data) {
      setLogos(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, logoUrl: url }));
    } catch (err) {
      alert("Failed to upload logo: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.logoUrl) {
      alert("Please upload a logo image or enter a URL");
      return;
    }

    if (editingId) {
      await apiUpdateClientLogo(editingId, formData);
    } else {
      await apiCreateClientLogo(formData);
    }

    setShowModal(false);
    resetForm();
    loadData();
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      brandName: item.brandName,
      logoUrl: item.logoUrl,
      websiteUrl: item.websiteUrl || "",
      isActive: item.isActive ?? true,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this logo?")) {
      await apiDeleteClientLogo(id);
      loadData();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      brandName: "",
      logoUrl: "",
      websiteUrl: "",
      isActive: true,
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Client & Partner Logos</h2>
          <p className="text-sm text-slate-400">Manage partner brand logos displayed on homepage slider</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-orange-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client Logo</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading client logos...</div>
      ) : logos.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          No client logos found. Click "Add Client Logo" to add partner brand logos.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {logos.map((item) => (
            <div
              key={item._id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between items-center text-center group relative"
            >
              <div className="w-full h-20 bg-white/5 rounded-xl p-3 flex items-center justify-center mb-3">
                <img src={item.logoUrl} alt={item.brandName} className="max-h-full max-w-full object-contain filter invert opacity-80" />
              </div>
              <h4 className="font-bold text-white text-xs truncate max-w-full mb-3">{item.brandName}</h4>

              <div className="flex items-center gap-2">
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
              {editingId ? "Edit Client Logo" : "Add Client Logo"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Brand / Company Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  placeholder="e.g. Acme Corp"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Logo File (Cloudinary SVG / PNG Upload)
                </label>
                <div className="flex items-center gap-3">
                  <label className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-medium cursor-pointer flex items-center gap-2 shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>{uploading ? "Uploading..." : "Upload Logo"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="text"
                    value={formData.logoUrl}
                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                    placeholder="Or paste image URL"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
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
                  disabled={uploading}
                  className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-lg shadow-orange-600/20"
                >
                  Save Logo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
