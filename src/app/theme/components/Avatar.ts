import { avatarAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
	avatarAnatomy.keys,
)

const baseStyle = definePartsStyle({
	label: {
		color: "#0D062D",

		_dark: {
			color: "#ffffff",
		},
	},
})

export const ChakraAvatar = defineMultiStyleConfig({
	baseStyle,
})
