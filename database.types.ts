export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      address: {
        Row: {
          city: string
          complement: string | null
          createdAt: string
          id: string
          number: number
          reference: string | null
          state: Database["public"]["Enums"]["state"]
          street: string
          zipCode: number
        }
        Insert: {
          city: string
          complement?: string | null
          createdAt?: string
          id?: string
          number: number
          reference?: string | null
          state: Database["public"]["Enums"]["state"]
          street: string
          zipCode: number
        }
        Update: {
          city?: string
          complement?: string | null
          createdAt?: string
          id?: string
          number?: number
          reference?: string | null
          state?: Database["public"]["Enums"]["state"]
          street?: string
          zipCode?: number
        }
        Relationships: []
      }
      attendance: {
        Row: {
          classDateId: string
          createdAt: string
          id: string
          presence: Database["public"]["Enums"]["presenceEnum"]
          userId: string
        }
        Insert: {
          classDateId: string
          createdAt?: string
          id?: string
          presence?: Database["public"]["Enums"]["presenceEnum"]
          userId: string
        }
        Update: {
          classDateId?: string
          createdAt?: string
          id?: string
          presence?: Database["public"]["Enums"]["presenceEnum"]
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_classDateId_fkey"
            columns: ["classDateId"]
            isOneToOne: false
            referencedRelation: "classDates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users_view"
            referencedColumns: ["id"]
          }
        ]
      }
      classDates: {
        Row: {
          classId: string
          createdAt: string
          date: string
          id: string
        }
        Insert: {
          classId: string
          createdAt?: string
          date: string
          id?: string
        }
        Update: {
          classId?: string
          createdAt?: string
          date?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "classDates_classId_fkey"
            columns: ["classId"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          }
        ]
      }
      classes: {
        Row: {
          createdAt: string
          description: string | null
          franchiseId: string | null
          id: string
          isActive: boolean
          name: string
          periodId: string
          size: number
          teacherId: string | null
          week_days: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          franchiseId?: string | null
          id?: string
          isActive?: boolean
          name: string
          periodId: string
          size: number
          teacherId?: string | null
          week_days: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          franchiseId?: string | null
          id?: string
          isActive?: boolean
          name?: string
          periodId?: string
          size?: number
          teacherId?: string | null
          week_days?: string
        }
        Relationships: [
          {
            foreignKeyName: "classes_franchiseId_fkey"
            columns: ["franchiseId"]
            isOneToOne: false
            referencedRelation: "franchise"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_periodId_fkey"
            columns: ["periodId"]
            isOneToOne: false
            referencedRelation: "period"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_teacherId_fkey"
            columns: ["teacherId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_teacherId_fkey"
            columns: ["teacherId"]
            isOneToOne: false
            referencedRelation: "users_view"
            referencedColumns: ["id"]
          }
        ]
      }
      enrollment: {
        Row: {
          classId: string
          createdAt: string
          danceRole: Database["public"]["Enums"]["danceRole"]
          status: Database["public"]["Enums"]["enrollmentStatus"]
          userId: string
        }
        Insert: {
          classId: string
          createdAt?: string
          danceRole?: Database["public"]["Enums"]["danceRole"]
          status?: Database["public"]["Enums"]["enrollmentStatus"]
          userId: string
        }
        Update: {
          classId?: string
          createdAt?: string
          danceRole?: Database["public"]["Enums"]["danceRole"]
          status?: Database["public"]["Enums"]["enrollmentStatus"]
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollment_classId_fkey"
            columns: ["classId"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users_view"
            referencedColumns: ["id"]
          }
        ]
      }
      franchise: {
        Row: {
          addressId: string
          createdAt: string
          id: string
          name: string
        }
        Insert: {
          addressId: string
          createdAt?: string
          id?: string
          name: string
        }
        Update: {
          addressId?: string
          createdAt?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "franchise_addressId_fkey"
            columns: ["addressId"]
            isOneToOne: false
            referencedRelation: "address"
            referencedColumns: ["id"]
          }
        ]
      }
      period: {
        Row: {
          active: boolean
          createdAt: string
          endDate: string
          id: string
          semester: Database["public"]["Enums"]["semesterEnum"]
          startDate: string
          year: number
        }
        Insert: {
          active?: boolean
          createdAt?: string
          endDate: string
          id?: string
          semester: Database["public"]["Enums"]["semesterEnum"]
          startDate: string
          year: number
        }
        Update: {
          active?: boolean
          createdAt?: string
          endDate?: string
          id?: string
          semester?: Database["public"]["Enums"]["semesterEnum"]
          startDate?: string
          year?: number
        }
        Relationships: []
      }
    }
    Views: {
      users_view: {
        Row: {
          email: string | null
          id: string | null
          name: string | null
        }
        Insert: {
          email?: string | null
          id?: string | null
          name?: never
        }
        Update: {
          email?: string | null
          id?: string | null
          name?: never
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      danceRole: "indifferent" | "led" | "leader"
      enrollmentStatus: "pending" | "approved" | "rejected"
      presenceEnum: "notRegistered" | "present" | "absent" | "justified"
      semesterEnum: "first" | "second" | "firstVacation" | "secondVacation"
      state:
        | "AC"
        | "AL"
        | "AP"
        | "AM"
        | "BA"
        | "CE"
        | "ES"
        | "GO"
        | "MA"
        | "MT"
        | "MS"
        | "MG"
        | "PA"
        | "PB"
        | "PR"
        | "PE"
        | "PI"
        | "RJ"
        | "RN"
        | "RS"
        | "RO"
        | "RR"
        | "SC"
        | "SP"
        | "SE"
        | "TO"
      userRole: "student" | "teacher" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
