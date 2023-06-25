import { FC, PropsWithChildren } from "react"

import { Compose } from "@/shared/lib/helpers"

import { WithThemeProvider } from "./with-chakra"

export const AppProvider: FC<PropsWithChildren> = ({ children }) => (
	<Compose providers={[WithThemeProvider]}>{children}</Compose>
)
