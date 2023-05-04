module.exports = {
	load: {
		before: ['timer', 'responseTime', 'logger', 'cors', 'responses', 'gzip'],
		order: [],
		after: ['parser', 'router'],
	},
	settings: {
		timer: {
			enabled: true,
		},
		cors: {
			enabled: true,
			origin: ['*'],
		},
	},
};
