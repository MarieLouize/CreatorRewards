import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ activeSlide = 0 }: { activeSlide?: number }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Slides 2 and 3 (index 1 and 2) have pink backgrounds
  const isPinkBg = activeSlide === 1 || activeSlide === 2;

  // Hide Careers link when already on /careers
  const isCareersPage = location.pathname === "/careers";

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

      {/* Nav Links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          flexShrink: 0,
        }}
      >
        {/* Careers Link — hidden on /careers */}
        {!isCareersPage && (
          <Link
            to="/careers"
            style={{
              padding: "8px 12px",
              fontSize: "clamp(11px, 3vw, 14px)",
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: isPinkBg ? "#fff" : "var(--cr-pink)",
              textDecoration: "none",
              borderRadius: "100px",
              transition: "all 0.2s ease",
              opacity: 0.8,
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.background = isPinkBg
                ? "rgba(255,255,255,0.1)"
                : "rgba(251, 113, 133, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.8";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Careers
          </Link>
        )}

        {/* Join Waitlist Button — EXACTLY like main page */}
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
      </div>
    </nav>
  );
}
