export type UserDTO = {
    id?: number
    register: string
    password: string
    name?: string
    email?: string
    role?: string
    is_paid?: boolean
    payment_due_date: string
    created_at?: string
    updated_at?: string
}