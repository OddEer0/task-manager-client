import { FC } from "react"
import { Outlet, useLoaderData } from "react-router-dom"

const MainLayout: FC = () => {
	const data = useLoaderData()

	console.log(data)

	return <Outlet />
}

export default MainLayout
