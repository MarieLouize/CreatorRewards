import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/props/BackButton';

export default function PrivacyPage() {
  return (
    <div
      className="bg-matcha-grad"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: 'var(--cr-dark)',
        position: 'relative',
      }}
    >
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
      </div>

      <div
        style={{
          flex: 1,
          maxWidth: '1140px',
          width: '100%',
          margin: '0 auto',
          padding: '70px 24px 30px', // Reduced top/bottom padding
          position: 'relative',
          zIndex: 1,
        }}
      >
        <BackButton label="Back" useHistory />

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--cr-pink)',
            textTransform: 'uppercase',
            marginBottom: '16px', // Tightened margin
            animation: 'popBounce 0.6s cubic-bezier(0.16,1,0.3,1) both',
          }}
        >
          Privacy Policy
        </h1>

        <div
          className="card"
          style={{
            padding: 'clamp(20px, 3vw, 32px)',
            animation:
              'slideUpSmooth 0.6s cubic-bezier(0.16,1,0.3,1) both 80ms',
          }}
        >
          {/* Responsive 2-column grid for wide screens */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px 32px',
            }}
          >
            <Section title="1. Information We Collect">
              We collect information you provide directly to us, such as when
              you create an account, fill out a form, or communicate with us.
              This may include your name, email address, phone number, and any
              other information you choose to provide.
            </Section>

            <Section title="2. How We Use Your Information">
              We use the information we collect to operate, maintain, and
              improve our services; to process transactions; to communicate with
              you; and to comply with legal obligations.
            </Section>

            <Section title="3. Information Sharing">
              We do not sell, trade, or rent your personal information to third
              parties. We may share information with trusted service providers
              who assist us in operating our platform, subject to
              confidentiality agreements.
            </Section>

            <Section title="4. Data Security">
              We implement appropriate technical and organizational measures to
              protect your personal data against unauthorized access,
              alteration, disclosure, or destruction.
            </Section>

            <Section title="5. Your Rights">
              You have the right to access, correct, or delete your personal
              information. You may also object to or restrict certain processing
              of your data. Contact us to exercise these rights.
            </Section>

            <Section title="6. Cookies">
              We use cookies and similar technologies to enhance your
              experience, analyze usage, and deliver personalized content. You
              can control cookie settings through your browser.
            </Section>

            <Section title="7. Changes to This Policy">
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by posting the new policy on
              this page with an updated effective date.
            </Section>

            <Section title="8. Contact Us">
              If you have any questions about this Privacy Policy, please
              contact us at{' '}
              <a
                href="mailto:privacy@creatorsrewards.ng"
                style={{
                  color: 'var(--cr-pink)',
                  textDecoration: 'none',
                  fontWeight: 700,
                }}
              >
                privacy@creatorsrewards.ng
              </a>
              .
            </Section>
          </div>

          <p
            style={{
              fontSize: '12px',
              color: 'var(--text-muted)',
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            Last updated:{' '}
            {new Date().toLocaleDateString('en-NG', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '15px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--cr-dark)',
          marginBottom: '6px',
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
        }}
      >
        {children}
      </p>
    </div>
  );
}
