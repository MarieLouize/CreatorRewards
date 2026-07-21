export default function ContactHeader() {
  return (
    <div style={{ marginBottom: "40px" }}>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(32px, 6vw, 48px)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "var(--cr-pink)",
          textTransform: "uppercase",
          marginBottom: "12px",
          animation: "popBounce 0.6s cubic-bezier(0.16,1,0.3,1) both",
        }}
      >
        Contact Us
      </h1>
      <p
        style={{
          color: "var(--cr-dark)",
          opacity: 0.8,
          fontSize: "18px",
          fontWeight: 600,
          animation: "slideUpSmooth 0.6s cubic-bezier(0.16,1,0.3,1) both 80ms",
        }}
      >
        Got questions? We'd love to hear from you.
      </p>
    </div>
  );
}
