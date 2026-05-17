import CurvedLoop from "../common/CurvedLoop";

const desktopVideo =
  "https://res.cloudinary.com/dn56jtwoq/video/upload/f_auto,q_auto,w_1600/video1_crfsqn.mp4";

const mobileVideo =
  "https://res.cloudinary.com/dn56jtwoq/video/upload/f_auto,q_auto,w_800/video1_crfsqn.mp4";

export default function Hero() {
  return (
    <>
      <section id="home" className="relative h-screen w-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={mobileVideo} media="(max-width: 768px)" />
          <source src={desktopVideo} type="video/mp4" />
        </video>
        {/* Light premium overlay */}
        {/* <div className="absolute inset-0 bg-white/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-white/20" /> */}

        {/* Content */}
      </section>
      <div className="-mt-50 relative z-20">
        <CurvedLoop
          marqueeText="Digital Marketing  ✦  Social Media  ✦  Branding  ✦  Performance Ads  ✦  Content Creation  ✦  Growth Strategy  ✦ Web Services  ✦ "
          speed={2}
          curveAmount={150}
          direction="right"
          interactive
          className="custom-text-style"
        />
      </div>
    </>
  );
}
