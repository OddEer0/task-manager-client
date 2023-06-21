import { LayoutGroup, motion } from "framer-motion"
import { FC } from "react"
import { Link, useLocation } from "react-router-dom"

import { NAV_LIST } from "../../lib.ts"

import styles from "./styles.module.scss"

export const NavList: FC = () => {
	const { pathname } = useLocation()

	return (
		<LayoutGroup>
			<nav className={styles.nav}>
				<ul className={styles.list}>
					{NAV_LIST.map(li => (
						<li key={li.id}>
							<Link to={li.to} className={styles.item}>
								<span className={styles.icon}>
									<li.Icon />
								</span>
								<span className={styles.text}>{li.title}</span>
								{pathname === li.to && (
									<motion.span className={styles.thumb} layoutId="aside-thumb" />
								)}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</LayoutGroup>
	)
}
