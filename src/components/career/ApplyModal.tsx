import { useState } from "react";
import { X, Send, CheckCircle, Briefcase, MapPin } from "lucide-react";
import { toast } from "sonner";
import type { JobPosting } from "./types";

interface ApplicationForm {
  fullName: string;
  email: string;
  portfolio: string;
  message: string;
}

interface ApplyModalProps {
  job: JobPosting;
  onClose: () => void;
}

export default function ApplyModal({ job, onClose }: ApplyModalProps) {
  const [form, setForm] = useState<ApplicationForm>({
    fullName: "",
    email: "",
    portfolio: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullName.trim() || !form.email.trim()) {
      toast.error("Please fill in your name and email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubmitted(true);
    toast.success(`Application submitted for ${job.title}!`);
  };

  const updateField = (field: keyof ApplicationForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(28, 25, 23, 0.6)",
          backdropFilter: "blur(8px)",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "520px",
          maxHeight: "90vh",
          overflow: "auto",
          background: "var(--cr-blush)",
          border: "3px solid var(--cr-pink)",
          borderRadius: "24px",
          padding: "36px",
          boxShadow: "8px 8px 0px var(--cr-dark)",
          animation: "popBounce 0.5s cubic-bezier(0.16,1,0.3,1) both",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            color: "var(--cr-dark)",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "8px",
            transition: "color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--cr-pink)";
            e.currentTarget.style.background = "rgba(251, 113, 133, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--cr-dark)";
            e.currentTarget.style.background = "none";
          }}
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        {submitted ? (
          <SuccessView jobTitle={job.title} onClose={onClose} />
        ) : (
          <FormView
            job={job}
            form={form}
            submitting={submitting}
            onUpdate={updateField}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}

function SuccessView({
  jobTitle,
  onClose,
}: {
  jobTitle: string;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px 0",
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
          fontSize: "24px",
          fontWeight: 700,
          color: "var(--cr-dark)",
          marginBottom: "12px",
          textTransform: "uppercase",
        }}
      >
        Application Sent!
      </h3>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "15px",
          lineHeight: 1.6,
          marginBottom: "28px",
        }}
      >
        Thanks for applying to{" "}
        <strong style={{ color: "var(--cr-pink)" }}>{jobTitle}</strong>. We'll
        review your application and get back to you within 5 business days.
      </p>
      <button
        className="persistent-cta"
        style={{
          position: "relative",
          bottom: "auto",
          right: "auto",
          zIndex: "auto",
          fontSize: "14px",
          padding: "12px 28px",
        }}
        onClick={onClose}
      >
        Back to Careers
      </button>
    </div>
  );
}

function FormView({
  job,
  form,
  submitting,
  onUpdate,
  onSubmit,
}: {
  job: JobPosting;
  form: ApplicationForm;
  submitting: boolean;
  onUpdate: (field: keyof ApplicationForm, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <>
      <div style={{ marginBottom: "28px" }}>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--cr-pink)",
          }}
        >
          Apply for
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "24px",
            fontWeight: 700,
            color: "var(--cr-dark)",
            marginTop: "4px",
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
          }}
        >
          {job.title}
        </h2>
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "12px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "var(--text-secondary)",
              fontWeight: 600,
            }}
          >
            <Briefcase size={14} strokeWidth={2} />
            {job.department}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "var(--text-muted)",
              fontWeight: 600,
            }}
          >
            <MapPin size={14} strokeWidth={2} />
            {job.location}
          </span>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <FormField
          label="Full Name *"
          type="text"
          value={form.fullName}
          onChange={(v) => onUpdate("fullName", v)}
          placeholder="John Doe"
        />
        <FormField
          label="Email Address *"
          type="email"
          value={form.email}
          onChange={(v) => onUpdate("email", v)}
          placeholder="john@example.com"
        />
        <FormField
          label="Portfolio / CV Link"
          type="url"
          value={form.portfolio}
          onChange={(v) => onUpdate("portfolio", v)}
          placeholder="https://yourportfolio.com"
        />
        <FormField
          label="Why You? (Optional)"
          type="textarea"
          value={form.message}
          onChange={(v) => onUpdate("message", v)}
          placeholder="Tell us why you're excited about this role..."
          rows={4}
        />

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
              Submitting...
            </span>
          ) : (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              Submit Application
              <Send size={15} strokeWidth={2.5} />
            </span>
          )}
        </button>
      </form>
    </>
  );
}

function FormField({
  label,
  type,
  value,
  onChange,
  placeholder,
  rows,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  rows?: number;
}) {
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    background: "var(--bg-primary, #0a0a0a)",
    border: "1px solid var(--border, #222)",
    borderRadius: "12px",
    color: "var(--text-primary)",
    fontSize: "15px",
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
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
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows || 4}
          className="form-input"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="form-input"
        />
      )}
    </div>
  );
}
