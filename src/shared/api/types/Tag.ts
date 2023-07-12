export interface TagCreate {
	name: string
	projectId: string
}

export interface Tag extends TagCreate {
	id: string
	bg: string
	color: string
}

export interface TagUpdate {
	id: string
	tag: Partial<Omit<Tag, "id" | "projectId">>
}
