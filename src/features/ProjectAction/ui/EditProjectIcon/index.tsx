import { FC } from "react"
import { SlOptionsVertical } from "react-icons/sl"

interface EditProjectIconProps {
	id: string
}

export const EditProjectIcon: FC<EditProjectIconProps> = ({ id }) => {
	const clickHandle = () => {
		console.log(id)
	}

	return <SlOptionsVertical onClick={clickHandle} />
}
