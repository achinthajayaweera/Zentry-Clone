// RoundedCorners injects an invisible SVG <filter> into the DOM.
// The filter id="flt_tag" is referenced by `.story-img-container` in index.css
// via `filter: url("#flt_tag")`. It combines a Gaussian blur with a high-contrast
// colour matrix to produce smooth, rounded edges on the polygon-clipped image —
// a technique known as the "gooey" or "liquid corners" CSS filter trick.
const RoundedCorners = () => {
  return (
    <>
      <svg
        className="invisible absolute size-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="flt_tag">
            {/* Step 1: blur the alpha channel edges */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            {/* Step 2: high-contrast matrix snaps soft blur back to hard edges,
                        but now the corners are smooth instead of jagged */}
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="flt_tag"
            />
            {/* Step 3: composite original graphic on top so colours stay accurate */}
            <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default RoundedCorners;
