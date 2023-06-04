import { ThemeConfig, extendTheme } from "@chakra-ui/react"

import { components } from "./components"
import { semanticTokens } from "./semantic"

const config: ThemeConfig = {
	initialColorMode: "system",
	useSystemColorMode: true,
}

export const theme = extendTheme({
	components,
	config,
	semanticTokens,
	styles: {},
})
