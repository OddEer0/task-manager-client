import { animate, motion, useMotionValue } from "framer-motion"
import { FC, PropsWithChildren } from "react"

import { Container } from "@/shared/ui"

import { ASIDE_CLOSE_WIDTH, ASIDE_OPEN_WIDTH } from "../../lib.ts"
import { MainAside } from "../Aside"
import { Header } from "../Header"

import { LayoutProvider } from "./layout.provider.tsx"
import styles from "./styles.module.scss"

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	const motionWidthValue = useMotionValue(ASIDE_CLOSE_WIDTH)

	const openHandle = () => {
		animate(motionWidthValue, ASIDE_OPEN_WIDTH)
	}

	const closeHandle = () => {
		animate(motionWidthValue, ASIDE_CLOSE_WIDTH)
	}

	return (
		<LayoutProvider closeHandle={closeHandle} openHandle={openHandle}>
			<Container maxWidth="1440px" className={styles.container}>
				<MainAside style={{ width: motionWidthValue }} motionValue={motionWidthValue} />
				<motion.div className={styles.wrapper}>
					<Header />
					<motion.main>{children}</motion.main>
				</motion.div>
			</Container>
		</LayoutProvider>
	)
}
