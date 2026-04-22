export interface WaitlistEntry {
  id: string;
  created_at: string;

  // Identity
  full_name: string;
  email: string;
  phone?: string;
  location_city?: string;
  gender?: 'male' | 'female' | 'prefer_not_to_say';

  // Creator Profile
  selected_platforms: string[];
  instagram_handle?: string;
  tiktok_handle?: string;
  youtube_handle?: string;
  twitter_handle?: string;
  facebook_handle?: string;

  // Content
  content_niches?: string[];
  content_formats?: string[];
  preferred_content?: string;
  avoid_content?: string;

  // Brand Experience
  has_worked_with_brands?: boolean;
  brand_count_estimate?: 'none' | '1-3' | '4-10' | '10+';
  preferred_deal_type?: string[];

  // Discovery
  referral_source?: string;

  // Admin
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  waitlist_position?: number;
}

export type WaitlistFormData = Omit<WaitlistEntry, 'id' | 'created_at' | 'status' | 'admin_notes' | 'waitlist_position'>;
