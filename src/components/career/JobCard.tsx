import { useState } from "react";
import {
  MapPin,
  Clock,
  Briefcase,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import type { JobPosting } from "./types";

interface JobCardProps {
  job: JobPosting;
  index: number;
  onApply: (job: JobPosting) => void;
}

export default function JobCard({ job, index, onApply }: JobCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="card"
      style={{
        padding: "24px",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
        animation: `slideUpSmooth 0.5s cubic-bezier(0.16,1,0.3,1) both ${200 + index * 60}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translate(-2px, -2px)";
        e.currentTarget.style.boxShadow = "10px 10px 0px var(--cr-pink)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translate(0, 0)";
        e.currentTarget.style.boxShadow = "8px 8px 0px var(--cr-dark)";
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Card Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <MetaTag
                icon={<Briefcase size={13} strokeWidth={2} />}
                text={job.department}
                color="var(--cr-pink)"
              />
              <MetaTag
                icon={<MapPin size={13} strokeWidth={2} />}
                text={job.location}
              />
              <MetaTag
                icon={<Clock size={13} strokeWidth={2} />}
                text={job.type}
              />
              <MetaTag
                icon={<GraduationCap size={13} strokeWidth={2} />}
                text={job.experienceLevel}
              />
            </div>
          </div>

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
                onApply(job);
              }}
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* Expand Chevron */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ChevronRight
            size={20}
            strokeWidth={2.5}
            style={{
              color: "var(--cr-pink)",
              transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
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
              onApply(job);
            }}
          >
            Apply for this Role →
          </button>
        </div>
      )}
    </div>
  );
}

function MetaTag({
  icon,
  text,
  color,
}: {
  icon: React.ReactNode;
  text: string;
  color?: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "12px",
        color: color || "var(--text-secondary)",
        fontWeight: color ? 700 : 600,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
    >
      {icon}
      {text}
    </span>
  );
}
