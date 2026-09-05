import React, { useState, useEffect } from "react";
import { apiGetInquiries, apiUpdateInquiryStatus, apiDeleteInquiry } from "../services/api";
import { Trash2, Phone, Mail, Calendar } from "lucide-react";

export default function ManageInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const res = await apiGetInquiries();
    if (res.success && res.data) {
      setInquiries(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await apiUpdateInquiryStatus(id, newStatus);
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      await apiDeleteInquiry(id);
      loadData();
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Lead Submissions</h2>
          <p className="text-sm text-slate-400">View and manage customer inquiries submitted from your website</p>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading lead submissions...</div>
      ) : inquiries.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          No lead submissions yet. Incoming contact form submissions will appear here.
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((item) => (
            <div
              key={item._id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-white text-lg">{item.name}</h3>
                  <span className="text-xs bg-orange-600/10 border border-orange-500/20 text-orange-400 px-2.5 py-0.5 rounded-full font-semibold">
                    {item.service || "General Inquiry"}
                  </span>
                  {item.budget && (
                    <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-semibold">
                      Budget: {item.budget}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5 text-slate-200">
                    <Phone className="w-3.5 h-3.5 text-orange-500" />
                    <a href={`tel:${item.phone}`} className="hover:underline">{item.phone}</a>
                  </span>
                  {item.email && (
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <a href={`mailto:${item.email}`} className="hover:underline">{item.email}</a>
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {item.message && (
                  <p className="text-slate-300 text-sm mt-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    {item.message}
                  </p>
                )}
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center gap-4 border-t md:border-t-0 border-slate-800 pt-4 md:pt-0 shrink-0">
                <select
                  value={item.status || "New"}
                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  className={`text-xs font-semibold px-3 py-2 rounded-xl bg-slate-950 border focus:outline-none cursor-pointer ${
                    item.status === "Contacted"
                      ? "border-blue-500/40 text-blue-400"
                      : item.status === "Closed"
                      ? "border-emerald-500/40 text-emerald-400"
                      : "border-orange-500/40 text-orange-400"
                  }`}
                >
                  <option value="New">New Lead</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Closed">Closed / Won</option>
                  <option value="Archived">Archived</option>
                </select>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
