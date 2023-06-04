interface IClassnameObjectProperty {
	[keyof: string]: boolean
}

export const classname = (
	...classes: (string | IClassnameObjectProperty | false | null | undefined)[]
) => {
	const result: string[] = []
	classes.forEach(cl => {
		if (typeof cl === "string") {
			result.push(cl)
		} else if (cl) {
			Object.entries(cl).forEach(en => {
				const [key, value] = en
				if (value) {
					result.push(key)
				}
			})
		}
	})

	return result.join(" ")
}
