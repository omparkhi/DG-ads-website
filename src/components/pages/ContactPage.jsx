import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import Avatar from "../../assets/dg-ads-avatar.png";
import { apiSubmitInquiry } from "../../services/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await apiSubmitInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: formData.subject || "General Inquiry",
        message: formData.message,
      });

      if (res.success) {
        setIsSubmitted(true);
        setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 6000);
      } else {
        setErrorMessage(res.message || "Failed to submit message. Please try again.");
      }
    } catch (err) {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-orange-600" />,
      title: "Email Us",
      details: "dgads4u@yahoo.com",
      description: "We'll respond as soon as possible.",
    },
    {
      icon: <Phone className="w-6 h-6 text-orange-600" />,
      title: "Call Us (Primary)",
      details: "+91 9021375766",
      description: "Mon-Sat from 9am to 6pm.",
    },
    {
      icon: <Phone className="w-6 h-6 text-orange-600" />,
      title: "Call Us (Alternate)",
      details: "+91 7447342862",
      description: "Available for WhatsApp too.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-24 overflow-hidden relative select-none">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-900/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-bold text-xs tracking-widest uppercase mb-6 shadow-sm">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 font-['Mona_Sans'] tracking-tight leading-tight">
              Let's Build Something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                Extraordinary
              </span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              Have a project in mind or want to learn more about our services? Our team of experts is ready to help you accelerate your growth.
            </p>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Contact Info & Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            {/* Avatar Card */}
            <div className="flex flex-col items-center justify-center text-center relative group p-4">
              <img
                src={Avatar}
                alt="DG Ads Avatar"
                className="w-40 h-40 object-contain mb-6 relative z-10 group-hover:scale-105 transition-transform duration-500"
              />
              <h3 className="text-2xl font-bold text-slate-900 font-['Mona_Sans'] relative z-10">We're Here to Help!</h3>
              <p className="text-slate-500 mt-2 font-medium relative z-10">
                Drop us a message and our digital strategists will get back to you shortly.
              </p>
            </div>

            {/* Contact Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-start gap-4 hover:border-orange-200 hover:shadow-md transition-all duration-300">
                  <div className="p-3 bg-orange-50 rounded-xl">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{info.title}</h4>
                    <p className="text-orange-600 font-semibold mt-1">{info.details}</p>
                    <p className="text-sm text-slate-500 mt-1">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-2xl shadow-slate-200/50">
              <h3 className="text-3xl font-bold text-slate-900 mb-8 font-['Mona_Sans']">Send a Message</h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-bold text-slate-700 ml-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:bg-white text-slate-900 rounded-xl px-5 py-4 text-base focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 placeholder:text-slate-400 font-medium"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm font-bold text-slate-700 ml-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 9876543210"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:bg-white text-slate-900 rounded-xl px-5 py-4 text-base focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 placeholder:text-slate-400 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:bg-white text-slate-900 rounded-xl px-5 py-4 text-base focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 placeholder:text-slate-400 font-medium"
                    />
                  </div>

                  {/* Subject Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-sm font-bold text-slate-700 ml-1">
                      Service Interested In
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Meta Ads / Digital Marketing"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:bg-white text-slate-900 rounded-xl px-5 py-4 text-base focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 placeholder:text-slate-400 font-medium"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-bold text-slate-700 ml-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your business goals..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:bg-white text-slate-900 rounded-xl px-5 py-4 text-base focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 placeholder:text-slate-400 font-medium resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mt-4 w-full md:w-auto md:self-end flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 hover:-translate-y-1 cursor-pointer ${isSubmitting ? "opacity-70 cursor-wait" : ""
                    }`}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">
                    {errorMessage}
                  </div>
                )}

                {/* Success Message */}
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700 font-medium"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                    Thank you! Your message has been sent successfully. We will be in touch soon.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
