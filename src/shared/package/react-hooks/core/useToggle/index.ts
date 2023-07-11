import { useCallback, useRef, useState } from "react"

export const useToggle = (
	init = false,
	throttleTimeMs = 0,
	toTrueCallback: (() => void) | null = null,
	toFalseCallback: (() => void) | null = null,
) => {
	const [state, setState] = useState(init)
	const delay = useRef(true)

	const toggle = useCallback(() => {
		if (delay.current) {
			if (state) {
				setState(false)
				toFalseCallback && toFalseCallback()
			} else {
				setState(true)
				toTrueCallback && toTrueCallback()
			}
			delay.current = false
			setTimeout(() => (delay.current = true), throttleTimeMs)
		}
	}, [])

	return {
		state,
		toggle,
	}
}
