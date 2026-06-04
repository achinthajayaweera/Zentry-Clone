import { useLayoutEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";

const useLocoScroll = () => {
  gsap.registerPlugin(ScrollTrigger);

  const [locoScroll, setLocoScroll] = useState<LocomotiveScroll | null>(null);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    // Grab the main scrollable container from the DOM
    const scrollEl: HTMLElement | null = document.querySelector(".main-container");
    if (!scrollEl) return;

    // Initialize Locomotive Scroll with smooth scrolling enabled
    const locoScrollInstance = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: 1.5,
      // @ts-ignore — mobile smooth scroll (unofficial option)
      mobile: {
        smooth: true,
      },
    });

    setLocoScroll(locoScrollInstance);

    // Keep GSAP ScrollTrigger in sync with Locomotive Scroll position
    locoScrollInstance.on("scroll", ScrollTrigger.update);
    locoScrollInstance.on("scroll", (args) => setProgress(args.scroll.y));

    // Proxy the scroll container so ScrollTrigger reads Locomotive's values
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
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: scrollEl?.style.transform ? "transform" : "fixed",
    });

    // Refresh ScrollTrigger whenever Locomotive updates layout
    const lsUpdate = () => locoScrollInstance.update();
    ScrollTrigger.addEventListener("refresh", lsUpdate);
    ScrollTrigger.refresh();

    // Cleanup on unmount
    return () => {
      if (locoScrollInstance) {
        ScrollTrigger.removeEventListener("refresh", lsUpdate);
        locoScrollInstance.destroy();
      }
    };
  }, []);

  return { locoScroll, progress };
};

export default useLocoScroll;
