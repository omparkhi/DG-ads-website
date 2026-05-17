export default function BookCallButton() {
  const avatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  ];

  return (
    <a
      href="#contact"
      className="group inline-flex items-center rounded-full bg-slate-200 px-3 py-2 pr-7 text-black shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
    >
      <div className="flex -space-x-6">
        {avatars.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Team member"
            className="h-12 w-12 rounded-full border-2 border-white object-cover transition duration-300 group-hover:border-black"
          />
        ))}
      </div>

      <span className="ml-5 text-lg font-semibold">
        Book a call with a team
      </span>
    </a>
  );
}
