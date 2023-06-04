import { ChakraProvider } from "@chakra-ui/react"
import { FC, PropsWithChildren } from "react"

import { theme } from "../theme"

export const WithThemeProvider: FC<PropsWithChildren> = ({ children }) => (
	<ChakraProvider theme={theme}>{children}</ChakraProvider>
)
