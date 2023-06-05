import { createBrowserRouter } from "react-router-dom"

import MainLayout from "./layout"
import { HomePage } from "@/pages/Home"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
		],
	},
])
