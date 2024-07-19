
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."danceRole" AS ENUM (
    'indifferent',
    'led',
    'leader'
);

ALTER TYPE "public"."danceRole" OWNER TO "postgres";

CREATE TYPE "public"."danceRolePreference" AS ENUM (
    'led',
    'leader'
);

ALTER TYPE "public"."danceRolePreference" OWNER TO "postgres";

CREATE TYPE "public"."enrollmentStatus" AS ENUM (
    'pending',
    'approved',
    'rejected'
);

ALTER TYPE "public"."enrollmentStatus" OWNER TO "postgres";

CREATE TYPE "public"."presenceEnum" AS ENUM (
    'notRegistered',
    'present',
    'absent',
    'justified'
);

ALTER TYPE "public"."presenceEnum" OWNER TO "postgres";

CREATE TYPE "public"."semesterEnum" AS ENUM (
    'first',
    'second',
    'firstVacation',
    'secondVacation'
);

ALTER TYPE "public"."semesterEnum" OWNER TO "postgres";

CREATE TYPE "public"."state" AS ENUM (
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO'
);

ALTER TYPE "public"."state" OWNER TO "postgres";

CREATE TYPE "public"."userRole" AS ENUM (
    'student',
    'teacher',
    'admin'
);

ALTER TYPE "public"."userRole" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."address" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "street" character varying NOT NULL,
    "number" smallint NOT NULL,
    "city" character varying NOT NULL,
    "state" "public"."state" NOT NULL,
    "zipCode" smallint NOT NULL,
    "complement" character varying,
    "reference" "text"
);

ALTER TABLE "public"."address" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."attendance" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "userId" "uuid" NOT NULL,
    "classDateId" "uuid" NOT NULL,
    "presence" "public"."presenceEnum" DEFAULT 'notRegistered'::"public"."presenceEnum" NOT NULL
);

ALTER TABLE "public"."attendance" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."calendar" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" character varying NOT NULL,
    "url" character varying NOT NULL
);

ALTER TABLE "public"."calendar" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."classDates" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT "now"() NOT NULL,
    "classId" "uuid" NOT NULL,
    "date" "date" NOT NULL
);

ALTER TABLE "public"."classDates" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."classes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "description" "text",
    "periodId" "uuid" NOT NULL,
    "franchiseId" "uuid",
    "name" character varying NOT NULL,
    "teacherId" "uuid",
    "weekDays" character varying NOT NULL,
    "size" smallint NOT NULL,
    CONSTRAINT "valid_days_of_week" CHECK (((("weekDays")::"text" ~ '^(mon|tue|wed|thu|fri|sat|sun)(,(mon|tue|wed|thu|fri|sat|sun))*(\s*)$'::"text") AND (("weekDays")::"text" ~ '^([a-z]{3})(,[a-z]{3})*(,|$)$'::"text") AND (NOT (("weekDays")::"text" ~ '\b(\w{3})\b.*\b\1\b'::"text"))))
);

ALTER TABLE "public"."classes" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."enrollment" (
    "createdAt" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "classId" "uuid" NOT NULL,
    "userId" "uuid" NOT NULL,
    "status" "public"."enrollmentStatus" DEFAULT 'pending'::"public"."enrollmentStatus" NOT NULL,
    "danceRole" "public"."danceRole" DEFAULT 'indifferent'::"public"."danceRole" NOT NULL,
    "danceRolePreference" "public"."danceRolePreference"
);

ALTER TABLE "public"."enrollment" OWNER TO "postgres";

COMMENT ON TABLE "public"."enrollment" IS 'Used to accept users'' enrollment in a class';

CREATE TABLE IF NOT EXISTS "public"."franchise" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "name" character varying NOT NULL,
    "addressId" "uuid" NOT NULL
);

ALTER TABLE "public"."franchise" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."period" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "semester" "public"."semesterEnum" NOT NULL,
    "year" smallint NOT NULL,
    "active" boolean DEFAULT true NOT NULL,
    "startDate" "date" NOT NULL,
    "endDate" "date" NOT NULL
);

ALTER TABLE "public"."period" OWNER TO "postgres";

COMMENT ON TABLE "public"."period" IS 'The period in which classes occur';

CREATE TABLE IF NOT EXISTS "public"."user" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "role" "public"."userRole" DEFAULT 'student'::"public"."userRole" NOT NULL
);

ALTER TABLE "public"."user" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."users_view" AS
 SELECT "users"."id",
    "users"."email",
    ("users"."raw_user_meta_data" ->> 'name'::"text") AS "name"
   FROM "auth"."users";

ALTER TABLE "public"."users_view" OWNER TO "postgres";

ALTER TABLE ONLY "public"."address"
    ADD CONSTRAINT "address_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."attendance"
    ADD CONSTRAINT "attendance_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."calendar"
    ADD CONSTRAINT "calendar_name_key" UNIQUE ("name");

ALTER TABLE ONLY "public"."calendar"
    ADD CONSTRAINT "calendar_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."classDates"
    ADD CONSTRAINT "classDates_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."classes"
    ADD CONSTRAINT "classes_names_key" UNIQUE ("name");

ALTER TABLE ONLY "public"."classes"
    ADD CONSTRAINT "classes_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."enrollment"
    ADD CONSTRAINT "enrollment_pkey" PRIMARY KEY ("classId", "userId");

ALTER TABLE ONLY "public"."franchise"
    ADD CONSTRAINT "franchise_name_key" UNIQUE ("name");

ALTER TABLE ONLY "public"."franchise"
    ADD CONSTRAINT "franchise_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."period"
    ADD CONSTRAINT "period_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."classDates"
    ADD CONSTRAINT "unique_classid_date" UNIQUE ("classId", "date");

ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."attendance"
    ADD CONSTRAINT "attendance_classDateId_fkey" FOREIGN KEY ("classDateId") REFERENCES "public"."classDates"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."attendance"
    ADD CONSTRAINT "attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."classDates"
    ADD CONSTRAINT "classDates_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."classes"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."classes"
    ADD CONSTRAINT "classes_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "public"."franchise"("id");

ALTER TABLE ONLY "public"."classes"
    ADD CONSTRAINT "classes_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "public"."period"("id") ON UPDATE CASCADE;

ALTER TABLE ONLY "public"."classes"
    ADD CONSTRAINT "classes_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."enrollment"
    ADD CONSTRAINT "enrollment_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."classes"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."enrollment"
    ADD CONSTRAINT "enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."franchise"
    ADD CONSTRAINT "franchise_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "public"."address"("id") ON UPDATE CASCADE;

ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "user_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."address" TO "anon";
GRANT ALL ON TABLE "public"."address" TO "authenticated";
GRANT ALL ON TABLE "public"."address" TO "service_role";

GRANT ALL ON TABLE "public"."attendance" TO "anon";
GRANT ALL ON TABLE "public"."attendance" TO "authenticated";
GRANT ALL ON TABLE "public"."attendance" TO "service_role";

GRANT ALL ON TABLE "public"."calendar" TO "anon";
GRANT ALL ON TABLE "public"."calendar" TO "authenticated";
GRANT ALL ON TABLE "public"."calendar" TO "service_role";

GRANT ALL ON TABLE "public"."classDates" TO "anon";
GRANT ALL ON TABLE "public"."classDates" TO "authenticated";
GRANT ALL ON TABLE "public"."classDates" TO "service_role";

GRANT ALL ON TABLE "public"."classes" TO "anon";
GRANT ALL ON TABLE "public"."classes" TO "authenticated";
GRANT ALL ON TABLE "public"."classes" TO "service_role";

GRANT ALL ON TABLE "public"."enrollment" TO "anon";
GRANT ALL ON TABLE "public"."enrollment" TO "authenticated";
GRANT ALL ON TABLE "public"."enrollment" TO "service_role";

GRANT ALL ON TABLE "public"."franchise" TO "anon";
GRANT ALL ON TABLE "public"."franchise" TO "authenticated";
GRANT ALL ON TABLE "public"."franchise" TO "service_role";

GRANT ALL ON TABLE "public"."period" TO "anon";
GRANT ALL ON TABLE "public"."period" TO "authenticated";
GRANT ALL ON TABLE "public"."period" TO "service_role";

GRANT ALL ON TABLE "public"."user" TO "anon";
GRANT ALL ON TABLE "public"."user" TO "authenticated";
GRANT ALL ON TABLE "public"."user" TO "service_role";

GRANT ALL ON TABLE "public"."users_view" TO "anon";
GRANT ALL ON TABLE "public"."users_view" TO "authenticated";
GRANT ALL ON TABLE "public"."users_view" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
