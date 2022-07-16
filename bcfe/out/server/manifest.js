export const manifest = {
	appDir: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"start-53daf9cd.js","js":["start-53daf9cd.js","chunks/index-c3650d4a.js"],"css":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'endpoint',
				id: "api/test",
				pattern: /^\/api\/test\/?$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/api/test.ts.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
