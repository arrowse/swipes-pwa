const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	theme: {
		fontFamily: {
			'sans': ['Inter', 'sans-serif'],
			'serif': ['Merriweather', 'serif'],
			'mono': ['"Fira Code"', 'monospace']
		}
	},


	plugins: [require('flowbite/plugin'), require('@catppuccin/tailwindcss')({
		prefix: 'ctp',
		defaultFlavour: 'mocha'
	})],
	darkMode: 'class'
};

module.exports = config;
