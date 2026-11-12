-- Tabla de reseñas para la página de Milena Gauchat.
-- Se ejecuta una sola vez en Supabase: SQL Editor -> New query -> pegar todo -> Run.
-- Las reseñas se publican solas. Para ocultar una, poné "aprobada" en false
-- desde Table Editor, o borrá la fila.

create table if not exists public.resenas (
  id bigint generated always as identity primary key,
  nombre text not null check (char_length(nombre) between 2 and 60),
  estrellas int not null check (estrellas between 1 and 5),
  comentario text not null check (char_length(comentario) between 5 and 500),
  aprobada boolean not null default true,
  creada timestamptz not null default now()
);

alter table public.resenas enable row level security;

drop policy if exists "leer publicadas" on public.resenas;
create policy "leer publicadas" on public.resenas
  for select to anon using (aprobada);

drop policy if exists "enviar" on public.resenas;
create policy "enviar" on public.resenas
  for insert to anon with check (aprobada);

grant select, insert on public.resenas to anon;
