import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Features from "./components/Features";

function App() {
  return (
    <div className="main-container" data-scroll-container>
      <NavBar />
      <Hero />
      <AboutUs />
      <Features />

      {/* Placeholder for upcoming sections */}
      <div className="min-h-screen w-screen bg-blue-50 flex-center">
        <p className="font-circular-web text-blue-200 text-xl">
          More sections coming soon...
        </p>
      </div>
    </div>
  );
}

export default App;
