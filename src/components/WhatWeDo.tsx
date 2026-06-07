import { useEffect } from "react";
import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Button from "./Button";

const WhatWeDo = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // When the section scrolls into view (top crosses 70% of viewport),
      // transition the background from yellow-300 to blue-50 (DFDFF0).
      // This creates a smooth colour handoff between the Features (black)
      // and WhatWeDo sections.
      ScrollTrigger.create({
        trigger: ".whatwedo",
        start: "top 70%",
        scroller: ".main-container",
        animation: gsap.to(".whatwedo", { backgroundColor: "#DFDFF0" }),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="whatwedo py-8 lg:py-32 h-full min-h-dvh w-screen bg-yellow-300 overflow-hidden flex-col gap-10 flex justify-center items-center">

      {/* Section label */}
      <p className="font-general text-sm uppercase md:text-[10px]">
        WHO WE ARE
      </p>

      {/* Large staggered animated title — each word flies in from 3D depth */}
      <AnimatedTitle
        className="!gap-1 !text-black"
        title="WE'RE BUILDING<br/> A NEW REALITY <br/> THAT REWARDS <br/> PLAYERS AND <br/>ENCOURAGES<br/>COMMUNITIES<br/>TO THRIVE"
      />

      {/* Tagline */}
      <p className="text-center text-xs lg:text-sm font-circular-web">
        Zentry is on a mission to unite diverse player networks to forge the
        world's largest shared adventure.
      </p>

      {/* CTA */}
      <Button
        id="discover"
        title="DISCOVER WHO WE ARE"
        containerClass="!bg-black !text-white"
      />
    </section>
  );
};

export default WhatWeDo;
