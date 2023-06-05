import "normalize.css"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import "@/app/styles/index.scss"

import { AppProvider } from "./providers"
import { router } from "./router"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<AppProvider>
		<RouterProvider router={router} />
	</AppProvider>,
)
