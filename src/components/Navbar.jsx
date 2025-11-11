import { useEffect, useState } from "react";
import "../Styles/Navbar.css"; 

export default function Navbar() {
  const navItems = ["Services", "About", "Projects", "Contact"];
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 200) setShow(true);
      else setShow(false);
    };
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
          <li key={item} className="navbar-item">
            <span className="navbar-item-text-default">{item}</span>
            <span className="navbar-item-text-hover">{item}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
