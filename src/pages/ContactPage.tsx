import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactHeader from "../components/contact/ContactHeader";
import ContactForm from "../components/contact/ContactForm";
import BackButton from "../components/props/BackButton";

export default function ContactPage() {
  return (
    <div
      className="bg-matcha-grad"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "var(--cr-dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Navbar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "100px 24px 60px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ width: "100%", maxWidth: "560px" }}>
          <BackButton label="Back" />
          <ContactHeader />

          <div
            className="card"
            style={{
              padding: "clamp(24px, 5vw, 40px)",
              animation: "popBounce 0.7s cubic-bezier(0.16,1,0.3,1) both 120ms",
            }}
          >
            <ContactForm />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
