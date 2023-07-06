import { DependencyList, EffectCallback, useEffect } from "react"

import { useIsFirstRender } from "../../utility"

export const useUpdateEffect = (effect: EffectCallback, deps?: DependencyList) => {
	const isFirst = useIsFirstRender()

	useEffect(() => {
		if (!isFirst) {
			return effect()
		}
	}, deps)
}
