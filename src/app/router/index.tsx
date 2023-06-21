import { createBrowserRouter } from "react-router-dom"

import RootLayout from "./layout"
import { HomePage } from "@/pages/Home"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/task",
				element: <HomePage />,
			},
			{
				path: "/settings",
				element: <HomePage />,
			},
		],
	},
])
