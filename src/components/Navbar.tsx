import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ activeSlide = 0 }: { activeSlide?: number }) {
  const navigate = useNavigate();

  // Slides 2 and 3 (index 1 and 2) have pink backgrounds
  const isPinkBg = activeSlide === 1 || activeSlide === 2;

  return (
    <nav
      className={`navbar-container ${isPinkBg ? "pink-bg" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 150,
        padding: "0 16px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "transparent",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        <span
          className="stylized-name"
          style={{
            fontSize: "clamp(12px, 3.5vw, 20px)",
            padding: "3px 8px",
          }}
        >
          CreatorsRewards
        </span>
      </Link>

      {/* Join Waitlist Button */}
      <button
        className="btn-ghost nav-btn"
        style={{
          padding: "8px 14px",
          fontSize: "clamp(11px, 3vw, 14px)",
          borderRadius: "100px",
          borderColor: isPinkBg ? "#fff" : "var(--cr-pink)",
          color: isPinkBg ? "#fff" : "var(--cr-pink)",
          borderWidth: "2px",
          whiteSpace: "nowrap",
        }}
        onClick={() => navigate("/join")}
      >
        Join
      </button>
    </nav>
  );
}
