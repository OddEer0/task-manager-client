import { HTMLMotionProps, MotionValue, motion } from "framer-motion"
import { FC } from "react"

import { NavList } from "../NavList"
import { ToggleAsideButton } from "../ToggleAsideButton"

import styles from "./styles.module.scss"

interface MainAsideProps extends HTMLMotionProps<"div"> {
	motionValue: MotionValue<number>
}

export const MainAside: FC<MainAsideProps> = ({ motionValue, ...props }) => {
	return (
		<motion.aside layout layoutRoot {...props} className={styles.aside}>
			<div className={styles.head}>
				<ToggleAsideButton />
			</div>
			<div className={styles.body}>
				<NavList />
			</div>
			<div className={styles.footer}></div>
		</motion.aside>
	)
}
