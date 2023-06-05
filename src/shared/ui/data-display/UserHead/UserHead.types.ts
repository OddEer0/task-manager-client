import { HTMLMotionProps } from "framer-motion"

export interface UserHeadProps extends HTMLMotionProps<"div"> {
	src: string
	title: string
	subTitle?: string
}
