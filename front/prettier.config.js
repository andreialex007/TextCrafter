export default {
	plugins: ['prettier-plugin-tailwindcss'],
	tailwindConfig: './tailwind.config.js',
	singleQuote: true,
	bracketSpacing: true,
	jsxBracketSameLine: false,
	printWidth: 90,
	tabWidth: 2,
	useTabs: true,
	overrides: [
		{
			files: ['*.yml'],
			options: {
				singleQuote: false,
			},
		},
	],
};
