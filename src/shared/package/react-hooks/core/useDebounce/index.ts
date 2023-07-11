import { useCallback, useRef } from "react"

export const useDebounce = (callback: () => void, delay: number) => {
	const timeout = useRef<NodeJS.Timeout>()

	return useCallback(() => {
		if (timeout.current) {
			clearTimeout(timeout.current)
		}
		timeout.current = setTimeout(callback, delay)
	}, [callback, delay])
}
