import { createBrowserRouter } from "react-router-dom"

import RootLayout from "./layout"
import { HomePage } from "@/pages/Home"
import { TasksPage } from "@/pages/Tasks"

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
				element: <TasksPage />,
			},
			{
				path: "/settings",
				element: <HomePage />,
			},
		],
	},
])
