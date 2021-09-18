export const API = {
	itproc: {
		get: process.env.NEXT_PUBLIC_DOMAIN + 'api/itprocall',
		post: process.env.NEXT_PUBLIC_DOMAIN + 'api/itprocall',
		id: process.env.NEXT_PUBLIC_DOMAIN + 'api/itproc/',
	},
	factor: {
		get: process.env.NEXT_PUBLIC_DOMAIN + 'api/factorsAll'
	},
	activity: {
		get: process.env.NEXT_PUBLIC_DOMAIN + 'api/activityAll'
	},
	risk: {
		byProcess: process.env.NEXT_PUBLIC_DOMAIN + 'api/riskbyprocess/',
		id: process.env.NEXT_PUBLIC_DOMAIN + 'api/risk/',
	},
	factorRisk: {
		byRisk: process.env.NEXT_PUBLIC_DOMAIN + 'api/factorRiskByRisk/'
	},
};