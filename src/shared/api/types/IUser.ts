export interface IUser {
	id: string
	firstName: string
	lastName: string
	email: string
	gender?: string | null
	avatar?: string | null
	age?: number | null
}
