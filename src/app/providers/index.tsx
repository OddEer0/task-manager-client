import { FC, PropsWithChildren } from "react"

import { Compose } from "@/shared/lib/helpers"

import { WithThemeProvider } from "./with-chakra"
import { WithReactQueryProvider } from "./with-react-query.tsx"

export const AppProvider: FC<PropsWithChildren> = ({ children }) => (
	<Compose providers={[WithReactQueryProvider, WithThemeProvider]}>{children}</Compose>
)
