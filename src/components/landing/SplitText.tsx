
interface SplitTextProps {
  text: string;
  active: boolean;
  delay?: number;
  charDelay?: number;
}

export default function SplitText({ text, active, delay = 0, charDelay = 0.03 }: SplitTextProps) {
  const words = text.split(' ');

  return (
    <span className="split-text-wrapper">
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ whiteSpace: 'nowrap', display: 'inline-block', marginRight: '0.25em' }}>
          {word.split('').map((char, charIndex) => {
            // Calculate total index for global stagger
            const totalIndex = words.slice(0, wordIndex).join('').length + charIndex;
            return (
              <span key={charIndex} className="char-reveal-container">
                <span 
                  className={`char-item ${active ? 'animate' : ''}`}
                  style={{ 
                    animationDelay: `${delay + totalIndex * charDelay}s` 
                  }}
                >
                  {char}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
