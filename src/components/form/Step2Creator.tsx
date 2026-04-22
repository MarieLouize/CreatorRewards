import { Camera, Music2, PlayCircle, AtSign, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { WaitlistFormData } from '../../types/waitlist';

interface Props {
  data: WaitlistFormData;
  onChange: (field: keyof WaitlistFormData, value: unknown) => void;
  errors: Partial<Record<keyof WaitlistFormData, string>>;
}

const PLATFORMS: { value: string; label: string; Icon: LucideIcon; color: string; field: keyof WaitlistFormData }[] = [
  { value: 'instagram', label: 'Instagram', Icon: Camera,     color: '#E1306C', field: 'instagram_handle' },
  { value: 'tiktok',    label: 'TikTok',    Icon: Music2,     color: '#69C9D0', field: 'tiktok_handle' },
  { value: 'youtube',   label: 'YouTube',   Icon: PlayCircle, color: '#FF0000', field: 'youtube_handle' },
  { value: 'twitter',   label: 'Twitter/X', Icon: AtSign,     color: '#1DA1F2', field: 'twitter_handle' },
  { value: 'facebook',  label: 'Facebook',  Icon: Users,      color: '#1877F2', field: 'facebook_handle' },
];

export default function Step2Creator({ data, onChange, errors }: Props) {
  const togglePlatform = (platform: string) => {
    const current = data.selected_platforms || [];
    if (current.includes(platform)) {
      onChange('selected_platforms', current.filter(p => p !== platform));
    } else {
      onChange('selected_platforms', [...current, platform]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div className="form-field">
        <label className="form-label">Which platforms are you on? *</label>
        {errors.selected_platforms && <span className="form-error">{errors.selected_platforms}</span>}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingTop: '12px' }}>
          {PLATFORMS.map(({ value, label, Icon, color }) => {
            const active = (data.selected_platforms || []).includes(value);
            return (
              <button key={value} type="button"
                onClick={() => togglePlatform(value)}
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

      {/* Dynamic Handles */}
      {(data.selected_platforms || []).length > 0 && (
        <div style={{ 
          display: 'flex', flexDirection: 'column', gap: '20px',
          animation: 'slideUpSmooth 0.4s cubic-bezier(0.16,1,0.3,1) both' 
        }}>
          <label className="form-label">Social Handles *</label>
          {PLATFORMS.filter(p => (data.selected_platforms || []).includes(p.value)).map(p => (
            <div key={p.value} className="form-field">
              <label className="form-label" style={{ fontSize: '11px', color: p.color }}>{p.label} Handle</label>
              <input
                className={`form-input${errors[p.field] ? ' error' : ''}`}
                type="text" placeholder={`@your_${p.value}_handle`}
                value={(data[p.field] as string) || ''}
                onChange={e => onChange(p.field, e.target.value)} />
              {errors[p.field] && <span className="form-error">{errors[p.field]}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
