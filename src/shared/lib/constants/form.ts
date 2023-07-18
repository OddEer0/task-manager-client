export const FORM = {
	required: "Поле не должно быть пустым",
	minLength: (value: number) => ({
		value: value,
		message: `Не менее ${value} символов`,
	}),
	maxLength: (value: number) => ({ value: value, message: `Не более ${value} символов` }),
}
