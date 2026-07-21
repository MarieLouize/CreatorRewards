import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  label?: string;
  useHistory?: boolean; // true = back to previous page, false = specific route
  to?: string;
}

export default function BackButton({
  label = "Back",
  useHistory = false,
  to = "/",
}: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    if (useHistory) {
      e.preventDefault();
      navigate(-1);
    }
  };

  return (
    <a
      href={useHistory ? "#" : to}
      onClick={handleClick}
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
        cursor: "pointer",
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
      {label}
    </a>
  );
}
