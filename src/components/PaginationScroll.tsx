// PaginationScroll renders a single numbered item in the Pinned section's
// scrollable list. Each item has:
//   - A step number + a vertical progress line (animated by GSAP in Pinned.tsx)
//   - A title (fades from dim to full opacity on scroll-enter)
//   - A description paragraph (scales in from zero height on scroll-enter)
const PaginationScroll = ({
  title,
  description,
  num,
}: {
  title: string;
  description: string;
  num: string;
}) => {
  return (
    <div className="pagination mt-4 flex text-black items-start">

      {/* Left column: step number + animated vertical progress line */}
      <div className="flex flex-col items-center mr-5">
        <span className="text-xs lg:text-[10px] font-general mt-[0.6px]">
          {num}
        </span>

        {/* lineContainer: expands from h-0 to h-24 when item enters viewport */}
        <span className="lineContainer bg-gray-300/80 relative overflow-hidden rounded-xl mt-4 w-1 h-24">
          {/* .line: travels upward (y: -120 → 80) driven by scroll scrub */}
          <span className="bg-gray-800/80 absolute line -translate-y-full top-0 rounded-xl mt-4 w-1 h-24" />
        </span>
      </div>

      {/* Right column: title + description */}
      <div className="flex pagination2 flex-col gap-2 relative font-robert-regular">
        {/* .title: opacity 0.3 → 1 on scroll-enter */}
        <h4 className="title">{title}</h4>
        <div className="h-auto">
          {/* paragraph: scaleY 0 → 1 on scroll-enter, positioned absolute */}
          <p className="max-w-64 absolute top-7 text-xs lg:text-sm font-circular-web">
            {description}
          </p>
        </div>
      </div>

    </div>
  );
};

export default PaginationScroll;
