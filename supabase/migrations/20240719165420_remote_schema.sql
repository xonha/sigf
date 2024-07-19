alter table "auth"."users" alter column "aud" set data type character varying using "aud"::character varying;

alter table "auth"."users" alter column "email" set not null;

alter table "auth"."users" alter column "role" set not null;

alter table "auth"."users" alter column "role" set data type character varying using "role"::character varying;


