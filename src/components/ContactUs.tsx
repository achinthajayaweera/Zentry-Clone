import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

// ── ImageClipBox ────────────────────────────────────────────────────────────
// Small helper that applies a named clip-path utility class around an image.
// The clip-path shapes (contact-clip-path-1/2, sword-man-clip-path) are
// defined in index.css and create the angled polygon cuts on each photo.
const ImageClipBox = ({
  src,
  clipClass,
}: {
  src: string;
  clipClass: string;
}) => (
  <div className={clipClass}>
    <img src={src} alt="" />
  </div>
);

const ContactUs = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">

        {/* ── Left decorative images (hidden on mobile) ── */}
        {/* Two polygon-clipped photos stacked vertically on the left edge */}
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.webp"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-10 translate-y-60"
          />
        </div>

        {/* ── Right swordman image pair ── */}
        {/* Two overlapping sword-man images: one partial (base), one with
            the sword-man-clip-path polygon cut on top */}
        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/swordman-partial.webp"
            clipClass="absolute md:scale-125"
          />
          <ImageClipBox
            src="/img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        {/* ── Centre content: label + animated title + CTA ── */}
        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Join Zentry
          </p>

          {/* AnimatedTitle with HTML entities and inline <b> for Zentry font */}
          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild the <br/> new era of <br/> g<b>a</b>ming t<b>o</b>gether."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-8xl !font-black !leading-[.9]"
          />

          <Button
            id="contact-us"
            title="contact us"
            containerClass="mt-10 cursor-pointer"
          />
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
