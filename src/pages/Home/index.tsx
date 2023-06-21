import { useColorMode } from "@chakra-ui/react"
import { FC } from "react"

import { Button, Input, Progress, Switch, UserHead } from "@/shared/ui"

export const HomePage: FC = () => {
	const { toggleColorMode } = useColorMode()

	return (
		<>
			<div className="" />
			<Button onClick={toggleColorMode}>Button</Button>
			<Progress size="md" value={50} />
			<Switch />
			<Input />
			<UserHead src="" title="Marlen Karimov" subTitle="Kyrgyzstan" />
			<UserHead src="" title="Karimov Marlen" subTitle="Kyrgyzstan" />
		</>
	)
}
