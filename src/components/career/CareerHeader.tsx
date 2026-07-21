export default function CareerHeader() {
  return (
    <div style={{ marginBottom: "48px", textAlign: "center" }}>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(36px, 6vw, 56px)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "var(--cr-pink)",
          textTransform: "uppercase",
          marginBottom: "16px",
          animation: "popBounce 0.6s cubic-bezier(0.16,1,0.3,1) both",
          maxWidth: "500px",
          margin: "0 auto 16px",
        }}
      >
        Join the Mission
      </h1>
      <p
        style={{
          color: "var(--cr-dark)",
          opacity: 0.8,
          fontSize: "18px",
          fontWeight: 600,
          lineHeight: 1.5,
          animation: "slideUpSmooth 0.6s cubic-bezier(0.16,1,0.3,1) both 80ms",
          maxWidth: "650px",
          margin: "0 auto",
        }}
      >
        We're building the future of creator monetization in Nigeria. Come build
        with us.
      </p>
    </div>
  );
}
