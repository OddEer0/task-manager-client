import { FC } from "react"

import { UserHead } from "@/shared/ui"

import { profileHeadSelector, useProfileStore } from "../../model"

export const ProfileHead: FC = () => {
	const profile = useProfileStore(profileHeadSelector)

	return profile ? <UserHead src={profile.avatar} title={profile.fullName} /> : null
}
