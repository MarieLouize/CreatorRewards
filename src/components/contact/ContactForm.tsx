import { useState } from "react";
import { Send, User, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import ContactSuccess from "./ContactSuccess";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Message sent! We will get back to you soon.");

    const subject = encodeURIComponent(`Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
    );
    window.open(
      `mailto:hello@creatorsrewards.ng?subject=${subject}&body=${body}`,
      "_blank",
    );
  };

  const updateField = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) return <ContactSuccess />;

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      {/* Name */}
      <div>
        <label
          style={{
            display: "block",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--cr-dark)",
            marginBottom: "8px",
          }}
        >
          Name *
        </label>
        <div style={{ position: "relative" }}>
          <User
            size={16}
            strokeWidth={2}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Your name"
            className="form-input"
            style={{ paddingLeft: "40px" }}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          style={{
            display: "block",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--cr-dark)",
            marginBottom: "8px",
          }}
        >
          Email *
        </label>
        <div style={{ position: "relative" }}>
          <Mail
            size={16}
            strokeWidth={2}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
              pointerEvents: "none",
            }}
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="you@example.com"
            className="form-input"
            style={{ paddingLeft: "40px" }}
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          style={{
            display: "block",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--cr-dark)",
            marginBottom: "8px",
          }}
        >
          Message *
        </label>
        <div style={{ position: "relative" }}>
          <MessageSquare
            size={16}
            strokeWidth={2}
            style={{
              position: "absolute",
              left: "14px",
              top: "16px",
              color: "var(--text-muted)",
              pointerEvents: "none",
            }}
          />
          <textarea
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            placeholder="How can we help you?"
            rows={5}
            className="form-input"
            style={{ paddingLeft: "40px", paddingTop: "14px" }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="persistent-cta"
        style={{
          position: "relative",
          bottom: "auto",
          right: "auto",
          zIndex: "auto",
          fontSize: "14px",
          padding: "14px 28px",
          marginTop: "8px",
          width: "100%",
          justifyContent: "center",
          opacity: submitting ? 0.7 : 1,
          cursor: submitting ? "wait" : "pointer",
        }}
      >
        {submitting ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "16px",
                height: "16px",
                border: "2px solid transparent",
                borderTopColor: "currentColor",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
            Sending...
          </span>
        ) : (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            Send Message
            <Send size={15} strokeWidth={2.5} />
          </span>
        )}
      </button>
    </form>
  );
}
