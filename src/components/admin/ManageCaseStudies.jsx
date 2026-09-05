import React, { useState, useEffect } from "react";
import {
  apiGetAdminCaseStudies,
  apiCreateCaseStudy,
  apiUpdateCaseStudy,
  apiDeleteCaseStudy,
} from "../../services/api";
import { uploadToCloudinary } from "../../utils/cloudinary";
import { Plus, Trash2, Edit2, Upload, ExternalLink, Image as ImageIcon } from "lucide-react";

export default function ManageCaseStudies() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Digital Marketing",
    metric: "3X Leads",
    image: "",
    link: "",
    summary: "",
    isPublished: true,
  });

  const loadData = async () => {
    setLoading(true);
    const res = await apiGetAdminCaseStudies();
    if (res.success && res.data) {
      setStudies(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, image: url }));
    } catch (err) {
      alert("Failed to upload image: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload a Cloudinary image or enter an image URL");
      return;
    }

    if (editingId) {
      await apiUpdateCaseStudy(editingId, formData);
    } else {
      await apiCreateCaseStudy(formData);
    }

    setShowModal(false);
    resetForm();
    loadData();
  };

  const handleEdit = (study) => {
    setEditingId(study._id);
    setFormData({
      title: study.title,
      category: study.category,
      metric: study.metric,
      image: study.image,
      link: study.link || "",
      summary: study.summary || "",
      isPublished: study.isPublished,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this case study?")) {
      await apiDeleteCaseStudy(id);
      loadData();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      category: "Digital Marketing",
      metric: "3X Leads",
      image: "",
      link: "",
      summary: "",
      isPublished: true,
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Case Studies</h2>
          <p className="text-sm text-slate-400">Manage client success stories and project showcases</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-orange-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Case Study</span>
        </button>
      </div>

      {/* Grid List */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading case studies...</div>
      ) : studies.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          No case studies found. Click "Add Case Study" to create your first item.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studies.map((item) => (
            <div
              key={item._id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                    {item.metric}
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                  {item.summary && <p className="text-slate-400 text-xs line-clamp-2">{item.summary}</p>}
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/60 mt-4">
                <span className={`text-xs px-2.5 py-1 rounded-full ${item.isPublished ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-slate-800 text-slate-400"}`}>
                  {item.isPublished ? "Published" : "Draft"}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-6">
              {editingId ? "Edit Case Study" : "Add Case Study"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Digital Growth for Nagpur Business"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Digital Marketing"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    Metric Result Tag
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.metric}
                    onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                    placeholder="e.g. 3X Leads"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Cloudinary Image Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Cover Image (Cloudinary Direct Upload)
                </label>
                <div className="flex items-center gap-3">
                  <label className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer flex items-center gap-2 shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>{uploading ? "Uploading..." : "Choose Image File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Or paste Cloudinary image URL"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                {formData.image && (
                  <div className="mt-3 relative w-32 aspect-[4/3] rounded-lg overflow-hidden border border-slate-800">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Case Study Link (Optional)
                </label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="/portfolio/1 or https://..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="isPublished" className="text-sm text-slate-300">
                  Publish immediately to website
                </label>
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
                  Save Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
