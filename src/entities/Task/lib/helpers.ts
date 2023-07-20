import { PriorityVariant } from "@/shared/api"

import {
	PRIORITY_DEFAULT_COLOR,
	PRIORITY_EXTRA_COLOR,
	PRIORITY_HIGH_COLOR,
	PRIORITY_LOW_COLOR,
	PRIORITY_MEDIUM_COLOR,
} from "./constants"

export const getPriorityColor = (priority: PriorityVariant | null) => {
	switch (priority) {
		case "low":
			return PRIORITY_LOW_COLOR
		case "medium":
			return PRIORITY_MEDIUM_COLOR
		case "high":
			return PRIORITY_HIGH_COLOR
		case "extra":
			return PRIORITY_EXTRA_COLOR
		default:
			return PRIORITY_DEFAULT_COLOR
	}
}
