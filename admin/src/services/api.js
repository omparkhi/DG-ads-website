const API_BASE = import.meta.env.VITE_API_URL || "/api";

function getAuthHeaders() {
  const token = localStorage.getItem("dgads_admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchAPI(endpoint, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    return { success: false, message: error.message };
  }
}

// Auth API
export const apiLogin = (credentials) =>
  fetchAPI("/auth/login", { method: "POST", body: JSON.stringify(credentials) });

export const apiCheckAuth = () => fetchAPI("/auth/me");

// Admin Case Studies
export const apiGetAdminCaseStudies = () => fetchAPI("/case-studies/all");
export const apiGetCaseStudyById = (id) => fetchAPI(`/case-studies/${id}`);
export const apiCreateCaseStudy = (data) =>
  fetchAPI("/case-studies", { method: "POST", body: JSON.stringify(data) });
export const apiUpdateCaseStudy = (id, data) =>
  fetchAPI(`/case-studies/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const apiDeleteCaseStudy = (id) =>
  fetchAPI(`/case-studies/${id}`, { method: "DELETE" });

// Admin Testimonials
export const apiGetTestimonials = () => fetchAPI("/testimonials");
export const apiCreateTestimonial = (data) =>
  fetchAPI("/testimonials", { method: "POST", body: JSON.stringify(data) });
export const apiUpdateTestimonial = (id, data) =>
  fetchAPI(`/testimonials/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const apiDeleteTestimonial = (id) =>
  fetchAPI(`/testimonials/${id}`, { method: "DELETE" });

// Admin Client Logos
export const apiGetAdminClientLogos = () => fetchAPI("/client-logos/all");
export const apiCreateClientLogo = (data) =>
  fetchAPI("/client-logos", { method: "POST", body: JSON.stringify(data) });
export const apiUpdateClientLogo = (id, data) =>
  fetchAPI(`/client-logos/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const apiDeleteClientLogo = (id) =>
  fetchAPI(`/client-logos/${id}`, { method: "DELETE" });

// Admin Stats
export const apiGetStats = () => fetchAPI("/stats");
export const apiCreateStat = (data) =>
  fetchAPI("/stats", { method: "POST", body: JSON.stringify(data) });
export const apiUpdateStat = (id, data) =>
  fetchAPI(`/stats/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const apiDeleteStat = (id) =>
  fetchAPI(`/stats/${id}`, { method: "DELETE" });

// Admin Inquiry Management
export const apiGetInquiries = () => fetchAPI("/inquiries");
export const apiUpdateInquiryStatus = (id, status) =>
  fetchAPI(`/inquiries/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
export const apiDeleteInquiry = (id) =>
  fetchAPI(`/inquiries/${id}`, { method: "DELETE" });
