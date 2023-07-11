import { render, screen } from "@testing-library/react"

import { UserHead } from "./UserHead.tsx"

describe("Testing component", () => {
	it("Should render component", () => {
		render(<UserHead src="" title="Marlen Karimov" />)
		expect(screen.getByText(/marlen karimov/i)).toBeInTheDocument()
	})

	it("Should have sub title text", () => {
		render(<UserHead src="" title="Marlen Karimov" subTitle="developer" />)
		expect(screen.getByText(/developer/i)).toBeInTheDocument()
	})

	it("Should have className", () => {
		render(
			<UserHead
				src=""
				title="Marlen Karimov"
				subTitle="developer"
				className="experiment"
				data-testid="wrapper"
			/>,
		)
		expect(screen.getByTestId("wrapper")).toHaveClass("experiment")
	})
})
