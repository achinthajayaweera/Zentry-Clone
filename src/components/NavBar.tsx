import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useSmoothScroll } from "../context/ScrollProviderContext";
import gsap from "gsap";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const NavBar = () => {
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  // Audio state
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // Scroll-aware visibility state
  const { locoScroll, progress } = useSmoothScroll();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  // Toggle background audio and animate the indicator bars
  const toggleAudio = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Play or pause audio whenever the toggle state changes
  useEffect(() => {
    if (!audioElementRef.current) return;
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  // Show/hide nav and add/remove floating pill style based on scroll direction
  useEffect(() => {
    if (!navContainerRef.current) return;

    if (progress <= 10) {
      // At top of page — show full nav, no floating style
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (progress > lastScrollY) {
      // Scrolling down — hide nav
      setIsNavVisible(false);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (progress < lastScrollY) {
      // Scrolling up — show nav with floating pill style
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(progress);
  }, [progress]);

  // GSAP animation to slide nav in/out smoothly
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">

          {/* Left: logo + products button */}
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />
            <Button
              id="product-btn"
              title="products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 hidden md:flex items-center justify-center gap-1"
            />
          </div>

          {/* Right: nav links + audio toggle */}
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() =>
                    locoScroll?.scrollTo("#about", { duration: 0 })
                  }
                  className="nav-hover-btn"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Audio toggle button with animated indicator bars */}
            <button
              onClick={toggleAudio}
              className="ml-10 p-1 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                src="/audio/loop.mp3"
                loop
                className="hidden"
              />
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className={`indicator-line ${isIndicatorActive ? "active" : ""}`}
                />
              ))}
            </button>
          </div>

        </nav>
      </header>
    </div>
  );
};

export default NavBar;
