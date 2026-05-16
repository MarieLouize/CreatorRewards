import type { WaitlistFormData } from '../../types/waitlist';

interface Props {
  data: WaitlistFormData;
  onChange: (field: keyof WaitlistFormData, value: unknown) => void;
  errors: Partial<Record<keyof WaitlistFormData, string>>;
}

const NICHES = ['Lifestyle', 'comedy', 'tech', 'Fashion & Style', 'Food & Drinks', 'travel', 'Beauty & Care', 'gaming', 'Fitness & Sports', 'Business & Finance', 'education', 'betting', 'parenting', 'Dance & Music', 'Health & Wellness', 'entertainment', 'Home & Garden'];
const FORMATS = [
  { value: 'short_video', label: 'Short Video' },
  { value: 'long_video', label: 'Long Video' },
  { value: 'photo', label: 'Photo Posts' },
  { value: 'reels', label: 'Reels' },
  { value: 'stories', label: 'Stories' },
  { value: 'live', label: 'Live Streams' },
  { value: 'threads', label: 'Threads' },
];

export default function Step3Content({ data, onChange, errors }: Props) {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="form-field">
        <label className="form-label">What type of content creator are you? *</label>
        <p className="form-helper">Choose the role that best describes your content production style.</p>
        {errors.creator_type && <span className="form-error">{errors.creator_type}</span>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '4px' }}>
          {[
            { value: 'video_editor', label: 'Video Editor / Clipper', desc: 'I focus on editing, curation, and high-engagement clipping.' },
            { value: 'ugc_creator', label: 'UGC Creator', desc: 'I focus on original content, filming, and authentic brand storytelling.' },
          ].map(opt => (
            <label key={opt.value} style={{
              display: 'flex', gap: '12px', padding: '16px', borderRadius: '12px',
              border: `2px solid ${data.creator_type === opt.value ? 'var(--cr-pink)' : 'rgba(28, 25, 23, 0.15)'}`,
              background: data.creator_type === opt.value ? 'rgba(251, 113, 133, 0.05)' : 'white',
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: data.creator_type === opt.value ? '4px 4px 0px var(--cr-dark)' : 'none',
              transform: data.creator_type === opt.value ? 'translateY(-2px)' : 'none'
            }}>
              <input type="radio" name="creator_type" value={opt.value}
                checked={data.creator_type === opt.value}
                onChange={() => onChange('creator_type', opt.value)}
                style={{ accentColor: 'var(--cr-pink)', marginTop: '4px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontWeight: 700, color: 'var(--cr-dark)', fontSize: '15px' }}>{opt.label}</span>
                <span style={{ fontSize: '13px', color: 'var(--cr-dark)', opacity: 0.6 }}>{opt.desc}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Content Niches</label>
        <p className="form-helper">What categories do you create content in? Pick up to 5.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '4px' }}>
          {NICHES.map(n => (
            <button key={n} type="button"
              className={`chip${niches.includes(n) ? ' selected' : ''}`}
              onClick={() => toggleNiche(n)}
              style={{ textTransform: 'capitalize' }}>
              {n}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
          <span className="form-helper">{niches.length}/5 selected</span>
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Total Follower Range *</label>
        <p className="form-helper">Across your primary platforms.</p>
        {errors.follower_range && <span className="form-error">{errors.follower_range}</span>}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '4px' }}>
          {['1k - 10k', '10k - 50k', '50k - 500k', '500k+'].map(range => (
            <button key={range} type="button"
              onClick={() => onChange('follower_range', range)}
              style={{
                padding: '12px 20px', borderRadius: '12px', cursor: 'pointer',
                border: `2px solid ${data.follower_range === range ? 'var(--cr-pink)' : 'rgba(28, 25, 23, 0.15)'}`,
                background: 'white',
                color: data.follower_range === range ? 'var(--cr-pink)' : 'var(--cr-dark)',
                fontWeight: 700, fontSize: '14px', transition: 'all 0.2s',
                boxShadow: data.follower_range === range ? '4px 4px 0px var(--cr-dark)' : 'none',
                transform: data.follower_range === range ? 'translateY(-2px)' : 'none',
                opacity: data.follower_range === range ? 1 : 0.8
              }}>
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Content Formats</label>
        <p className="form-helper">What type of content do you post most often?</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '4px' }}>
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
