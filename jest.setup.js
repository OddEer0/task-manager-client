import matchers from "@testing-library/jest-dom/matchers"
import { cleanup } from "@testing-library/react"
import { vi } from "vitest"
import { afterEach, expect } from "vitest"

expect.extend(matchers)

global.jest = vi

afterEach(() => {
	cleanup()
})
