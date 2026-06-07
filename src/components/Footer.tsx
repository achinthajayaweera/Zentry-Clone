import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

// Social link definitions — icon + URL in one place so they're easy to update
const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-[#5542ff] py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">

        {/* Copyright — year computed dynamically so it never goes stale */}
        <p className="text-center text-sm font-light md:text-left">
          ©Nova {new Date().getFullYear()}. All rights reserved
        </p>

        {/* Social icons row */}
        <div className="flex justify-center gap-4 md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Privacy policy link */}
        <a
          href="#privacy-policy"
          className="text-center text-sm font-light hover:underline md:text-right"
        >
          Privacy Policy
        </a>

      </div>
    </footer>
  );
};

export default Footer;
