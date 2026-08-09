export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-orange-600 text-white shadow-lg shadow-orange-600/25 hover:bg-orange-700 hover:-translate-y-0.5",
    outline:
      "border border-slate-300 bg-white text-slate-900 hover:border-orange-600 hover:text-orange-600",
  };

  return (
    <button 
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
