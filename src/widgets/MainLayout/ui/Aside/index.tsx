import { HTMLMotionProps } from "framer-motion"
import { motion } from "framer-motion"
import { FC, useContext } from "react"

import { LayoutContext } from "@/widgets/MainLayout/ui/Layout/layout.provider.tsx"

import styles from "./styles.module.scss"

type MainAsideProps = HTMLMotionProps<"div">

export const MainAside: FC<MainAsideProps> = (...props) => {
	const { isOpen, openHandler, closeHandler } = useContext(LayoutContext)

	const toggleHandle = () => {
		isOpen ? closeHandler() : openHandler()
	}

	return (
		<motion.aside className={styles.aside} {...props}>
			<div className="" onClick={toggleHandle}>
				B
			</div>
		</motion.aside>
	)
}
