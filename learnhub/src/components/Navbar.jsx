import { NavLink, Link } from "react-router-dom";
import { BookOpen, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">
          <BookOpen size={22} />
        </span>
        LearnHub<span className="brand-dot">.</span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/courses">Courses</NavLink>
        <NavLink to="/dashboard">
          <LayoutDashboard size={16} />
          Dashboard
        </NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      <Link to="/courses" className="nav-cta">
        Start Learning ↗
      </Link>
    </header>
  );
}