import { createBrowserRouter } from "react-router-dom"

import MainLayout from "./layout"
import { mainLoader } from "./loader"
import { HomePage } from "@/pages/Home"
import { LoginPage } from "@/pages/Login"
import { RegistrationPage } from "@/pages/Registration"

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
			{
				path: "/auth/login",
				element: <LoginPage />,
			},
			{
				path: "/auth/registration",
				element: <RegistrationPage />,
			},
		],
	},
])
