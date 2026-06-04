import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="min-h-screen w-screen bg-blue-50 relative">
      <NavBar />

      {/* Placeholder content so the nav has something to sit on top of */}
      <div className="flex-center flex-col pt-40 gap-6 px-10 text-center">
        <h1 className="hero-heading text-blue-200">
          ZE<b>N</b>TRY
        </h1>
        <p className="font-circular-web text-lg text-blue-200 max-w-xl">
          The metagame layer for your cross-world identity.
        </p>
      </div>
    </div>
  );
}

export default App;
