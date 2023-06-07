import { createBrowserRouter } from "react-router-dom"

import MainLayout from "./layout"
import { mainLoader } from "./loader"
import { HomePage } from "@/pages/Home"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		loader: mainLoader,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
		],
	},
])
