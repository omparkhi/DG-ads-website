export default function Button({
  children,
  variant = "primary",
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 hover:-translate-y-0.5",
    outline:
      "border border-slate-300 bg-white text-slate-900 hover:border-blue-600 hover:text-blue-600",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
