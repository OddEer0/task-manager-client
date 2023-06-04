import { ComponentStyleConfig } from "@chakra-ui/react"

export const ChakraButton: ComponentStyleConfig = {
	defaultProps: { variant: "solid", colorScheme: "primary" },
	variants: {
		solid: {
			color: "primaryText",
		},
	},
}
