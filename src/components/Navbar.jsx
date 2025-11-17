import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import "../Styles/Navbar.css";
import ShinyText from "../Design/ShinyText";

export default function Navbar() {
  const navItems = ["Services", "About", "Projects", "Contact"];
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${show ? "navbar-show" : "navbar-hide"}`}>
      
      {/* Logo */}
      <div
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setTimeout(() => window.location.reload(), 600);
        }}
        className="navbar-logo"
      >
        <span className="navbar-logo-dot-base"></span>
        <span className="navbar-logo-dot-hover"></span>
      </div>

      {/* Nav Items */}
      <ul className="navbar-items">
        {navItems.map((item) => (
          <li key={item} className="group navbar-item">

            {/* Link is the ONLY clickable layer */}
            <Link
              to={item.toLowerCase()}
              smooth={true}
              duration={2000}
              offset={0}
              className="block cursor-pointer pointer-events-auto"
            >
              {/* default text */}
              <div className="pointer-events-none navbar-item-text-default">
                <ShinyText text={item} disabled={false} speed={1.3} />
              </div>

              {/* hover text */}
              <div className="pointer-events-none navbar-item-text-hover">
                <ShinyText
                  text={item}
                  disabled={false}
                  speed={0.7}
                  className="transition-all group-hover:brightness-200"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
