import { createBrowserRouter } from "react-router-dom"

import RootLayout from "./layout"
import { HomePage } from "@/pages/Home"
import { TasksPage } from "@/pages/Tasks"
import { TasksSpacePage } from "@/pages/TasksSpace"

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
			{
				path: "/task/:id",
				element: <TasksSpacePage />,
			},
		],
	},
])
