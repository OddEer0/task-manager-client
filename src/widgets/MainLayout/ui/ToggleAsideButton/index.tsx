import { FC, useContext } from "react"
import { CiMenuBurger } from "react-icons/ci"

import { LayoutContext } from "../Layout/layout.provider.tsx"

import styles from "./styles.module.scss"

export const ToggleAsideButton: FC = () => {
	const { toggleHandler } = useContext(LayoutContext)

	return (
		<button className={styles.btn} onClick={toggleHandler}>
			<CiMenuBurger />
		</button>
	)
}
