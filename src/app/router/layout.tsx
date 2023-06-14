import { FC } from "react"
import { Navigate, Outlet, useLoaderData } from "react-router-dom"

import { IMainLoader } from "./loader"

const MainLayout: FC = () => {
	const data = useLoaderData() as IMainLoader

	if (!data.user) {
		return <Navigate to="/auth/login" replace={true} />
	}

	return <Outlet />
}

export default MainLayout
