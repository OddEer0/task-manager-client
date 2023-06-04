module.exports = {
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: { ecmaVersion: "latest", sourceType: "module" },
	plugins: ["react-refresh"],
	rules: {
		"react-refresh/only-export-components": "warn",
		"linebreak-style": ["error", "unix"],
		"no-return-assign": "off",
		semi: ["off", "never"],
		quotes: ["warn", "double"],
		indent: "off",
		"no-tabs": "off",
		"import/prefer-default-export": "off",
		"arrow-parens": ["error", "as-needed"],
		"no-underscore-dangle": "off",
		"class-methods-use-this": "off",
		"prefer-destructuring": "off",
		"@typescript-eslint/indent": "off",
		"@typescript-eslint/comma-dangle": "off",
		"@typescript-eslint/lines-between-class-members": "off",
		"no-var": "error",
		"react-hooks/exhaustive-deps": "off",
		"no-undef": "off",
		"no-unused-vars": "off",
		"no-redeclare": "off",
		"import/extensions": [
			"error",
			"ignorePackages",
			{
				js: "never",
				jsx: "never",
				ts: "never",
				tsx: "never",
			},
		],
		"object-curly-newline": "off",
		"no-shadow": "off",
		"react/jsx-indent": "off",
		"consistent-return": "off",
		"react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
		"react/function-component-definition": "off",
		"import/no-extraneous-dependencies": "off",
		"import/no-unresolved": "off",
		"react/react-in-jsx-scope": "off",
		"import/extensions": "off",
		"react/jsx-filename-extension": "off",
	},
}
