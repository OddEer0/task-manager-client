import { animate, motion, useMotionValue } from "framer-motion"
import { FC, PropsWithChildren } from "react"

import {
	ASIDE_CLOSE_WIDTH,
	ASIDE_OPEN_WIDTH,
	MAIN_CLOSE_X,
	MAIN_OPEN_X,
} from "@/widgets/MainLayout/lib.ts"

import { Container } from "@/shared/ui"

import { MainAside } from "../Aside"

import { LayoutProvider } from "./layout.provider.tsx"
import styles from "./styles.module.scss"

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	const motionXValue = useMotionValue(0)
	const motionWidthValue = useMotionValue(ASIDE_CLOSE_WIDTH)

	const openHandle = () => {
		animate(motionWidthValue, ASIDE_OPEN_WIDTH)
		animate(motionXValue, MAIN_OPEN_X)
	}

	const closeHandle = () => {
		animate(motionWidthValue, ASIDE_CLOSE_WIDTH)
		animate(motionXValue, MAIN_CLOSE_X)
	}

	return (
		<LayoutProvider closeHandle={closeHandle} openHandle={openHandle}>
			<Container maxWidth="1440px" className={styles.container}>
				<motion.aside className={styles.aside} style={{ width: motionWidthValue }}>
					<MainAside />
				</motion.aside>
				<motion.main style={{ x: motionXValue }}>{children}</motion.main>
			</Container>
		</LayoutProvider>
	)
}
