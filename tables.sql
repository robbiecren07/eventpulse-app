/**
* USERS
* Note: This table contains user data. Users should only be able to view and update their own data.
*/
create table users (
  -- UUID from auth.users
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  email text unique not null,
);
alter table users
  enable row level security;
create policy "Can view own user data." on users
  for select using ((select auth.uid()) = id);
create policy "Can update own user data." on users
  for update using ((select auth.uid()) = id);

/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
*/
create function public.handle_new_user()
returns trigger as
$$
  begin
    insert into public.users (id, email, full_name, avatar_url)
    values (new.id, new.email,  new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
    return new;
  end;
$$
language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
    execute procedure public.handle_new_user();



-- Create API Keys Table
create table api_keys (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id) on delete cascade,
  api_key varchar(255) unique not null,
  created_at timestamp with time zone default current_timestamp
);

-- Create Events Table
create table events (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id) on delete cascade,
  event_name varchar(255) not null,
  event_data jsonb not null,
  created_at timestamp with time zone default current_timestamp
);

-- Create Integrations Table
create table integrations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id) on delete cascade,
  integration_name varchar(255) not null,
  integration_settings jsonb not null,
  created_at timestamp with time zone default current_timestamp
);

-- Create Logs Table
create table logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id) on delete cascade,
  action varchar(255) not null,
  log_data jsonb not null,
  created_at timestamp with time zone default current_timestamp
);

alter table api_keys enable row level security;
alter table events enable row level security;
alter table integrations enable row level security;
alter table logs enable row level security;

create policy select_api_keys on api_keys for select using (auth.uid() = user_id);
create policy insert_api_keys on api_keys for insert with check (auth.uid() = user_id);
create policy delete_api_keys on api_keys for delete using (auth.uid() = user_id);

create policy select_events on events for select using (auth.uid() = user_id);
create policy insert_events on events for insert with check (auth.uid() = user_id);

create policy select_integrations on integrations for select using (auth.uid() = user_id);
create policy insert_integrations on integrations for insert with check (auth.uid() = user_id);
create policy update_integrations on integrations for update using (auth.uid() = user_id);
create policy delete_integrations on integrations for delete using (auth.uid() = user_id);

create policy select_logs on logs for select using (auth.uid() = user_id);