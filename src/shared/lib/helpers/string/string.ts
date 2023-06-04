export const firstLetterUpperCase = (string: string[], separator = " ") =>
	string.map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(separator)
