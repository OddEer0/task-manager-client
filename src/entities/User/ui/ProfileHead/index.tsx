import { useStore } from "effector-react"
import { FC } from "react"

import { $profile } from "@/entities/User"

import { UserHead } from "@/shared/ui"

export const ProfileHead: FC = () => {
	const profile = useStore($profile)

	return profile ? <UserHead src={profile.avatar} title={profile.fullName} /> : null
}
