-- CreatorRewards Waitlist Schema
-- Run this in Supabase SQL Editor

create table if not exists waitlist_entries (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),

  -- Identity
  full_name text not null,
  email text not null unique,
  phone text,
  location_city text,
  location_country text default 'Nigeria',
  gender text, -- 'male' | 'female' | 'prefer_not_to_say'

  -- Creator Profile
  primary_platform text not null, -- 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'facebook'
  instagram_handle text,
  tiktok_handle text,
  youtube_handle text,
  twitter_handle text,
  facebook_handle text,

  -- Metrics
  total_followers integer,
  primary_follower_count integer,
  avg_engagement_rate numeric(5,2),
  monthly_content_count integer,

  -- Content
  content_niches text[],
  content_formats text[],
  bio text,

  -- Brand Experience
  has_worked_with_brands boolean default false,
  brand_count_estimate text, -- 'none' | '1-3' | '4-10' | '10+'
  preferred_deal_type text[],

  -- Discovery
  referral_source text,
  referral_code text,

  -- Admin
  status text default 'pending', -- 'pending' | 'approved' | 'rejected'
  admin_notes text,
  waitlist_position integer
);

-- Indexes
create index if not exists waitlist_entries_created_at_idx on waitlist_entries (created_at desc);
create index if not exists waitlist_entries_status_idx on waitlist_entries (status);
create index if not exists waitlist_entries_platform_idx on waitlist_entries (primary_platform);

-- Waitlist position auto-assign
create sequence if not exists waitlist_position_seq start 1;

create or replace function assign_waitlist_position()
returns trigger as $$
begin
  new.waitlist_position = nextval('waitlist_position_seq');
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_waitlist_position on waitlist_entries;
create trigger set_waitlist_position
before insert on waitlist_entries
for each row execute function assign_waitlist_position();

-- Row Level Security
alter table waitlist_entries enable row level security;

-- Allow public INSERT (waitlist signups)
create policy "Allow public insert"
  on waitlist_entries for insert
  to anon
  with check (true);

-- Allow service role full access (admin dashboard)
-- Service role bypasses RLS by default — no extra policy needed.
