export const concatNumber = (numbers: number[], separator = ",") => {
	if (numbers.length) {
		return numbers.map(num => num.toString()).join(separator)
	}
	return ""
}
