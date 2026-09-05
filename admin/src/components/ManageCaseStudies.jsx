import React, { useState, useEffect } from "react";
import {
  apiGetAdminCaseStudies,
  apiCreateCaseStudy,
  apiUpdateCaseStudy,
  apiDeleteCaseStudy,
} from "../services/api";
import { uploadToCloudinary } from "../utils/cloudinary";
import {
  Plus,
  Trash2,
  Edit2,
  Upload,
  TrendingUp,
  ArrowUpRight,
  Target,
  Clock,
  DollarSign,
  User,
  CheckCircle2,
  Eye,
  X,
} from "lucide-react";

export default function ManageCaseStudies() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingContent, setUploadingContent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    title: "",
    category: "Digital Marketing",
    metric: "3X LEADS",
    image: "",
    link: "",
    summary: "",
    client: "Confidential (Nagpur)",
    role: "Full-Stack Digital Marketing",
    duration: "3 Months",
    budget: "Confidential",
    contentImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    overview: "",
    challengesList: [
      { title: "Low Visibility", desc: "Struggled to get noticed in a crowded online market." },
      { title: "Limited Engagement", desc: "Customer interaction across social channels was minimal." },
      { title: "Inconsistent Leads", desc: "Lead generation was unpredictable, making growth difficult to forecast." }
    ],
    strategy: "Implemented a complete digital marketing strategy including: Social Media Management, Web Development, Meta Ads, and Local SEO.",
    resultsList: [
      "250% increase in social media reach",
      "3X growth in qualified leads",
      "70% increase in website traffic",
      "Improved local brand awareness and customer engagement"
    ],
    isPublished: true,
  };

  const [formData, setFormData] = useState(initialForm);

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

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const url = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, image: url }));
    } catch (err) {
      alert("Failed to upload cover image: " + err.message);
    } finally {
      setUploadingCover(false);
    }
  };

  const handleContentImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingContent(true);
    try {
      const url = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, contentImage: url }));
    } catch (err) {
      alert("Failed to upload content image: " + err.message);
    } finally {
      setUploadingContent(false);
    }
  };

  // Dynamic Challenge Handlers
  const handleAddChallenge = () => {
    setFormData((prev) => ({
      ...prev,
      challengesList: [...prev.challengesList, { title: "", desc: "" }],
    }));
  };

  const handleUpdateChallenge = (index, field, value) => {
    const updated = [...formData.challengesList];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, challengesList: updated }));
  };

  const handleRemoveChallenge = (index) => {
    const updated = formData.challengesList.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, challengesList: updated }));
  };

  // Dynamic Result Handlers
  const handleAddResult = () => {
    setFormData((prev) => ({
      ...prev,
      resultsList: [...prev.resultsList, ""],
    }));
  };

  const handleUpdateResult = (index, value) => {
    const updated = [...formData.resultsList];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, resultsList: updated }));
  };

  const handleRemoveResult = (index) => {
    const updated = formData.resultsList.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, resultsList: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload a cover image or enter an image URL");
      return;
    }

    const payload = {
      ...formData,
      challenges: formData.challengesList,
      results: formData.resultsList,
    };

    if (editingId) {
      await apiUpdateCaseStudy(editingId, payload);
    } else {
      await apiCreateCaseStudy(payload);
    }

    setShowModal(false);
    resetForm();
    loadData();
  };

  const cleanCheckmark = (str) => {
    if (typeof str !== "string") return str;
    return str.replace(/^[✔️✔\s\-\*\•]+/, "").trim();
  };

  const handleEdit = (study) => {
    setEditingId(study._id);

    // Parse Challenges
    let parsedChallenges = [];
    if (Array.isArray(study.challenges)) {
      parsedChallenges = study.challenges.map((item) => {
        if (typeof item === "object" && item !== null) {
          return { title: item.title || "", desc: item.desc || "" };
        }
        return { title: "Challenge", desc: String(item) };
      });
    } else if (typeof study.challenges === "string" && study.challenges.trim()) {
      parsedChallenges = study.challenges.split("\n").filter(Boolean).map((line) => {
        const parts = line.split(":");
        if (parts.length > 1) {
          return { title: parts[0].trim(), desc: parts.slice(1).join(":").trim() };
        }
        return { title: "Challenge", desc: line.trim() };
      });
    }

    if (parsedChallenges.length === 0) {
      parsedChallenges = initialForm.challengesList;
    }

    // Parse Results
    let parsedResults = [];
    if (Array.isArray(study.results)) {
      parsedResults = study.results.map((r) => cleanCheckmark(String(r)));
    } else if (typeof study.results === "string" && study.results.trim()) {
      parsedResults = study.results.split("\n").filter(Boolean).map((line) => cleanCheckmark(line));
    }

    if (parsedResults.length === 0) {
      parsedResults = initialForm.resultsList;
    }

    setFormData({
      title: study.title || "",
      category: study.category || "Digital Marketing",
      metric: study.metric || "3X LEADS",
      image: study.image || "",
      link: study.link || "",
      summary: study.summary || "",
      client: study.client || "Confidential (Nagpur)",
      role: study.role || "Full-Stack Digital Marketing",
      duration: study.duration || "3 Months",
      budget: study.budget || "Confidential",
      contentImage: study.contentImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      overview: study.overview || "",
      challengesList: parsedChallenges,
      strategy: study.strategy || "",
      resultsList: parsedResults,
      isPublished: study.isPublished ?? true,
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
    setFormData(initialForm);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Case Studies</h2>
          <p className="text-sm text-slate-500 font-medium">
            Manage client success stories, dynamic challenge boxes, results & live previews
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md shadow-orange-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Case Study</span>
        </button>
      </div>

      {/* Grid List of Existing Case Studies */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 font-medium">Loading case studies...</div>
      ) : studies.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 font-medium shadow-sm">
          No case studies found. Click "Add Case Study" to create your first client showcase.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studies.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-slate-200 rounded-[24px] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-orange-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <TrendingUp className="w-3 h-3" />
                    {item.metric}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-lg mb-2 leading-snug">{item.title}</h3>
                  {item.client && (
                    <p className="text-xs text-slate-500 font-semibold mb-2">Client: {item.client}</p>
                  )}
                  {item.summary && <p className="text-slate-600 text-xs line-clamp-2">{item.summary}</p>}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    item.isPublished
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {item.isPublished ? "Published" : "Draft"}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Side-by-Side Full Content & Live Preview Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-[28px] w-full max-w-7xl shadow-2xl my-auto max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">
                  {editingId ? "Edit Case Study & Live Preview" : "Add Case Study & Live Preview"}
                </h3>
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Real-time Sync
                </span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split Screen Container */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
              {/* Left Column: Input Form (6 cols) */}
              <div className="lg:col-span-6 p-6 space-y-6 border-r border-slate-200 overflow-y-auto max-h-[82vh]">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Thumbnail Card Info */}
                  <div className="border-b border-slate-100 pb-3">
                    <h4 className="text-xs font-extrabold text-orange-600 uppercase tracking-widest">
                      1. Card Thumbnail Info
                    </h4>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Case Study Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Digital Growth for a Nagpur-Based Business"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Category Tag
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="e.g. Digital Marketing"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Result Metric Tag (Badge)
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.metric}
                        onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                        placeholder="e.g. 3X LEADS"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                      />
                    </div>
                  </div>

                  {/* Cover Image Upload */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Cover / Hero Image (Cloudinary Direct Upload) *
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-2 shrink-0">
                        <Upload className="w-4 h-4 text-slate-600" />
                        <span>{uploadingCover ? "Uploading..." : "Choose File"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCoverUpload}
                          disabled={uploadingCover}
                          className="hidden"
                        />
                      </label>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="Or paste image URL"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                      />
                    </div>
                  </div>

                  {/* Inner Page Details Section */}
                  <div className="border-b border-slate-100 pb-3 pt-4">
                    <h4 className="text-xs font-extrabold text-orange-600 uppercase tracking-widest">
                      2. Inner Case Study Content
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Client Name
                      </label>
                      <input
                        type="text"
                        value={formData.client}
                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                        placeholder="e.g. Confidential (Nagpur)"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Project Name / Role
                      </label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="e.g. Full-Stack Digital Marketing"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="e.g. 3 Months"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Budget
                      </label>
                      <input
                        type="text"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        placeholder="e.g. Confidential"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Case Overview
                    </label>
                    <textarea
                      rows={3}
                      value={formData.overview}
                      onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                      placeholder="Write case overview..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>

                  {/* Dynamic Challenges Section (Separate Boxes + Add More) */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-700 uppercase">
                        Challenges (Separate Boxes)
                      </label>
                      <span className="text-[11px] text-slate-400 font-medium">Add title & description</span>
                    </div>

                    <div className="space-y-3">
                      {formData.challengesList.map((ch, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2 relative group"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-orange-600">Challenge #{idx + 1}</span>
                            {formData.challengesList.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveChallenge(idx)}
                                className="text-slate-400 hover:text-red-500 p-1 rounded-md transition-colors"
                                title="Remove Challenge"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                          <input
                            type="text"
                            value={ch.title}
                            onChange={(e) => handleUpdateChallenge(idx, "title", e.target.value)}
                            placeholder="Challenge Title (e.g. Low Visibility)"
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                          />
                          <input
                            type="text"
                            value={ch.desc}
                            onChange={(e) => handleUpdateChallenge(idx, "desc", e.target.value)}
                            placeholder="Description (e.g. Struggled to get noticed online)"
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleAddChallenge}
                      className="w-full py-2 bg-slate-100 hover:bg-orange-50 hover:text-orange-600 border border-dashed border-slate-300 hover:border-orange-300 text-slate-600 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Challenge</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Our Strategy
                    </label>
                    <textarea
                      rows={3}
                      value={formData.strategy}
                      onChange={(e) => setFormData({ ...formData, strategy: e.target.value })}
                      placeholder="Implemented full digital marketing strategy..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>

                  {/* Dynamic Results Achieved Section (Automatic Checkmarks) */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-700 uppercase">
                        Results Achieved (Automatic Checkmarks ✔️)
                      </label>
                      <span className="text-[11px] text-emerald-600 font-semibold">
                        Checkmark added automatically!
                      </span>
                    </div>

                    <div className="space-y-2">
                      {formData.resultsList.map((resItem, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200 font-bold text-xs">
                            ✓
                          </div>
                          <input
                            type="text"
                            value={resItem}
                            onChange={(e) => handleUpdateResult(idx, e.target.value)}
                            placeholder="e.g. 250% increase in social media reach"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-orange-500"
                          />
                          {formData.resultsList.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveResult(idx)}
                              className="text-slate-400 hover:text-red-500 p-2 rounded-lg transition-colors shrink-0"
                              title="Remove Result Point"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleAddResult}
                      className="w-full py-2 bg-slate-100 hover:bg-orange-50 hover:text-orange-600 border border-dashed border-slate-300 hover:border-orange-300 text-slate-600 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Result Point</span>
                    </button>
                  </div>

                  {/* Dashboard / Content Image Upload */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Results Dashboard Image (Optional)
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-2 shrink-0">
                        <Upload className="w-4 h-4 text-slate-600" />
                        <span>{uploadingContent ? "Uploading..." : "Upload Image"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleContentImageUpload}
                          disabled={uploadingContent}
                          className="hidden"
                        />
                      </label>
                      <input
                        type="text"
                        value={formData.contentImage}
                        onChange={(e) => setFormData({ ...formData, contentImage: e.target.value })}
                        placeholder="Or paste results image URL"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                      />
                    </div>
                    {formData.contentImage && (
                      <div className="mt-3 relative w-36 aspect-[16/9] rounded-lg overflow-hidden border border-slate-200 shadow-xs">
                        <img src={formData.contentImage} alt="Results Dashboard Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="isPublished"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
                    />
                    <label htmlFor="isPublished" className="text-sm font-bold text-slate-700">
                      Publish immediately to website
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={uploadingCover || uploadingContent}
                      className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-md shadow-orange-600/20"
                    >
                      Save Case Study
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: Live Website Side-by-Side Preview (6 cols) */}
              <div className="lg:col-span-6 bg-[#FDFCFB] p-6 overflow-y-auto max-h-[82vh] space-y-8">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-orange-600" />
                    <span className="text-xs font-extrabold text-slate-900 uppercase tracking-widest">
                      Live Website Preview
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">Exact Main Website Theme</span>
                </div>

                {/* 1. Live Thumbnail Card Preview */}
                <div>
                  <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Portfolio Grid Thumbnail Card:
                  </h5>
                  <div className="max-w-sm mx-auto bg-slate-50 border border-slate-200 rounded-[24px] overflow-hidden shadow-sm flex flex-col">
                    <div className="relative aspect-[4/3] bg-slate-200">
                      {formData.image ? (
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 font-bold">
                          No Image Uploaded
                        </div>
                      )}
                      <div className="absolute top-3 left-3 bg-orange-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                        <TrendingUp className="w-3 h-3" />
                        {formData.metric || "3X LEADS"}
                      </div>
                    </div>
                    <div className="p-6 text-left">
                      <span className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2 block">
                        {formData.category || "Digital Marketing"}
                      </span>
                      <h4 className="text-lg font-bold text-slate-900 leading-snug mb-4">
                        {formData.title || "Case Study Title"}
                      </h4>
                      <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1 text-orange-600">
                        Read Case Study
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Live Inner Case Study Details Preview */}
                <div>
                  <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Inner Case Study Page View:
                  </h5>

                  <div className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-sm p-4 space-y-6">
                    {/* Hero Preview */}
                    <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center text-center p-4">
                      {formData.image && (
                        <img
                          src={formData.image}
                          alt="Hero"
                          className="absolute inset-0 w-full h-full object-cover opacity-50"
                        />
                      )}
                      <h3 className="relative z-10 text-xl font-bold text-white leading-tight">
                        {formData.title || "Case Study Title"}
                      </h3>
                    </div>

                    {/* Meta Stats Card */}
                    <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
                          <Target className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <span className="block text-slate-400 text-[10px] font-bold uppercase">Project</span>
                          <span className="block text-slate-900 font-bold text-xs">
                            {formData.role || "Full-Stack Marketing"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
                          <User className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <span className="block text-slate-400 text-[10px] font-bold uppercase">Client</span>
                          <span className="block text-slate-900 font-bold text-xs">
                            {formData.client || "Confidential"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
                          <Clock className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <span className="block text-slate-400 text-[10px] font-bold uppercase">Duration</span>
                          <span className="block text-slate-900 font-bold text-xs">
                            {formData.duration || "3 Months"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
                          <DollarSign className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <span className="block text-slate-400 text-[10px] font-bold uppercase">Budget</span>
                          <span className="block text-slate-900 font-bold text-xs">
                            {formData.budget || "Confidential"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Overview */}
                    {formData.overview && (
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-2">Case Overview</h4>
                        <p className="text-slate-600 text-xs leading-relaxed">{formData.overview}</p>
                      </div>
                    )}

                    {/* Challenges Live Preview */}
                    {formData.challengesList.filter((c) => c.title || c.desc).length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-3">Challenges</h4>
                        <div className="space-y-2">
                          {formData.challengesList.map((ch, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                              <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                              <p className="text-slate-600 leading-relaxed">
                                {ch.title && <strong className="text-slate-900">{ch.title}: </strong>}
                                {ch.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Strategy */}
                    {formData.strategy && (
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-2">Our Strategy</h4>
                        <p className="text-slate-600 text-xs leading-relaxed">{formData.strategy}</p>
                      </div>
                    )}

                    {/* Results Achieved Live Preview (Automatic Checkmarks) */}
                    {formData.resultsList.filter(Boolean).length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-3">Results Achieved</h4>
                        <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          {formData.resultsList.map((resLine, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                              <span className="text-emerald-600 font-bold">✔️</span>
                              <span>{resLine}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Content Image */}
                    {formData.contentImage && (
                      <div className="rounded-xl overflow-hidden border border-slate-200">
                        <img src={formData.contentImage} alt="Results Dashboard" className="w-full h-auto" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
