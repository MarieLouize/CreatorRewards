

export default function DotNav({ active, total, onChange }: { active: number, total: number, onChange: (idx: number) => void }) {
  return (
    <div className="dot-nav">
      {[...Array(total)].map((_, i) => (
        <button
          key={i}
          className={`dot ${active === i ? 'active' : ''}`}
          onClick={() => onChange(i)}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
}
