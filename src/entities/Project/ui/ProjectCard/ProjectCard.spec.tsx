import { screen } from "@testing-library/react"

import { ProjectCard } from "@/entities/Project"

import { mockProjects } from "@/shared/api"
import { renderWithRouter } from "@/shared/test"

describe("ProjectCard component testing", () => {
	const testId = "test-id"
	const testClassName = "test-classname"

	it("Should render component", () => {
		renderWithRouter(<ProjectCard project={mockProjects[0]} />)
		expect(screen.getByText(mockProjects[0].name)).toBeInTheDocument()
	})

	it("Should add classname and other attr", () => {
		renderWithRouter(
			<ProjectCard
				project={mockProjects[0]}
				data-testid={testId}
				className={testClassName}
				title="title"
			/>,
		)
		expect(screen.getByTestId(testId)).toBeInTheDocument()
		expect(screen.getByTestId(testId)).toHaveClass(testClassName)
		expect(screen.getByTestId(testId)).toHaveAttribute("title")
	})

	it("Should render setting props component", () => {
		renderWithRouter(
			<ProjectCard project={mockProjects[0]} setting={<p>setting component</p>} />,
		)
		expect(screen.getByText(/setting component/i)).toBeInTheDocument()
	})
})
