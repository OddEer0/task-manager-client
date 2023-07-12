import { render, screen } from "@testing-library/react"

import { TagList } from "@/entities/Tag"

import { mockTags } from "@/shared/api"

describe("TagList component testing", () => {
	it("Should render component", () => {
		render(<TagList tags={mockTags} />)
		expect(screen.getByText(mockTags[0].name)).toBeInTheDocument()
	})
})
