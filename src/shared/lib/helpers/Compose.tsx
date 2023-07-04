import { FC, JSXElementConstructor, PropsWithChildren } from "react"

interface ComposeChildren {
	providers: Array<JSXElementConstructor<PropsWithChildren<unknown>>>
}

export const Compose: FC<PropsWithChildren<ComposeChildren>> = ({
	children,
	providers,
}) => {
	return (
		<>
			{providers.reduceRight(
				(acc, Comp) => (
					<Comp>{acc}</Comp>
				),
				children,
			)}
		</>
	)
}
