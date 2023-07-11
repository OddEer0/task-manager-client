import { render, screen } from "@testing-library/react"
import { FC, PropsWithChildren } from "react"

import { Compose } from "@/shared/lib"

const ProviderComponent: FC<PropsWithChildren> = ({ children }) => (
	<div>
		<p>provider text</p>
		{children}
	</div>
)

describe("Compose component testing", () => {
	const text = "provider text"
	it("Should render component", () => {
		render(<Compose providers={[]}>render</Compose>)
		expect(screen.getByText(/render/i)).toBeInTheDocument()
	})

	it("Should render provider components", () => {
		render(<Compose providers={[ProviderComponent]}>render</Compose>)
		expect(screen.getByText(text)).toBeInTheDocument()
	})
})
