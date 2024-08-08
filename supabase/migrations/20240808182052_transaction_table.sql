create type "public"."transactionType" as enum ('income', 'expense');

drop view if exists "public"."users_view";

create table "public"."transaction" (
    "id" uuid not null default gen_random_uuid(),
    "createdAt" timestamp without time zone not null default now(),
    "lastEdited" timestamp without time zone not null default now(),
    "date" timestamp without time zone not null default now(),
    "type" "transactionType" not null,
    "amount" real not null,
    "description" text
);


alter table "public"."transaction" enable row level security;

CREATE UNIQUE INDEX transaction_pkey ON public.transaction USING btree (id);

alter table "public"."transaction" add constraint "transaction_pkey" PRIMARY KEY using index "transaction_pkey";

create or replace view "public"."users_view" as  SELECT users.id,
    users.email,
    (users.raw_user_meta_data ->> 'full_name'::text) AS full_name,
    users.encrypted_password AS password,
    (users.raw_user_meta_data ->> 'avatar_url'::text) AS avatar_url
   FROM auth.users;


grant delete on table "public"."transaction" to "anon";

grant insert on table "public"."transaction" to "anon";

grant references on table "public"."transaction" to "anon";

grant select on table "public"."transaction" to "anon";

grant trigger on table "public"."transaction" to "anon";

grant truncate on table "public"."transaction" to "anon";

grant update on table "public"."transaction" to "anon";

grant delete on table "public"."transaction" to "authenticated";

grant insert on table "public"."transaction" to "authenticated";

grant references on table "public"."transaction" to "authenticated";

grant select on table "public"."transaction" to "authenticated";

grant trigger on table "public"."transaction" to "authenticated";

grant truncate on table "public"."transaction" to "authenticated";

grant update on table "public"."transaction" to "authenticated";

grant delete on table "public"."transaction" to "service_role";

grant insert on table "public"."transaction" to "service_role";

grant references on table "public"."transaction" to "service_role";

grant select on table "public"."transaction" to "service_role";

grant trigger on table "public"."transaction" to "service_role";

grant truncate on table "public"."transaction" to "service_role";

grant update on table "public"."transaction" to "service_role";



