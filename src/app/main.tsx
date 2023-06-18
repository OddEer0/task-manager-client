// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { attachLogger } from "effector-logger"
import "normalize.css"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import "@/app/styles/index.scss"

import { AppProvider } from "./providers"
import { router } from "./router"

attachLogger()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<AppProvider>
		<RouterProvider router={router} />
	</AppProvider>,
)
