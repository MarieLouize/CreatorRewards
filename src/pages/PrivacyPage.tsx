import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/props/BackButton';
import {
  privacyMeta,
  privacyIntro,
  privacySections,
} from '../data/privacyData';
import type { PrivacySubsection, PrivacyLink } from '../data/privacyData';

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
          padding: '70px 24px 30px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <BackButton label="Back" useHistory />

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px, 5vw, 40px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--cr-pink)',
            textTransform: 'uppercase',
            marginBottom: '16px',
            animation: 'popBounce 0.6s cubic-bezier(0.16,1,0.3,1) both',
          }}
        >
          Privacy Policy
        </h1>

        <div
          className="card"
          style={{
            padding: 'clamp(16px, 3vw, 32px)',
            animation:
              'slideUpSmooth 0.6s cubic-bezier(0.16,1,0.3,1) both 80ms',
          }}
        >
          {/* Intro paragraphs */}
          <div style={{ marginBottom: '24px' }}>
            {privacyIntro.map((paragraph, i) => (
              <p
                key={i}
                style={{
                  fontSize: 'clamp(12px, 1.8vw, 14px)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: i < privacyIntro.length - 1 ? '12px' : 0,
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Grid: 2-col on desktop, 1-col on mobile */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(16px, 2vw, 24px) clamp(20px, 3vw, 32px)',
            }}
          >
            {privacySections.map((section) => (
              <Section
                key={section.id}
                title={section.title}
                content={section.content}
                list={section.list}
                subsections={section.subsections}
                links={section.links}
              />
            ))}
          </div>

          <p
            style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
              marginTop: '20px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            Last updated: {privacyMeta.effectiveDate}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Section({
  title,
  content,
  list,
  subsections,
  links,
}: {
  title?: string;
  content?: string[];
  list?: string[];
  subsections?: PrivacySubsection[];
  links?: PrivacyLink[];
}) {
  return (
    <div>
      {title && (
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(12px, 2vw, 15px)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--cr-dark)',
            marginBottom: '6px',
            lineHeight: 1.3,
          }}
        >
          {title}
        </h2>
      )}

      {content?.map((paragraph, i) => (
        <p
          key={i}
          style={{
            fontSize: 'clamp(12px, 1.8vw, 14px)',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            marginBottom: '6px',
          }}
        >
          {paragraph}
        </p>
      ))}

      {list && (
        <ul
          style={{
            listStyleType: 'disc',
            paddingLeft: '18px',
            margin: '4px 0 8px',
          }}
        >
          {list.map((item, i) => (
            <li
              key={i}
              style={{
                fontSize: 'clamp(12px, 1.8vw, 14px)',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
                marginBottom: '4px',
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {subsections?.map((sub, i) => (
        <div key={i} style={{ marginTop: '10px' }}>
          {sub.title && (
            <h3
              style={{
                fontSize: 'clamp(11px, 1.6vw, 13px)',
                fontWeight: 700,
                color: 'var(--cr-dark)',
                marginBottom: '4px',
                lineHeight: 1.3,
              }}
            >
              {sub.title}
            </h3>
          )}

          {sub.content?.map((paragraph, j) => (
            <p
              key={j}
              style={{
                fontSize: 'clamp(12px, 1.8vw, 14px)',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
                marginBottom: '6px',
              }}
            >
              {paragraph}
            </p>
          ))}

          {sub.list && (
            <ul
              style={{
                listStyleType: 'disc',
                paddingLeft: '18px',
                margin: '4px 0 8px',
              }}
            >
              {sub.list.map((item, j) => (
                <li
                  key={j}
                  style={{
                    fontSize: 'clamp(12px, 1.8vw, 14px)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    marginBottom: '4px',
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {links && (
        <div style={{ marginTop: '4px' }}>
          {links.map((link, i) => (
            <p
              key={i}
              style={{
                fontSize: 'clamp(12px, 1.8vw, 14px)',
                lineHeight: 1.5,
                marginBottom: '4px',
              }}
            >
              <a
                href={link.href}
                style={{
                  color: 'var(--cr-pink)',
                  textDecoration: 'none',
                  fontWeight: 700,
                }}
              >
                {link.label}
              </a>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
