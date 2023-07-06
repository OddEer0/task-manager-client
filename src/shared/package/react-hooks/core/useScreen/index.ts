import { useState } from "react"

import { useIsomorphicLayoutEffect } from "../../utility"
import useEventListener from "../useEventListener"

export const useScreen = () => {
	const getScreen = () => {
		if (typeof window !== "undefined" && window.screen) {
			return window.screen
		}
		return undefined
	}

	const [screen, setScreen] = useState<Screen | undefined>(getScreen())

	function handleSize() {
		setScreen(getScreen())
	}

	useEventListener("resize", handleSize)

	useIsomorphicLayoutEffect(() => {
		handleSize()
	}, [])

	return screen
}
