import { inputAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

export const ChakraInput = defineMultiStyleConfig({
	variants: {
		outline: {
			field: {
				color: "inherit",
				_focus: {
					borderColor: "primary.500",
					boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)",
				},
			},
		},
	},
})
