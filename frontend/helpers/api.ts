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
		get: process.env.NEXT_PUBLIC_DOMAIN + 'api/riskall',
		byProcess: process.env.NEXT_PUBLIC_DOMAIN + 'api/riskbyprocess/',
		id: process.env.NEXT_PUBLIC_DOMAIN + 'api/risk/',
		post: process.env.NEXT_PUBLIC_DOMAIN + 'api/risk'
	},
	factorRisk: {
		id: process.env.NEXT_PUBLIC_DOMAIN + 'api/factorRisk/',
		byRisk: process.env.NEXT_PUBLIC_DOMAIN + 'api/factorRiskByRisk/'
	},
	reduction: {
		byfactorRisk: process.env.NEXT_PUBLIC_DOMAIN + 'api/reductionByFactorRisk/'
	},
	calc: {
		get: process.env.NEXT_PUBLIC_DOMAIN + 'api/calcRes/'
	}
};