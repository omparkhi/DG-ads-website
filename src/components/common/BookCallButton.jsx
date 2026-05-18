export default function BookCallButton() {
  const avatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  ];

  return (
    <a
      href="#contact"
      className="
        group inline-flex items-center
        rounded-full bg-slate-200
        px-2 py-2 pr-4
        sm:px-3 sm:pr-5
        md:px-3 md:pr-6
        lg:px-4 lg:pr-7
        text-black shadow-lg
        transition-all duration-300
        hover:-translate-y-0.5 hover:bg-white
      "
    >
      <div className="flex -space-x-3 sm:-space-x-4 md:-space-x-5 lg:-space-x-6">
        {avatars.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Team member"
            className="
              h-8 w-8
              sm:h-9 sm:w-9
              md:h-10 md:w-10
              lg:h-12 lg:w-12
              rounded-full border-2 border-white
              object-cover transition duration-300
              group-hover:border-black
            "
          />
        ))}
      </div>

      <span
        className="
          ml-3
          text-sm
          sm:text-[15px]
          md:text-base
          lg:text-lg
          font-semibold
          whitespace-nowrap
        "
      >
        Book a call with a team
      </span>
    </a>
  );
}
