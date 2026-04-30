-- Odiscom Supply database schema
-- Run this in the Supabase SQL Editor before testing quote submissions.

create extension if not exists "uuid-ossp";

create table if not exists quotes (
  id uuid default uuid_generate_v4() primary key,
  quote_id text not null unique,
  name text not null,
  company text not null,
  email text not null,
  phone text,
  details text,
  status text not null default 'pending',
  created_at timestamp with time zone default now()
);

create index if not exists quotes_created_at_idx on quotes (created_at desc);
create index if not exists quotes_status_idx on quotes (status);
