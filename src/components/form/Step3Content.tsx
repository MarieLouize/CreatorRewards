import type { WaitlistFormData } from '../../types/waitlist';

interface Props {
  data: WaitlistFormData;
  onChange: (field: keyof WaitlistFormData, value: unknown) => void;
  errors: Partial<Record<keyof WaitlistFormData, string>>;
}

export default function Step3Content({ data, onChange }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div className="form-field">
        <label className="form-label">What kind of content do you love creating? *</label>
        <textarea
          className="form-input"
          placeholder="e.g. Grwm, travel vlogs, tech reviews, etc."
          rows={4}
          value={data.preferred_content || ''}
          onChange={e => onChange('preferred_content', e.target.value)}
        />
        <p className="form-helper">This helps us match you with the right brands.</p>
      </div>

      <div className="form-field">
        <label className="form-label">Is there any content/brands you wouldn't promote? *</label>
        <textarea
          className="form-input"
          placeholder="e.g. Betting, alcohol, certain political views, etc."
          rows={4}
          value={data.avoid_content || ''}
          onChange={e => onChange('avoid_content', e.target.value)}
        />
        <p className="form-helper">We respect your boundaries and values.</p>
      </div>
    </div>
  );
}
