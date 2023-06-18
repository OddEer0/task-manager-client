import { HTMLMotionProps } from "framer-motion"

export interface UserHeadProps extends HTMLMotionProps<"div"> {
	src: string | null
	title: string
	subTitle?: string
}
