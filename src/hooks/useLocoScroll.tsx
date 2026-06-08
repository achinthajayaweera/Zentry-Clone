"use client";
import { useLayoutEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";

const useLocoScroll = () => {
  gsap.registerPlugin(ScrollTrigger);
  const [locoScroll, setLocoScroll] = useState<LocomotiveScroll | null>(null);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const scrollEl: HTMLElement | null = document.querySelector(".main-container");
    if (!scrollEl) return;

    const locoScrollInstance = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: 1.5,
      //@ts-ignore
      mobile: { smooth: true },
    });

    setLocoScroll(locoScrollInstance);

    locoScrollInstance.on("scroll", ScrollTrigger.update);
    locoScrollInstance.on("scroll", (args) => setProgress(args.scroll.y));

    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        return arguments.length
          ? locoScrollInstance.scrollTo(value, 0)
          : locoScrollInstance.scroll.instance.scroll.y;
      },
      scrollLeft(value) {
        return arguments.length
          ? locoScrollInstance.scrollTo(value, 0)
          : locoScrollInstance.scroll.instance.scroll.x;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: scrollEl?.style.transform ? "transform" : "fixed",
    });

    const lsUpdate = () => locoScrollInstance.update();
    ScrollTrigger.addEventListener("refresh", lsUpdate);
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", lsUpdate);
      locoScrollInstance.destroy();
    };
  }, []);

  return { locoScroll, progress };
};

export default useLocoScroll;