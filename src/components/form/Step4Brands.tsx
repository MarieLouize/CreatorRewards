import type { WaitlistFormData } from '../../types/waitlist';

interface Props {
  data: WaitlistFormData;
  onChange: (field: keyof WaitlistFormData, value: unknown) => void;
  errors?: Partial<Record<keyof WaitlistFormData, string>>;
}

const DEAL_TYPES = [
  { value: 'ugc', label: 'UGC Content' },
  { value: 'sponsored_post', label: 'Sponsored Post' },
  { value: 'ambassador', label: 'Brand Ambassador' },
  { value: 'affiliate', label: 'Affiliate' },
];

const REFERRAL_SOURCES = [
  { value: 'instagram_ad', label: 'Instagram Ad' },
  { value: 'friend', label: 'From a friend' },
  { value: 'twitter', label: 'Twitter / X' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'google', label: 'Google Search' },
  { value: 'other', label: 'Other' },
];

export default function Step4Brands({ data, onChange }: Props) {
  const dealTypes = (data.preferred_deal_type as string[]) || [];
  const workedWithBrands = data.has_worked_with_brands;

  const toggleDeal = (d: string) => {
    if (dealTypes.includes(d)) {
      onChange('preferred_deal_type', dealTypes.filter(x => x !== d));
    } else {
      onChange('preferred_deal_type', [...dealTypes, d]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Has worked with brands */}
      <div className="form-field">
        <label className="form-label">Have you worked with brands before?</label>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingTop: '12px' }}>
          {[
            { value: 'no', label: 'No', boolVal: false },
            { value: 'yes', label: 'Yes', boolVal: true },
          ].map(opt => (
            <button key={opt.value} type="button"
              onClick={() => onChange('has_worked_with_brands', opt.boolVal)}
              style={{
                padding: '12px 24px', borderRadius: '12px', cursor: 'pointer',
                border: `2px solid ${workedWithBrands === opt.boolVal ? 'var(--cr-pink)' : 'var(--cr-blush)'}`,
                background: 'white',
                color: workedWithBrands === opt.boolVal ? 'var(--cr-pink)' : 'var(--cr-dark)',
                fontWeight: 700, fontSize: '14px', transition: 'all 0.2s',
                boxShadow: workedWithBrands === opt.boolVal ? '4px 4px 0px var(--cr-dark)' : 'none',
                transform: workedWithBrands === opt.boolVal ? 'translateY(-2px)' : 'none',
                opacity: workedWithBrands === opt.boolVal ? 1 : 0.6
              }}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brand count — conditional */}
      {workedWithBrands === true && (
        <div className="form-field">
          <label className="form-label">How many brands?</label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '10px' }}>
            {(['1-3', '4-10', '10+'] as const).map(opt => (
              <button key={opt} type="button"
                onClick={() => onChange('brand_count_estimate', opt)}
                style={{
                  padding: '10px 20px', borderRadius: '12px', cursor: 'pointer',
                  border: `2px solid ${data.brand_count_estimate === opt ? 'var(--cr-pink)' : 'var(--cr-blush)'}`,
                  background: 'white',
                  color: data.brand_count_estimate === opt ? 'var(--cr-pink)' : 'var(--cr-dark)',
                  fontWeight: 700, fontSize: '14px', transition: 'all 0.2s',
                  boxShadow: data.brand_count_estimate === opt ? '4px 4px 0px var(--cr-dark)' : 'none',
                  transform: data.brand_count_estimate === opt ? 'translateY(-2px)' : 'none',
                  opacity: data.brand_count_estimate === opt ? 1 : 0.6
                }}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preferred deal type */}
      <div className="form-field">
        <label className="form-label">Preferred Deal Types</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '12px' }}>
          {DEAL_TYPES.map(d => (
            <button key={d.value} type="button"
              className={`chip${dealTypes.includes(d.value) ? ' selected' : ''}`}
              onClick={() => toggleDeal(d.value)}>
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Referral source */}
      <div className="form-field">
        <label className="form-label">How did you hear about us?</label>
        <select className="form-input"
          value={data.referral_source || ''}
          onChange={e => onChange('referral_source', e.target.value)}>
          <option value="">Select an option</option>
          {REFERRAL_SOURCES.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
