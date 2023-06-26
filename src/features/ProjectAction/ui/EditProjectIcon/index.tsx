import { FC } from "react"
import { SlOptionsVertical } from "react-icons/sl"

import styles from "./styles.module.scss"

interface EditProjectIconProps {
	id: string
}

export const EditProjectIcon: FC<EditProjectIconProps> = ({ id }) => {
	const clickHandle = () => {
		console.log(id)
	}

	return <SlOptionsVertical className={styles.icon} onClick={clickHandle} />
}
