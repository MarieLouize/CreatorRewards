import type { WaitlistFormData } from '../../types/waitlist';

interface Props {
  data: WaitlistFormData;
  onChange: (field: keyof WaitlistFormData, value: unknown) => void;
  errors: Partial<Record<keyof WaitlistFormData, string>>;
}

const NICHES = ['lifestyle', 'comedy', 'tech', 'fashion', 'food', 'travel', 'beauty', 'gaming', 'sports', 'finance', 'parenting', 'music', 'fitness', 'entertainment'];
const FORMATS = [
  { value: 'short_video', label: 'Short Video' },
  { value: 'long_video', label: 'Long Video' },
  { value: 'photo', label: 'Photo Posts' },
  { value: 'reels', label: 'Reels' },
  { value: 'stories', label: 'Stories' },
  { value: 'live', label: 'Live Streams' },
];

export default function Step3Numbers({ data, onChange, errors }: Props) {
  const niches = (data.content_niches as string[]) || [];
  const formats = (data.content_formats as string[]) || [];

  const toggleNiche = (n: string) => {
    if (niches.includes(n)) {
      onChange('content_niches', niches.filter(x => x !== n));
    } else if (niches.length < 5) {
      onChange('content_niches', [...niches, n]);
    }
  };

  const toggleFormat = (f: string) => {
    if (formats.includes(f)) {
      onChange('content_formats', formats.filter(x => x !== f));
    } else {
      onChange('content_formats', [...formats, f]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div className="form-field">
        <label className="form-label">Followers on Primary Platform *</label>
        <input className={`form-input${errors.primary_follower_count ? ' error' : ''}`}
          type="number" placeholder="e.g. 15000" min={0}
          value={data.primary_follower_count || ''}
          onChange={e => onChange('primary_follower_count', parseInt(e.target.value) || undefined)} />
        {errors.primary_follower_count && <span className="form-error">{errors.primary_follower_count}</span>}
      </div>

      <div className="form-field">
        <label className="form-label">Total Followers (all platforms)</label>
        <input className="form-input" type="number" placeholder="Combined across all platforms" min={0}
          value={data.total_followers || ''}
          onChange={e => onChange('total_followers', parseInt(e.target.value) || undefined)} />
      </div>

      <div className="form-field">
        <label className="form-label">Avg Engagement Rate (%)</label>
        <input className="form-input" type="number" placeholder="e.g. 4.5" step="0.1" min={0} max={100}
          value={data.avg_engagement_rate || ''}
          onChange={e => onChange('avg_engagement_rate', parseFloat(e.target.value) || undefined)} />
        <span className="form-helper">Likes + comments ÷ followers × 100</span>
      </div>

      <div className="form-field">
        <label className="form-label">Content Posted Per Month</label>
        <select className="form-input"
          value={data.monthly_content_count || ''}
          onChange={e => onChange('monthly_content_count', parseInt(e.target.value) || undefined)}>
          <option value="">Select range</option>
          <option value="3">1–5 posts/month</option>
          <option value="10">6–15 posts/month</option>
          <option value="22">16–30 posts/month</option>
          <option value="35">30+ posts/month</option>
        </select>
      </div>

      <div className="form-field">
        <label className="form-label">Content Niches (pick up to 5)</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '12px' }}>
          {NICHES.map(n => (
            <button key={n} type="button"
              className={`chip${niches.includes(n) ? ' selected' : ''}`}
              onClick={() => toggleNiche(n)}
              style={{ textTransform: 'capitalize' }}>
              {n}
            </button>
          ))}
        </div>
        <span className="form-helper" style={{ marginTop: '8px' }}>{niches.length}/5 selected</span>
      </div>

      <div className="form-field">
        <label className="form-label">Content Formats</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '12px' }}>
          {FORMATS.map(f => (
            <button key={f.value} type="button"
              className={`chip${formats.includes(f.value) ? ' selected' : ''}`}
              onClick={() => toggleFormat(f.value)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
