-- AgencyOS — Supabase Schema
-- Run this in the Supabase SQL editor to set up the database.

-- ─────────────────────────────────────────────────────────────────────
-- Enable required extensions
-- ─────────────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────────────────────────────────
-- users (extends Supabase auth.users)
-- ─────────────────────────────────────────────────────────────────────
create table public.users (
  id           uuid primary key references auth.users(id) on delete cascade,
  email        text not null,
  full_name    text not null default '',
  avatar_url   text,
  company      text,
  role         text,
  plan         text not null default 'free'
                 check (plan in ('free', 'starter', 'pro', 'team', 'enterprise')),
  is_admin     boolean not null default false,
  stripe_customer_id    text unique,
  stripe_subscription_id text unique,
  onboarding_completed  boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table public.users enable row level security;

create policy "users: select own" on public.users
  for select using (auth.uid() = id);

create policy "users: update own" on public.users
  for update using (auth.uid() = id);

-- Admins can see all users
create policy "users: admin select all" on public.users
  for select using (
    exists (select 1 from public.users where id = auth.uid() and is_admin = true)
  );

-- ─────────────────────────────────────────────────────────────────────
-- agents (managed by admins, read by all)
-- ─────────────────────────────────────────────────────────────────────
create table public.agents (
  id                  uuid primary key default uuid_generate_v4(),
  slug                text unique not null,
  name                text not null,
  division            text not null,
  category            text not null,
  short_description   text not null,
  long_description    text not null,
  role_label          text not null,
  mission             text not null,
  when_to_use         text not null,
  input_requirements  text[] not null default '{}',
  output_format       text[] not null default '{}',
  system_prompt       text not null,
  example_tasks       text[] not null default '{}',
  suggested_prompts   text[] not null default '{}',
  plan_required       text not null default 'free'
                        check (plan_required in ('free', 'starter', 'pro', 'team', 'enterprise')),
  is_featured         boolean not null default false,
  is_active           boolean not null default true,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

alter table public.agents enable row level security;

create policy "agents: select active" on public.agents
  for select using (is_active = true);

create policy "agents: admin all" on public.agents
  for all using (
    exists (select 1 from public.users where id = auth.uid() and is_admin = true)
  );

-- ─────────────────────────────────────────────────────────────────────
-- projects
-- ─────────────────────────────────────────────────────────────────────
create table public.projects (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.users(id) on delete cascade,
  name        text not null,
  description text not null default '',
  status      text not null default 'active'
                check (status in ('active', 'archived')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "projects: select own" on public.projects
  for select using (auth.uid() = user_id);

create policy "projects: insert own" on public.projects
  for insert with check (auth.uid() = user_id);

create policy "projects: update own" on public.projects
  for update using (auth.uid() = user_id);

create policy "projects: delete own" on public.projects
  for delete using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────
-- agent_runs
-- ─────────────────────────────────────────────────────────────────────
create table public.agent_runs (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references public.users(id) on delete cascade,
  agent_id         text not null,
  agent_name       text not null,
  agent_division   text not null,
  project_id       uuid references public.projects(id) on delete set null,
  task             text not null,
  context          text,
  desired_output   text,
  detail_level     text,
  output           jsonb,
  status           text not null default 'pending'
                     check (status in ('pending', 'running', 'completed', 'failed')),
  error_message    text,
  model_used       text,
  credits_used     integer not null default 1,
  created_at       timestamptz not null default now()
);

alter table public.agent_runs enable row level security;

create policy "agent_runs: select own" on public.agent_runs
  for select using (auth.uid() = user_id);

create policy "agent_runs: insert own" on public.agent_runs
  for insert with check (auth.uid() = user_id);

create policy "agent_runs: admin select all" on public.agent_runs
  for select using (
    exists (select 1 from public.users where id = auth.uid() and is_admin = true)
  );

-- ─────────────────────────────────────────────────────────────────────
-- saved_outputs
-- ─────────────────────────────────────────────────────────────────────
create table public.saved_outputs (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.users(id) on delete cascade,
  project_id    uuid references public.projects(id) on delete set null,
  agent_run_id  uuid references public.agent_runs(id) on delete cascade,
  agent_name    text not null,
  title         text not null,
  content       text not null,
  format        text not null default 'markdown'
                  check (format in ('markdown', 'text')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.saved_outputs enable row level security;

create policy "saved_outputs: select own" on public.saved_outputs
  for select using (auth.uid() = user_id);

create policy "saved_outputs: insert own" on public.saved_outputs
  for insert with check (auth.uid() = user_id);

create policy "saved_outputs: update own" on public.saved_outputs
  for update using (auth.uid() = user_id);

create policy "saved_outputs: delete own" on public.saved_outputs
  for delete using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────
-- usage_periods (for metering)
-- ─────────────────────────────────────────────────────────────────────
create table public.usage_periods (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.users(id) on delete cascade,
  period_start  timestamptz not null,
  period_end    timestamptz not null,
  runs_used     integer not null default 0,
  credits_used  integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (user_id, period_start)
);

alter table public.usage_periods enable row level security;

create policy "usage_periods: select own" on public.usage_periods
  for select using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────
-- Trigger: auto-update updated_at
-- ─────────────────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_users_updated_at
  before update on public.users
  for each row execute function public.set_updated_at();

create trigger trg_projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

create trigger trg_saved_outputs_updated_at
  before update on public.saved_outputs
  for each row execute function public.set_updated_at();

-- ─────────────────────────────────────────────────────────────────────
-- Trigger: create user profile on auth.users insert
-- ─────────────────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.users (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─────────────────────────────────────────────────────────────────────
-- Indexes
-- ─────────────────────────────────────────────────────────────────────
create index idx_agent_runs_user_id on public.agent_runs(user_id);
create index idx_agent_runs_project_id on public.agent_runs(project_id);
create index idx_agent_runs_created_at on public.agent_runs(created_at desc);
create index idx_saved_outputs_user_id on public.saved_outputs(user_id);
create index idx_saved_outputs_project_id on public.saved_outputs(project_id);
create index idx_projects_user_id on public.projects(user_id);
create index idx_usage_periods_user_id on public.usage_periods(user_id);

-- ─────────────────────────────────────────────────────────────────────
-- usage (monthly usage tracking)
-- ─────────────────────────────────────────────────────────────────────
create table public.usage (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.users(id) on delete cascade,
  month        text not null,
  runs_used    int not null default 0,
  runs_limit   int not null,
  overage_runs int not null default 0,
  overage_cost decimal(10,2) not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique(user_id, month)
);

alter table public.usage enable row level security;
create policy "usage: select own" on public.usage for select using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────
-- scheduled_runs (cron scheduling)
-- ─────────────────────────────────────────────────────────────────────
create table public.scheduled_runs (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.users(id) on delete cascade,
  agent_slug   text not null,
  frequency    text not null check (frequency in ('daily', 'weekly', 'monthly', 'custom')),
  cron_expr    text,
  name         text not null,
  is_active    boolean not null default true,
  last_run_at  timestamptz,
  next_run_at  timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table public.scheduled_runs enable row level security;
create policy "scheduled_runs: select own" on public.scheduled_runs for select using (auth.uid() = user_id);
create policy "scheduled_runs: insert own" on public.scheduled_runs for insert with check (auth.uid() = user_id);
create policy "scheduled_runs: update own" on public.scheduled_runs for update using (auth.uid() = user_id);
create policy "scheduled_runs: delete own" on public.scheduled_runs for delete using (auth.uid() = user_id);
