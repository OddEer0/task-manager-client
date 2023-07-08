import { screen } from "@testing-library/react"
import { fork } from "effector"
import { Provider } from "effector-react"
import { FC } from "react"

import { ProjectCardList } from "@/entities/Project"

import { $projects, mockProjects } from "@/shared/api"
import { renderWithRouter } from "@/shared/test"

const FakeEditComp: FC<{ id: string }> = ({ id }) => <p>{id}</p>

describe("ProjectCardList component testing", () => {
	it("Should render component", () => {
		const scope = fork({
			values: new Map([[$projects, mockProjects]]),
		})
		renderWithRouter(
			<Provider value={scope}>
				<ProjectCardList edit={FakeEditComp} />
			</Provider>,
		)
		expect(screen.getByText(mockProjects[0].id)).toBeInTheDocument()
	})
})
