import { StateCreator, create } from "zustand"
import { devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

export const createStore = <T = unknown>(
	state: StateCreator<T, [["zustand/immer", never]], []>,
) => {
	return create<T>()(devtools(immer(state)))
}
