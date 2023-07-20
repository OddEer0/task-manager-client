import { guard } from "effector"

import { $tasksApi } from "./task.api.ts"

guard({
	source: $tasksApi.changePriority,
	filter: ({ priority }) => {
		return (
			priority === null ||
			priority === "extra" ||
			priority === "low" ||
			priority === "medium" ||
			priority === "high"
		)
	},
	target: $tasksApi.changePriority,
})
