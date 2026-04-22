import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { WaitlistFormData } from '../types/waitlist';
import ProgressBar from '../components/form/ProgressBar';
import Step1Personal from '../components/form/Step1Personal';
import Step2Creator from '../components/form/Step2Creator';
import Step3Content from '../components/form/Step3Content';
import Step4Brands from '../components/form/Step4Brands';
import SuccessView from '../components/form/SuccessView';

const INITIAL_FORM: WaitlistFormData = {
  full_name: '',
  email: '',
  phone: '',
  location_city: '',
  gender: undefined,
  selected_platforms: [],
  instagram_handle: '',
  tiktok_handle: '',
  youtube_handle: '',
  twitter_handle: '',
  facebook_handle: '',
  content_niches: [],
  content_formats: [],
  preferred_content: '',
  avoid_content: '',
  has_worked_with_brands: undefined,
  brand_count_estimate: undefined,
  preferred_deal_type: [],
  referral_source: '',
};

function validateStep(step: number, data: WaitlistFormData): Partial<Record<keyof WaitlistFormData, string>> {
  const errors: Partial<Record<keyof WaitlistFormData, string>> = {};
  if (step === 1) {
    if (!data.full_name?.trim()) errors.full_name = 'Name is required';
    if (!data.email?.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email address';
  }
  if (step === 2) {
    if (data.selected_platforms.length === 0) {
      errors.selected_platforms = 'Select at least one platform';
    } else {
      data.selected_platforms.forEach(p => {
        const field = `${p}_handle` as keyof WaitlistFormData;
        if (!data[field]) errors[field] = `Enter your ${p} handle`;
      });
    }
  }
  return errors;
}

export default function JoinPage() {
  const [formData, setFormData] = useState<WaitlistFormData>(INITIAL_FORM);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Partial<Record<keyof WaitlistFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState<{ position: number; email: string } | null>(null);

  const handleChange = (field: keyof WaitlistFormData, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setCurrentStep(s => s + 1);
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep(s => s - 1);
  };

  const handleSubmit = async () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) { setErrors(stepErrors); return; }

    setLoading(true);
    setSubmitError('');
    try {
      const payload = {
        ...formData,
        phone: formData.phone || null,
        location_city: formData.location_city || null,
        gender: formData.gender || null,
        instagram_handle: formData.instagram_handle || null,
        tiktok_handle: formData.tiktok_handle || null,
        youtube_handle: formData.youtube_handle || null,
        twitter_handle: formData.twitter_handle || null,
        facebook_handle: formData.facebook_handle || null,
        preferred_content: formData.preferred_content || null,
        avoid_content: formData.avoid_content || null,
        brand_count_estimate: formData.brand_count_estimate || null,
        referral_source: formData.referral_source || null,
      };
      const { data, error } = await supabase
        .from('waitlist_entries')
        .insert(payload)
        .select('waitlist_position')
        .single();

      if (error) throw error;
      setSuccess({ position: data.waitlist_position ?? 0, email: formData.email });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('duplicate') || msg.includes('unique')) {
        setSubmitError('This email is already on the waitlist!');
      } else {
        setSubmitError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const STEP_COMPONENTS = [
    <Step1Personal key={1} data={formData} onChange={handleChange} errors={errors} />,
    <Step2Creator key={2} data={formData} onChange={handleChange} errors={errors} />,
    <Step3Content key={3} data={formData} onChange={handleChange} errors={errors} />,
    <Step4Brands key={4} data={formData} onChange={handleChange} errors={errors} />,
  ];

  return (
    <div className="bg-matcha-grad" style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '40px 24px 80px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative elements - ensured lower z-index */}
      <div style={{
        position: 'absolute', top: '10%', right: '-5%', width: '300px', height: '300px',
        background: 'var(--cr-pink)', filter: 'url(#liquid-filter)', opacity: 0.1, zIndex: -1,
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '-5%', width: '400px', height: '400px',
        background: 'var(--cr-purple)', filter: 'url(#liquid-filter)', opacity: 0.1, zIndex: -1,
      }} />

      {/* Header */}
      <div style={{ width: '100%', maxWidth: '640px', marginBottom: '40px', position: 'relative', zIndex: 1 }}>
        <Link to="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          marginBottom: '32px',
          color: 'var(--cr-dark)', fontSize: '14px', fontWeight: 600, transition: 'transform 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'translateX(-4px)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'translateX(0)')}>
          <ArrowLeft size={14} strokeWidth={2.5} /> Back to Home
        </Link>
        {!success && (
          <>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 6vw, 48px)',
              fontWeight: 700, marginBottom: '10px', letterSpacing: '-0.02em',
              color: 'var(--cr-pink)', textTransform: 'uppercase',
              animation: 'popBounce 0.6s cubic-bezier(0.16,1,0.3,1) both',
            }}>
              Join the Waitlist
            </h1>
            <p style={{ color: 'var(--cr-dark)', opacity: 0.8, fontSize: '18px', fontWeight: 500, animation: 'slideUpSmooth 0.6s cubic-bezier(0.16,1,0.3,1) both 80ms' }}>
              Build your creator profile and secure your spot.
            </p>
          </>
        )}
      </div>

      {/* Form card */}
      <div className="card" style={{
        width: '100%', maxWidth: '640px', position: 'relative', zIndex: 1,
        padding: 'clamp(24px, 5vw, 48px)',
        animation: 'popBounce 0.7s cubic-bezier(0.16,1,0.3,1) both 100ms',
      }}>
        {success ? (
          <SuccessView position={success.position} email={success.email} />
        ) : (
          <>
            <ProgressBar currentStep={currentStep} totalSteps={4} />
            <div style={{ minHeight: '320px' }}>
              {STEP_COMPONENTS[currentStep - 1]}
            </div>

            {submitError && (
              <div style={{
                background: 'var(--cr-white)', border: '2px solid var(--cr-orange)',
                borderRadius: '12px', padding: '12px 16px', marginTop: '24px',
                color: 'var(--cr-orange)', fontSize: '14px', fontWeight: 600,
              }}>
                {submitError}
              </div>
            )}

            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginTop: '36px', paddingTop: '24px', borderTop: '2px solid var(--cr-blush)',
            }}>
              {currentStep > 1 ? (
                <button onClick={handleBack}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--cr-pink)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)', transition: 'transform 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateX(-4px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateX(0)')}>
                  <ArrowLeft size={14} strokeWidth={2.5} /> Back
                </button>
              ) : <div />}
              {currentStep < 4 ? (
                <button 
                  className="persistent-cta" 
                  style={{ position: 'relative', bottom: 'auto', right: 'auto', zIndex: 'auto', fontSize: '14px', padding: '12px 24px' }}
                  onClick={handleNext}
                >
                  Next <ArrowRight size={15} strokeWidth={2.5} />
                </button>
              ) : (
                <button 
                  className="persistent-cta" 
                  style={{ position: 'relative', bottom: 'auto', right: 'auto', zIndex: 'auto', fontSize: '14px', padding: '12px 24px' }}
                  onClick={handleSubmit} 
                  disabled={loading}
                >
                  {loading
                    ? <><Loader2 size={15} strokeWidth={2.5} style={{ animation: 'spin 1s linear infinite' }} /> Submitting…</>
                    : <>Submit Application <ArrowRight size={15} strokeWidth={2.5} /></>
                  }
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
