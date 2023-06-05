import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
	schema: "http://localhost:5000/graphql",
	documents: "src/**/*.{tsx,ts}",
	ignoreNoDocuments: true,
	generates: {
		"src/shared/api/typing/": {
			preset: "client",
			plugins: [],
		},
	},
}

export default config
