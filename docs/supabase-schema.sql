-- Lapisan 2 (cache cepat) untuk aplikasi WMS: HP -> Supabase -> Google Sheets.
-- Jalankan sekali di Supabase: SQL Editor > New query > tempel > Run.
-- Data yang disimpan: hasil periksa, DC, tugas, penutupan, aging, kelas aging, clearing selesai.
-- TIDAK disimpan di sini: master bin, user & password (tetap hanya di Google Sheets / HP).

create sequence if not exists wms_rev;

create table if not exists wms_records (
  coll    text        not null check (coll in ('counts','dc','tasks','closed','aging','agcls','clrdone')),
  id      text        not null check (char_length(id) <= 200),
  value   jsonb       check (value is null or pg_column_size(value) <= 60000),
  at      timestamptz not null,                      -- cap waktu perubahan: yang terbaru menang
  deleted boolean     not null default false,        -- true = batu nisan (record dihapus)
  srv     bigint      not null default nextval('wms_rev'),
  primary key (coll, id)
);
create index if not exists wms_records_srv_idx on wms_records (srv);

alter table wms_records enable row level security;
drop policy if exists "anon boleh baca" on wms_records;
create policy "anon boleh baca" on wms_records for select to anon using (true);
-- sengaja TANPA policy insert/update/delete: penulisan hanya lewat fungsi di bawah.

create or replace function wms_put_many(items jsonb) returns bigint
language plpgsql security definer set search_path = public as $$
declare it jsonb; mx bigint := 0; r bigint;
begin
  if jsonb_typeof(items) <> 'array' or jsonb_array_length(items) > 500 then
    raise exception 'items tidak valid';
  end if;
  for it in select * from jsonb_array_elements(items) loop
    r := null;
    insert into wms_records (coll, id, value, at, deleted, srv)
    values (it->>'coll', it->>'id',
            case when coalesce((it->>'deleted')::boolean, false) then null else it->'value' end,
            (it->>'at')::timestamptz,
            coalesce((it->>'deleted')::boolean, false),
            nextval('wms_rev'))
    on conflict (coll, id) do update
      set value = excluded.value, at = excluded.at, deleted = excluded.deleted, srv = excluded.srv
      where wms_records.at <= excluded.at          -- hanya perubahan yang lebih baru yang diterima
    returning srv into r;
    if r is not null and r > mx then mx := r; end if;
  end loop;
  return coalesce(nullif(mx, 0), (select max(srv) from wms_records), 0);
end $$;

revoke all on function wms_put_many(jsonb) from public;
grant execute on function wms_put_many(jsonb) to anon;

-- Opsional: bersihkan batu nisan > 30 hari (jalankan berkala / pg_cron)
-- delete from wms_records where deleted and at < now() - interval '30 days';
