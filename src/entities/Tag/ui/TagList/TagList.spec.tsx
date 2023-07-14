import { render, screen } from "@testing-library/react"
import { FC } from "react"

import { TagList } from "@/entities/Tag"

import { mockTags } from "@/shared/api"

const FakeOptionComponent: FC<{ id: string }> = ({ id }) => <p>{id}</p>

describe("TagList component testing", () => {
	it("Should render component", () => {
		render(<TagList tags={mockTags} tagOptions={FakeOptionComponent} />)
		expect(screen.getByText(mockTags[0].name)).toBeInTheDocument()
	})
})
