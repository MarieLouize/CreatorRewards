import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Briefcase,
  ChevronRight,
  X,
  Send,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ─── TYPES ───────────────────────────────────────────────────
interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Contract" | "Internship";
  description: string;
  requirements: string[];
}

interface ApplicationForm {
  fullName: string;
  email: string;
  portfolio: string;
  message: string;
}

// ─── MOCK DATA ───────────────────────────────────────────────
const DEPARTMENTS = [
  "All",
  "Engineering",
  "Marketing",
  "Operations",
  "Design",
] as const;
type Department = (typeof DEPARTMENTS)[number];

const MOCK_JOBS: JobPosting[] = [
  {
    id: "eng-001",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Lagos, Nigeria (Hybrid)",
    type: "Full-time",
    description:
      "Lead the development of our creator-facing dashboard. You will architect React components, optimize performance, and mentor junior developers.",
    requirements: [
      "5+ years React/TypeScript",
      "Experience with Vite & modern tooling",
      "Passion for creator economy",
    ],
  },
  {
    id: "eng-002",
    title: "Backend Engineer (Node.js)",
    department: "Engineering",
    location: "Remote (Nigeria)",
    type: "Full-time",
    description:
      "Build scalable APIs and microservices powering our reward distribution engine. Work with Supabase, PostgreSQL, and serverless functions.",
    requirements: [
      "4+ years Node.js",
      "PostgreSQL & Redis experience",
      "AWS or GCP familiarity",
    ],
  },
  {
    id: "mkt-001",
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "Lagos, Nigeria",
    type: "Full-time",
    description:
      "Drive user acquisition for CreatorsRewards. Own paid social, influencer partnerships, and organic growth loops.",
    requirements: [
      "3+ years growth marketing",
      "Experience with Nigerian creator ecosystems",
      "Data-driven mindset",
    ],
  },
  {
    id: "mkt-002",
    title: "Content Strategist",
    department: "Marketing",
    location: "Remote",
    type: "Contract",
    description:
      "Develop content strategies that resonate with Nigerian creators. Manage blog, social, and email campaigns.",
    requirements: [
      "Portfolio of creator-facing content",
      "SEO knowledge",
      "Social media native",
    ],
  },
  {
    id: "ops-001",
    title: "Operations Associate",
    department: "Operations",
    location: "Lagos, Nigeria",
    type: "Full-time",
    description:
      "Support day-to-day operations including creator onboarding, payment reconciliation, and vendor management.",
    requirements: [
      "2+ years ops experience",
      "Extreme attention to detail",
      "Fluent in English & Pidgin",
    ],
  },
  {
    id: "des-001",
    title: "Product Designer",
    department: "Design",
    location: "Remote (Nigeria)",
    type: "Full-time",
    description:
      "Own the design system for our HUD-inspired interface. Create Figma components that engineers love to build.",
    requirements: [
      "3+ years product design",
      "Strong Figma skills",
      "Interest in cyberpunk/brutalist aesthetics",
    ],
  },
  {
    id: "eng-003",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Manage CI/CD pipelines, infrastructure as code, and observability for our growing platform.",
    requirements: [
      "Terraform, Docker, Kubernetes",
      "GitHub Actions expertise",
      "On-call rotation ready",
    ],
  },
];

// ─── APPLY MODAL COMPONENT ───────────────────────────────────
function ApplyModal({
  job,
  onClose,
}: {
  job: JobPosting;
  onClose: () => void;
}) {
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
      {/* Backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(28, 25, 23, 0.6)",
          backdropFilter: "blur(8px)",
        }}
      />

      {/* Modal Card */}
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
        {/* Close Button */}
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
              <strong style={{ color: "var(--cr-pink)" }}>{job.title}</strong>.
              We'll review your application and get back to you within 5
              business days.
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
        ) : (
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
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
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
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder="John Doe"
                  className="form-input"
                />
              </div>

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
                  Email Address *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="john@example.com"
                  className="form-input"
                />
              </div>

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
                  Portfolio / CV Link
                </label>
                <input
                  type="url"
                  value={form.portfolio}
                  onChange={(e) => updateField("portfolio", e.target.value)}
                  placeholder="https://yourportfolio.com"
                  className="form-input"
                />
              </div>

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
                  Why You? (Optional)
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder="Tell us why you're excited about this role..."
                  rows={4}
                  className="form-input"
                />
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
        )}
      </div>
    </div>
  );
}

// ─── MAIN CAREER PAGE ────────────────────────────────────────
export default function CareerPage() {
  const [activeDept, setActiveDept] = useState<Department>("All");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [applyingFor, setApplyingFor] = useState<JobPosting | null>(null);

  const filteredJobs = useMemo(() => {
    if (activeDept === "All") return MOCK_JOBS;
    return MOCK_JOBS.filter((job) => job.department === activeDept);
  }, [activeDept]);

  const toggleExpand = (id: string) => {
    setExpandedJob((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className="bg-matcha-grad"
      style={{
        minHeight: "100vh",
        color: "var(--cr-dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Navbar */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Navbar />
      </div>

      {/* ── Main Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "960px",
          margin: "0 auto",
          padding: "100px 24px 60px",
        }}
      >
        {/* Back Link */}
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "40px",
            color: "var(--text-secondary)",
            fontSize: "14px",
            fontWeight: 600,
            transition: "color 0.2s, transform 0.2s",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--cr-pink)";
            e.currentTarget.style.transform = "translateX(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          Back to Home
        </Link>

        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
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
              maxWidth: "560px",
              lineHeight: 1.5,
              animation:
                "slideUpSmooth 0.6s cubic-bezier(0.16,1,0.3,1) both 80ms",
            }}
          >
            We're building the future of creator monetization in Nigeria. Come
            build with us.
          </p>
        </div>

        {/* Department Filter Tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "40px",
            animation:
              "slideUpSmooth 0.6s cubic-bezier(0.16,1,0.3,1) both 120ms",
          }}
        >
          {DEPARTMENTS.map((dept) => {
            const isActive = activeDept === dept;
            return (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                style={{
                  padding: "8px 20px",
                  borderRadius: "100px",
                  border: `2px solid ${isActive ? "var(--cr-pink)" : "var(--cr-dark)"}`,
                  background: isActive ? "var(--cr-pink)" : "var(--cr-white)",
                  color: isActive ? "#fff" : "var(--cr-dark)",
                  fontFamily: "var(--font-display)",
                  fontSize: "13px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  opacity: isActive ? 1 : 0.7,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "var(--cr-pink)";
                    e.currentTarget.style.color = "var(--cr-pink)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "var(--cr-dark)";
                    e.currentTarget.style.color = "var(--cr-dark)";
                  }
                }}
              >
                {dept}
                {dept !== "All" && (
                  <span
                    style={{
                      marginLeft: "8px",
                      opacity: 0.6,
                      fontSize: "11px",
                    }}
                  >
                    {MOCK_JOBS.filter((j) => j.department === dept).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Job Count */}
        <p
          style={{
            fontSize: "13px",
            color: "var(--text-secondary)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "24px",
          }}
        >
          {filteredJobs.length} open position
          {filteredJobs.length !== 1 ? "s" : ""}
        </p>

        {/* Job Cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            animation:
              "slideUpSmooth 0.6s cubic-bezier(0.16,1,0.3,1) both 160ms",
          }}
        >
          {filteredJobs.map((job, index) => {
            const isExpanded = expandedJob === job.id;
            return (
              <div
                key={job.id}
                className="card"
                style={{
                  padding: "24px",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "pointer",
                  animation: `slideUpSmooth 0.5s cubic-bezier(0.16,1,0.3,1) both ${200 + index * 60}ms`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translate(-2px, -2px)";
                  e.currentTarget.style.boxShadow =
                    "10px 10px 0px var(--cr-pink)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translate(0, 0)";
                  e.currentTarget.style.boxShadow =
                    "8px 8px 0px var(--cr-dark)";
                }}
                onClick={() => toggleExpand(job.id)}
              >
                {/* Card Header */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {/* Top Row: Title + Apply Button */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* Title Block */}
                    <div style={{ flex: "1 1 0", minWidth: "200px" }}>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(16px, 4vw, 20px)",
                          fontWeight: 700,
                          color: "var(--cr-dark)",
                          marginBottom: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "-0.01em",
                          lineHeight: 1.2,
                          wordBreak: "break-word",
                        }}
                      >
                        {job.title}
                      </h3>

                      {/* Meta Tags */}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "12px",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "12px",
                            color: "var(--cr-pink)",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          <Briefcase size={13} strokeWidth={2} />
                          {job.department}
                        </span>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                            fontWeight: 600,
                          }}
                        >
                          <MapPin size={13} strokeWidth={2} />
                          {job.location}
                        </span>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                            fontWeight: 600,
                          }}
                        >
                          <Clock size={13} strokeWidth={2} />
                          {job.type}
                        </span>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div style={{ flexShrink: 0, paddingTop: "2px" }}>
                      <button
                        className="persistent-cta"
                        style={{
                          position: "relative",
                          bottom: "auto",
                          right: "auto",
                          zIndex: "auto",
                          fontSize: "12px",
                          padding: "8px 16px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          whiteSpace: "nowrap",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setApplyingFor(job);
                        }}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>

                  {/* Expand Chevron */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <ChevronRight
                      size={20}
                      strokeWidth={2.5}
                      style={{
                        color: "var(--cr-pink)",
                        transform: isExpanded
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div
                    style={{
                      marginTop: "20px",
                      paddingTop: "20px",
                      borderTop: "2px solid var(--cr-pink)",
                      animation: "slideUpSmooth 0.3s ease both",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "15px",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                        marginBottom: "20px",
                      }}
                    >
                      {job.description}
                    </p>

                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "12px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "var(--cr-pink)",
                        marginBottom: "12px",
                      }}
                    >
                      Requirements
                    </h4>
                    <ul
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        marginBottom: "24px",
                        paddingLeft: "0",
                        listStyle: "none",
                      }}
                    >
                      {job.requirements.map((req, i) => (
                        <li
                          key={i}
                          style={{
                            fontSize: "14px",
                            color: "var(--text-secondary)",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                          }}
                        >
                          <span
                            style={{
                              color: "var(--cr-pink)",
                              fontWeight: 700,
                              fontSize: "16px",
                              lineHeight: 1.4,
                              flexShrink: 0,
                            }}
                          >
                            ›
                          </span>
                          <span style={{ wordBreak: "break-word" }}>{req}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      className="persistent-cta"
                      style={{
                        position: "relative",
                        bottom: "auto",
                        right: "auto",
                        zIndex: "auto",
                        fontSize: "14px",
                        padding: "12px 28px",
                        width: "100%",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setApplyingFor(job);
                      }}
                    >
                      Apply for this Role →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
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
              No roles in {activeDept} right now — but we're always growing.
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
        )}
      </div>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Apply Modal ── */}
      {applyingFor && (
        <ApplyModal job={applyingFor} onClose={() => setApplyingFor(null)} />
      )}
    </div>
  );
}
