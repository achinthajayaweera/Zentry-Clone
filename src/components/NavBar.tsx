import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const NavBar = () => {
  return (
    <div className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">

          {/* Left side: logo + products button */}
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />
            <Button
              id="product-btn"
              title="products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 hidden md:flex items-center justify-center gap-1"
            />
          </div>

          {/* Right side: nav links + audio indicator placeholder */}
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <button key={index} className="nav-hover-btn">
                  {item}
                </button>
              ))}
            </div>

            {/* Audio indicator bars — static for now, animation comes in v5 */}
            <button className="ml-10 p-1 flex items-center space-x-0.5">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="indicator-line" />
              ))}
            </button>
          </div>

        </nav>
      </header>
    </div>
  );
};

export default NavBar;
