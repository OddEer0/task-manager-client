import { Avatar } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { FC } from "react"

import { classname } from "@/shared/package/classname"

import { UserHeadProps } from "./UserHead.types"
import styles from "./styles.module.scss"

export const UserHead: FC<UserHeadProps> = ({ title, subTitle, src, className, ...props }) => {
	const clName = classname(styles.wrapper, className)

	return (
		<motion.div className={clName} {...props}>
			<Avatar name={title} src={src} />
			<div className={styles.content}>
				<h5>{title}</h5>
				{subTitle && <p className={styles.subTitle}>{subTitle}</p>}
			</div>
		</motion.div>
	)
}
