import gsap from "gsap";
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse";
import { useEffect } from "react";
import AnimatedTitle from "./AnimatedTitle";

const AboutUs = () => {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const context = gsap.context(() => {
      // On desktop: start with an angled polygon clip on the about image
      if (!isMobile) {
        gsap.set(".mask-clip-path2", {
          clipPath: "polygon(14% 0, 82% 16%, 80% 92%, 6% 89%)",
        });
      }

      gsap
        .timeline({
          scrollTrigger: {
            scroller: ".main-container",   // Locomotive Scroll container
            trigger: "#clip",
            start: "51% center",           // trigger once image centre passes viewport centre
            end: "+=800 center",           // pin for 800px of scroll
            scrub: 0.5,
            pin: true,
            pinSpacing: true,

            // When scrolling back up: restore angled clip
            onLeaveBack: () => {
              if (!isMobile) {
                gsap.to(".mask-clip-path2", {
                  clipPath: "polygon(14% 0, 82% 16%, 80% 92%, 6% 89%)",
                });
              }
            },

            // Interpolate clip-path corners from angled → rectangular as scroll progresses
            onUpdate: (self) => {
              if (isMobile) return;
              const progress = self.progress;
              const clipPathValue = `
                polygon(
                  ${gsap.utils.interpolate(14, 0, progress)}% 0%,
                  ${gsap.utils.interpolate(82, 100, progress)}% 0%,
                  ${gsap.utils.interpolate(80, 100, progress)}% 100%,
                  ${gsap.utils.interpolate(6, 0, progress)}% 100%
                )
              `;
              gsap.to(".mask-clip-path2", { clipPath: clipPathValue });
            },
          },
        })
        // Scale the image up to fill the full viewport while pinned
        .to(".mask-clip-path2", {
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
        });
    });

    return () => context.revert();
  }, []);

  return (
    <div id="about" className="min-h-screen w-screen flex flex-col overflow-hidden bg-blue-50">

      {/* Section header */}
      <div className="flex relative mb-8 mt-36 flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
          WELCOME TO ZENTRY
        </p>

        {/* Words animate in with a 3D stagger as the section scrolls into view */}
        <AnimatedTitle
          title="DISC<b>O</b>VER THE WORLD'S LARGEST SHARED <b>A</b>DVENTURE"
          className="mt-5 w-full !text-black text-center"
        />
      </div>

      {/* Mouse parallax wrapper adds subtle depth on desktop hover */}
      <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
        <MouseParallaxChild factorX={0.3} factorY={0.5}>
          <div id="clip" className="relative h-dvh">

            {/* The about image — starts as a small angled shape, expands on scroll */}
            <div
              className="absolute rounded-3xl overflow-hidden left-1/2 top-0 z-20
                border border-black mask-clip-path2 origin-center
                -translate-x-1/2 w-[30vw] h-96"
            >
              <img
                src="/img/about.webp"
                className="absolute inset-0 size-full object-cover"
                alt="About Zentry"
              />
            </div>

            {/* Descriptive text anchored below the image */}
            <div className="about-subtext">
              <p className="capitalize">
                The Game of Games begins—your life, now an epic MMORPG
              </p>
              <p className="text-gray-500">
                Zentry unites every player from countless games and platforms,
                both digital and physical, into a unified Play Economy
              </p>
            </div>
          </div>
        </MouseParallaxChild>
      </MouseParallaxContainer>
    </div>
  );
};

export default AboutUs;
