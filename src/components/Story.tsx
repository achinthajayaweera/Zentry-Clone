import { useEffect, useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import RoundedCorners from "./RoundedCorners";
import Button from "./Button";
import { ScrollTrigger } from "gsap/all";

const Story = () => {
  const frameRef = useRef<HTMLImageElement>(null);

  // ── Mouse-tilt handlers on the image ──────────────────────────────────────
  const handleMouseLeave = () => {
    const element = frameRef.current;
    if (!element) return;
    // Smoothly reset tilt back to flat when cursor leaves
    gsap.to(element, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.3,
      ease: "power1.inOut",
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();

    // Cursor position relative to image centre
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Map to ±25° tilt range; invert X axis for natural feel
    const rotateX = ((y - centerY) / centerY) * -25;
    const rotateY = ((x - centerX) / centerX) * 25;

    gsap.to(element, {
      rotateX,
      rotateY,
      duration: 0.3,
      perspective: 600,
      ease: "power1.inOut",
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Parallax scroll: image drifts 100px down as section passes ──────
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".imgtilt",
            scroller: ".main-container",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        })
        .to(".story-img-content img", { y: 100 });

      // ── Last-section text: flies in from 3D depth when scrolled into view ──
      const lastSectionAnimation = gsap
        .timeline()
        .from(".lastSection p", {
          transform:
            "translate3d(0,100px,500px) rotateY(60deg) rotateX(-40deg)",
          transformOrigin: "50% 50% -50%",
          opacity: 0,
          duration: 1.4,
        })
        .from("#realm-btn", { y: 40, opacity: 0, duration: 1 }, "<");

      // Play forward on scroll down, reverse on scroll up
      ScrollTrigger.create({
        trigger: ".lastSection",
        scroller: ".main-container",
        start: "top 90%",
        end: "bottom top",
        onUpdate: (self) => {
          if (self.direction === -1) lastSectionAnimation.reverse();
          else lastSectionAnimation.play();
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">

        {/* Section label */}
        <p className="font-general text-sm uppercase md:text-[10px]">
          the multiverse ip world
        </p>

        {/* Mouse-tilt wrapper — covers the title + image area */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseLeave}
          onMouseEnter={handleMouseLeave}
          className="relative size-full"
        >
          {/* Animated staggered title — mix-blend-difference inverts colours
              against the image beneath for a dramatic contrast effect */}
          <AnimatedTitle
            sectionId="storyTitle"
            className="mt-5 pointer-events-none mix-blend-difference relative z-10"
            title="THE ST<b>o</b>RY OF <br/> THE HIDDEN REAL<b>M</b>"
          />

          {/* Image container — polygon clip + SVG gooey filter for rounded corners */}
          <div className="w-full imgtilt story-img-container h-[90vh] md:h-dvh relative">
            <div className="story-img-mask">
              <div className="story-img-content">
                {/* frameRef target for the mouse-tilt GSAP animation */}
                <img
                  ref={frameRef}
                  src="/img/entrance.webp"
                  alt="The Hidden Realm entrance"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Injects the SVG filter used by .story-img-container in CSS */}
            <RoundedCorners />
          </div>
        </div>

        {/* Last-section copy + CTA — animated in from 3D depth on scroll */}
        <div className="lastSection -mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex flex-col h-full w-fit items-center md:items-start">
            <p
              style={{ perspective: "600px" }}
              className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start"
            >
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              opportunities.
            </p>
            <Button
              id="realm-btn"
              title="discover prologue"
              containerClass="mt-5"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Story;
