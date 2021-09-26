export const API = {
	itproc: {
		get: process.env.NEXT_PUBLIC_DOMAIN + 'api/itprocall',
		post: process.env.NEXT_PUBLIC_DOMAIN + 'api/itproc',
		put: process.env.NEXT_PUBLIC_DOMAIN + 'api/itProcAll',
		id: process.env.NEXT_PUBLIC_DOMAIN + 'api/itproc/',
	},
	factor: {
		id: process.env.NEXT_PUBLIC_DOMAIN + 'api/factor/',
		get: process.env.NEXT_PUBLIC_DOMAIN + 'api/factorsAll',
		post: process.env.NEXT_PUBLIC_DOMAIN + 'api/factorsAll'
	},
	activity: {
		get: process.env.NEXT_PUBLIC_DOMAIN + 'api/activityAll',
		byFactor: process.env.NEXT_PUBLIC_DOMAIN + 'api/activitybyfactor/',
		post: process.env.NEXT_PUBLIC_DOMAIN + 'api/activityAll'
	},
	risk: {
		get: process.env.NEXT_PUBLIC_DOMAIN + 'api/riskall',
		byProcess: process.env.NEXT_PUBLIC_DOMAIN + 'api/riskbyprocess/',
		id: process.env.NEXT_PUBLIC_DOMAIN + 'api/risk/',
		post: process.env.NEXT_PUBLIC_DOMAIN + 'api/riskAll'
	},
	factorRisk: {
		get: process.env.NEXT_PUBLIC_DOMAIN + 'api/factorsRiskAll',
		id: process.env.NEXT_PUBLIC_DOMAIN + 'api/factorRisk/',
		byRisk: process.env.NEXT_PUBLIC_DOMAIN + 'api/factorRiskByRisk/',
		post: process.env.NEXT_PUBLIC_DOMAIN + 'api/factorsRiskAll'
	},
	reduction: {
		byfactorRisk: process.env.NEXT_PUBLIC_DOMAIN + 'api/reductionByFactorRisk/',
		post: process.env.NEXT_PUBLIC_DOMAIN + 'api/reductionAll'
	},
	calc: {
		get: process.env.NEXT_PUBLIC_DOMAIN + 'api/calcRes/'
	}
};