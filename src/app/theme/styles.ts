import { GlobalStyleProps, Styles, mode } from "@chakra-ui/theme-tools"

export const styles: Styles = {
	global: (props: GlobalStyleProps) => ({
		body: { color: mode("#0D062D", "#ffffff")(props) },
	}),
}
