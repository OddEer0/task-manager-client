import { FC, PropsWithChildren } from "react"

import { Compose } from "@/shared/lib/helpers"

import { WithApolloProvider } from "./with-apollo"
import { WithThemeProvider } from "./with-chakra"

export const AppProvider: FC<PropsWithChildren> = ({ children }) => (
	<Compose providers={[WithApolloProvider, WithThemeProvider]}>{children}</Compose>
)
