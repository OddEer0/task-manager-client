import { ColumnCreate } from "@/shared/api"

export type ICreateColumnForm = Omit<ColumnCreate, "projectId">
