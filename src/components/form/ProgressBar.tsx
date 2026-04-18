const STEP_NAMES = ['Personal Info', 'Creator Profile', 'Your Numbers', 'Brand Experience'];

interface Props {
  currentStep: number; // 1-4
}

export default function ProgressBar({ currentStep }: Props) {
  const pct = ((currentStep - 1) / 3) * 100;

  return (
    <div style={{ marginBottom: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--cr-pink)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Step {currentStep} of 4
        </span>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--cr-dark)', opacity: 0.6 }}>
          {STEP_NAMES[currentStep - 1]}
        </span>
      </div>
      <div style={{
        height: '6px', background: 'white', borderRadius: '100px', overflow: 'hidden',
        border: '2px solid var(--cr-blush)'
      }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: 'var(--cr-pink)',
          borderRadius: '100px',
          transition: 'width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }} />
      </div>
      {/* Step dots */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
        {[1, 2, 3, 4].map(s => (
          <div key={s} style={{
            width: '10px', height: '10px', borderRadius: '50%',
            background: s <= currentStep ? 'var(--cr-pink)' : 'var(--cr-blush)',
            transition: 'all 0.3s',
            transform: s === currentStep ? 'scale(1.3)' : 'scale(1)',
          }} />
        ))}
      </div>
    </div>
  );
}
