import type { WaitlistFormData } from '../../types/waitlist';

interface Props {
  data: WaitlistFormData;
  onChange: (field: keyof WaitlistFormData, value: unknown) => void;
  errors: Partial<Record<keyof WaitlistFormData, string>>;
}

export default function Step1Personal({ data, onChange, errors }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div className="form-field">
        <label className="form-label">Full Name *</label>
        <input className={`form-input${errors.full_name ? ' error' : ''}`}
          type="text" placeholder="Your full name"
          value={data.full_name || ''} onChange={e => onChange('full_name', e.target.value)} />
        {errors.full_name && <span className="form-error">{errors.full_name}</span>}
      </div>

      <div className="form-field">
        <label className="form-label">Email Address *</label>
        <input className={`form-input${errors.email ? ' error' : ''}`}
          type="email" placeholder="your@email.com"
          value={data.email || ''} onChange={e => onChange('email', e.target.value)} />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-field">
        <label className="form-label">Phone Number</label>
        <input className="form-input" type="tel" placeholder="+234 800 000 0000"
          value={data.phone || ''} onChange={e => onChange('phone', e.target.value)} />
      </div>

      <div className="form-field">
        <label className="form-label">Gender</label>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', paddingTop: '8px' }}>
          {[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'prefer_not_to_say', label: 'Prefer not to say' },
          ].map(opt => (
            <label key={opt.value} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              cursor: 'pointer', fontSize: '15px', color: 'var(--cr-dark)',
              fontWeight: 500
            }}>
              <input type="radio" name="gender" value={opt.value}
                checked={data.gender === opt.value}
                onChange={() => onChange('gender', opt.value)}
                style={{ accentColor: 'var(--cr-pink)', width: '18px', height: '18px' }} />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">City</label>
        <input className="form-input" type="text" placeholder="e.g. Lagos, Abuja"
          value={data.location_city || ''} onChange={e => onChange('location_city', e.target.value)} />
      </div>
    </div>
  );
}
