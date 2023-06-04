import { useCallback, useRef } from "react"

export const useDebounce = (callback: () => void, delay: number) => {
	const timeout = useRef<any>(null)

	return useCallback(() => {
		if (timeout.current) {
			clearTimeout(timeout.current)
		}
		timeout.current = setTimeout(callback, delay)
	}, [callback, delay])
}
