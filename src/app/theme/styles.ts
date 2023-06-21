import { GlobalStyleProps, Styles, mode } from "@chakra-ui/theme-tools"

export const styles: Styles = {
	global: (props: GlobalStyleProps) => ({
		body: {
			color: mode("color.50", "color.50")(props),
			background: mode("bg.100", "bg.100")(props),
		},
	}),
}
