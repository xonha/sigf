import { Database } from "@/database.types";

export type TEnrollmentRow = Database["public"]["Tables"]["enrollment"]["Row"];
export type TEnrollmentInsert =
  Database["public"]["Tables"]["enrollment"]["Insert"];
export type TEnrollmentUpdate =
  Database["public"]["Tables"]["enrollment"]["Update"];

export type TApprovedEnrollment =
  Database["public"]["Tables"]["enrollment"]["Insert"] & {
    user_view: Database["public"]["Views"]["users_view"]["Insert"];
  };
