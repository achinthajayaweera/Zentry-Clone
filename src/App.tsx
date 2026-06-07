import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Features from "./components/Features";
import Story from "./components/Story";
import WhatWeDo from "./components/WhatWeDo";
import Pinned from "./components/Pinned";

function App() {
  return (
    <div className="main-container" data-scroll-container>
      <NavBar />
      <Hero />
      <AboutUs />
      <Features />
      <Story />
      <WhatWeDo />
      <Pinned />

      {/* Placeholder for ContactUs + Footer (coming in v11) */}
      <div className="min-h-screen w-screen bg-blue-50 flex-center">
        <p className="font-circular-web text-blue-200 text-xl">
          Contact & Footer coming soon...
        </p>
      </div>
    </div>
  );
}

export default App;
