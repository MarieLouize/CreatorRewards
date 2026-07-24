import { CheckCircle } from "lucide-react";

export default function ContactSuccess() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px 20px",
        animation: "slideUpSmooth 0.4s ease both",
      }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "var(--cr-yellow)",
          border: "3px solid var(--cr-green)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
        }}
      >
        <CheckCircle size={32} strokeWidth={2} color="var(--cr-green)" />
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "22px",
          fontWeight: 700,
          color: "var(--cr-dark)",
          marginBottom: "12px",
          textTransform: "uppercase",
        }}
      >
        Message Sent!
      </h3>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "15px",
          lineHeight: 1.6,
        }}
      >
        Thanks for reaching out. We'll get back to you within 24 hours.
      </p>
    </div>
  );
}
