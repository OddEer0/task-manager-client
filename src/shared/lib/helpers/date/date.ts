import { firstLetterUpperCase } from "@/shared/lib"

export const getMonthDateAndWeekDay = (data: string, locale = "ru") => {
	const date = new Date(data)
	const weekday = date.toLocaleString(locale, { weekday: "short", day: "numeric", month: "short" })

	return firstLetterUpperCase([weekday])
}

export const getHour = (data: string) => {
	const date = new Date(data)
	const hour = date.toLocaleString("ru", { hour: "2-digit", minute: "2-digit" })

	return hour
}
