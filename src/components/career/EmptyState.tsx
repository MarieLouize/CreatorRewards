import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

export default function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "80px 24px",
        color: "var(--text-secondary)",
      }}
    >
      <Briefcase
        size={48}
        strokeWidth={1.5}
        style={{ color: "var(--border)", marginBottom: "16px" }}
      />
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "20px",
          fontWeight: 700,
          marginBottom: "8px",
          color: "var(--cr-dark)",
        }}
      >
        No open positions
      </h3>
      <p style={{ fontSize: "14px", marginBottom: "24px" }}>
        {hasFilters
          ? "No roles matching your filters right now — but we're always growing."
          : "Check back soon — we're always growing."}
      </p>
      <Link
        to="/join"
        className="persistent-cta"
        style={{
          position: "relative",
          bottom: "auto",
          right: "auto",
          zIndex: "auto",
          fontSize: "14px",
          padding: "12px 28px",
          textDecoration: "none",
          display: "inline-flex",
        }}
      >
        Join the Waitlist Instead →
      </Link>
    </div>
  );
}
