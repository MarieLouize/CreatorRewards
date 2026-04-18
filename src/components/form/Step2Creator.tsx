import { Camera, Music2, PlayCircle, AtSign, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { WaitlistFormData } from '../../types/waitlist';

interface Props {
  data: WaitlistFormData;
  onChange: (field: keyof WaitlistFormData, value: unknown) => void;
  errors: Partial<Record<keyof WaitlistFormData, string>>;
}

const PLATFORMS: { value: string; label: string; Icon: LucideIcon; color: string }[] = [
  { value: 'instagram', label: 'Instagram', Icon: Camera,     color: '#E1306C' },
  { value: 'tiktok',    label: 'TikTok',    Icon: Music2,     color: '#69C9D0' },
  { value: 'youtube',   label: 'YouTube',   Icon: PlayCircle, color: '#FF0000' },
  { value: 'twitter',   label: 'Twitter/X', Icon: AtSign,     color: '#CCCCCC' },
  { value: 'facebook',  label: 'Facebook',  Icon: Users,      color: '#1877F2' },
];

export default function Step2Creator({ data, onChange, errors }: Props) {
  const charCount = (data.bio || '').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Primary platform */}
      <div className="form-field">
        <label className="form-label">Primary Platform *</label>
        {errors.primary_platform && <span className="form-error">{errors.primary_platform}</span>}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingTop: '12px' }}>
          {PLATFORMS.map(({ value, label, Icon, color }) => {
            const active = data.primary_platform === value;
            return (
              <button key={value} type="button"
                onClick={() => onChange('primary_platform', value)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                  padding: '16px 20px', borderRadius: '16px', cursor: 'pointer',
                  border: `2px solid ${active ? 'var(--cr-pink)' : 'var(--cr-blush)'}`,
                  background: 'white',
                  transition: 'all 0.2s', minWidth: '88px',
                  boxShadow: active ? '4px 4px 0px var(--cr-dark)' : 'none',
                  transform: active ? 'translateY(-2px)' : 'none'
                }}>
                <Icon size={24} color={active ? 'var(--cr-pink)' : color} strokeWidth={2} />
                <span style={{ fontSize: '12px', fontWeight: 700, color: active ? 'var(--cr-pink)' : 'var(--cr-dark)', opacity: active ? 1 : 0.6 }}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Handles */}
      <div>
        <label className="form-label" style={{ marginBottom: '16px', display: 'block' }}>Social Handles</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { field: 'instagram_handle', label: 'Instagram', placeholder: '@yourhandle' },
            { field: 'tiktok_handle', label: 'TikTok', placeholder: '@yourhandle' },
            { field: 'youtube_handle', label: 'YouTube', placeholder: 'Channel name or URL' },
            { field: 'twitter_handle', label: 'Twitter / X', placeholder: '@yourhandle' },
            { field: 'facebook_handle', label: 'Facebook', placeholder: 'Page name' },
          ].map(({ field, label, placeholder }) => (
            <div key={field} className="form-field">
              <label className="form-label" style={{ fontSize: '11px' }}>{label}</label>
              <input
                className={`form-input${errors[field as keyof WaitlistFormData] ? ' error' : ''}`}
                type="text" placeholder={placeholder}
                value={(data[field as keyof WaitlistFormData] as string) || ''}
                onChange={e => onChange(field as keyof WaitlistFormData, e.target.value)} />
              {errors[field as keyof WaitlistFormData] && (
                <span className="form-error">{errors[field as keyof WaitlistFormData]}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bio */}
      <div className="form-field">
        <label className="form-label">Creator Bio</label>
        <textarea
          className="form-input"
          placeholder="Tell brands a little about you and your content…"
          maxLength={280}
          rows={4}
          value={data.bio || ''}
          onChange={e => onChange('bio', e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
          <span className="form-helper" style={{ color: charCount > 250 ? 'var(--accent-coral)' : 'var(--text-muted)' }}>
            {charCount}/280
          </span>
        </div>
      </div>
    </div>
  );
}
