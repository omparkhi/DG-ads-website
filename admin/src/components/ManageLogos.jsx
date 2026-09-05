import React, { useState, useEffect } from "react";
import {
  apiGetAdminClientLogos,
  apiCreateClientLogo,
  apiUpdateClientLogo,
  apiDeleteClientLogo,
} from "../services/api";
import { uploadToCloudinary } from "../utils/cloudinary";
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
          <h2 className="text-2xl font-bold text-slate-900">Client & Partner Logos</h2>
          <p className="text-sm text-slate-500 font-medium">Manage partner brand logos displayed on homepage slider</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md shadow-orange-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client Logo</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400 font-medium">Loading client logos...</div>
      ) : logos.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 font-medium shadow-sm">
          No client logos found. Click "Add Client Logo" to add partner brand logos.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {logos.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between items-center text-center group relative shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-full h-20 bg-slate-50 rounded-xl p-3 flex items-center justify-center mb-3 border border-slate-100">
                <img src={item.logoUrl} alt={item.brandName} className="max-h-full max-w-full object-contain" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs truncate max-w-full mb-3">{item.brandName}</h4>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              {editingId ? "Edit Client Logo" : "Add Client Logo"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Brand / Company Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  placeholder="e.g. Pushpraj Jewellers"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                />
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Logo File (Cloudinary SVG / PNG Upload)
                </label>
                <div className="flex items-center gap-3">
                  <label className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-2 shrink-0">
                    <Upload className="w-4 h-4 text-slate-600" />
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-md shadow-orange-600/20"
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
