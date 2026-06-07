import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Features from "./components/Features";
import Story from "./components/Story";
import WhatWeDo from "./components/WhatWeDo";
import Pinned from "./components/Pinned";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";

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
      <ContactUs />
      <Footer />
    </div>
  );
}

export default App;
