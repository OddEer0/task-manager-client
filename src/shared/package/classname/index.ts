interface IClassnameObjectProperty {
	[keyof: string]: boolean
}

type ClassnameArgs = (
	| string
	| ClassnameArgs
	| IClassnameObjectProperty
	| false
	| null
	| undefined
)[]

export const classname = (...classes: ClassnameArgs) => {
	const result: string[] = []
	classes.forEach(cl => {
		if (typeof cl === "string") {
			result.push(cl)
		} else if (Array.isArray(cl)) {
			const classes = classname.apply(null, [...cl])
			if (classes) {
				result.push(classes)
			}
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
