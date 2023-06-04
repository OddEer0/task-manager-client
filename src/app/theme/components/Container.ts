import { ComponentStyleConfig, defineStyle } from "@chakra-ui/react"

export const ChakraContainer: ComponentStyleConfig = {
	sizes: {
		sm: defineStyle({
			maxW: "45ch",
		}),
		md: defineStyle({
			maxW: "1440px",
		}),
		lg: defineStyle({
			maxW: "75ch",
		}),
	},
	defaultProps: {
		size: "md",
	},
	baseStyle: {
		height: "100%",
		padding: "0",
	},
}
