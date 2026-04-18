export interface WaitlistEntry {
  id: string;
  created_at: string;

  // Identity
  full_name: string;
  email: string;
  phone?: string;
  location_city?: string;
  location_country?: string;
  gender?: 'male' | 'female' | 'prefer_not_to_say';

  // Creator Profile
  primary_platform: 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'facebook';
  instagram_handle?: string;
  tiktok_handle?: string;
  youtube_handle?: string;
  twitter_handle?: string;
  facebook_handle?: string;

  // Metrics
  total_followers?: number;
  primary_follower_count?: number;
  avg_engagement_rate?: number;
  monthly_content_count?: number;

  // Content
  content_niches?: string[];
  content_formats?: string[];
  bio?: string;

  // Brand Experience
  has_worked_with_brands?: boolean;
  brand_count_estimate?: 'none' | '1-3' | '4-10' | '10+';
  preferred_deal_type?: string[];

  // Discovery
  referral_source?: string;
  referral_code?: string;

  // Admin
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  waitlist_position?: number;
}

export type WaitlistFormData = Omit<WaitlistEntry, 'id' | 'created_at' | 'status' | 'admin_notes' | 'waitlist_position'>;
