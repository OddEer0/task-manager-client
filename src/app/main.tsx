import ReactDOM from "react-dom/client"

import { App } from "./App.tsx"
import { AppProvider } from "./providers/index.tsx"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<AppProvider>
		<App />
	</AppProvider>,
)
