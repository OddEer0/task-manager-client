import { BsGearFill } from "react-icons/bs"
import { FaHome, FaTasks } from "react-icons/fa"

export const ASIDE_OPEN_WIDTH = 360
export const ASIDE_CLOSE_WIDTH = 50

export const NAV_LIST = [
	{ id: 1, to: "/", title: "Главная", Icon: FaHome },
	{ id: 2, to: "/task", title: "Таски", Icon: FaTasks },
	{ id: 3, to: "/settings", title: "Настройки", Icon: BsGearFill },
]
