function App() {
  return (
    <div className="min-h-screen w-screen bg-blue-50 p-10">

      {/* Heading preview */}
      <h1 className="hero-heading text-blue-200 mb-4">
        ZE<b>N</b>TRY
      </h1>

      {/* Colour palette swatches */}
      <div className="flex gap-4 mb-10 flex-wrap">
        <div className="w-20 h-20 rounded-lg bg-blue-50 border border-black/10 flex-center text-xs text-black">blue-50</div>
        <div className="w-20 h-20 rounded-lg bg-blue-75 flex-center text-xs text-black">blue-75</div>
        <div className="w-20 h-20 rounded-lg bg-blue-100 flex-center text-xs text-black">blue-100</div>
        <div className="w-20 h-20 rounded-lg bg-blue-200 flex-center text-xs text-white">blue-200</div>
        <div className="w-20 h-20 rounded-lg bg-blue-300 flex-center text-xs text-white">blue-300</div>
        <div className="w-20 h-20 rounded-lg bg-violet-300 flex-center text-xs text-white">violet-300</div>
        <div className="w-20 h-20 rounded-lg bg-yellow-100 flex-center text-xs text-white">yellow-100</div>
        <div className="w-20 h-20 rounded-lg bg-yellow-300 flex-center text-xs text-black">yellow-300</div>
      </div>

      {/* Font family previews */}
      <div className="space-y-4 text-blue-200">
        <p className="font-zentry text-3xl">Zentry Font — The Metagame Layer</p>
        <p className="font-general text-xl">General Font — Enter the Play Economy</p>
        <p className="font-circular-web text-xl">Circular Web — Unleash Your Potential</p>
        <p className="font-robert-medium text-xl">Robert Medium — Redefine Gaming</p>
        <p className="font-robert-regular text-xl">Robert Regular — Beyond the Boundaries</p>
      </div>

      {/* Loading spinner preview */}
      <div className="mt-10 flex-center gap-8">
        <div className="three-body">
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
        </div>
        <span className="font-general text-xs uppercase text-blue-200">Loading spinner</span>
      </div>

    </div>
  );
}

export default App;
