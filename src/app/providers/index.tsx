import { FC, PropsWithChildren } from "react"

import { Compose } from "@/shared/lib/helpers"
import { ConfirmProvider } from "@/shared/package/react-confirm"

import { WithThemeProvider } from "./with-chakra"

export const AppProvider: FC<PropsWithChildren> = ({ children }) => (
	<Compose providers={[WithThemeProvider, ConfirmProvider]}>{children}</Compose>
)
