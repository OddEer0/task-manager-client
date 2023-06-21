import { HTMLMotionProps, motion } from "framer-motion"
import { FC } from "react"

import styles from "./styles.module.scss"

type HeaderProps = HTMLMotionProps<"div">

export const Header: FC<HeaderProps> = ({ ...props }) => {
	return (
		<motion.header className={styles.header} {...props}>
			<div className=""></div>
		</motion.header>
	)
}
