export default {
	plugins: ['prettier-plugin-tailwindcss'],
	tailwindConfig: './tailwind.config.js',
	singleQuote: true,
	bracketSpacing: true,
	jsxBracketSameLine: false,
	tailwindPreserveWhitespace: true,
	printWidth: 90,
	tabWidth: 1,
	useTabs: false,
	overrides: [
		{
			files: ['*.yml'],
			options: {
				singleQuote: false,
			},
		},
	],
};
