import { render, screen } from "@testing-library/react"
import { FC } from "react"

import { TagList } from "@/entities/Tag"

import { mockTags, mockTasks } from "@/shared/api"

const FakeOptionComponent: FC<{ id: string }> = ({ id }) => <p>{id}</p>
const FakeRemoveComponent: FC<{ taskId: string; tagId: string }> = ({
	tagId,
	taskId,
}) => (
	<div>
		{taskId} and {tagId}
	</div>
)

describe("TagList component testing", () => {
	it("Should render component and tag option components", () => {
		render(
			<TagList
				tags={mockTags}
				tagOptions={FakeOptionComponent}
				taskId={mockTasks[0].id}
				tagRemove={FakeRemoveComponent}
			/>,
		)
		expect(screen.getByText(mockTags[0].name)).toBeInTheDocument()
	})
})
