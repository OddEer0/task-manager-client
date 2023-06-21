import { FC } from "react"
import { Outlet } from "react-router-dom"

import { MainLayout } from "@/widgets/MainLayout"

const RootLayout: FC = () => {
	return (
		<MainLayout>
			<Outlet />
		</MainLayout>
	)
}

export default RootLayout
