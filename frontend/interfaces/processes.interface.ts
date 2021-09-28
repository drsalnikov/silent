export interface IProc extends Record<string, unknown> {
	ID: number;
	Name: string;
	RTO: number;
	Level: string;
}

export interface IProcEdit extends Record<string, unknown> {
	itproc: IProc
}

export interface IProcesses extends Record<string, unknown> {
	data: IProc[];
}

export interface IRisk extends Record<string, unknown> {
	ID: number;
	CITPROC: number;
	Name: string;
	Damage: string;
}

export interface IRisks extends Record<string, unknown> {
	itproc: IProc | undefined;
	dataRisks: IRisk[];
}

export interface IRiskEdit extends Record<string, unknown> {
	risk: IRisk
}

export interface IFactorRisks extends Record<string, unknown> {
	itproc: IProc | undefined;
	risk: IRisk | undefined;
	dataFactorRisks: IFactorRisk[];
}

export interface IFactorRisk extends Record<string, unknown> {
	ID: number;
	CFACTOR: number;
	CRISK: number;
	Name: string;
	Type: string;
	Set: number;
	Percent: number;
}

export interface IFactorRiskEdit extends Record<string, unknown> {
	factorrisk: IFactorRisk;
	dataFactors: IFactor[];
}

export interface IReduction extends Record<string, unknown> {
	ID: number;
	Name: string;
	Summa: string;
	NewPercent: string;
}

export interface IReductions extends Record<string, unknown> {
	itproc: IProc | undefined;
	risk: IRisk | undefined;
	factorrisk: IFactorRisk | undefined;
	dataReduction: IReduction[];
}

export interface IFactor extends Record<string, unknown> {
	ID: number;
	Name: string;
	Type: string;
}

export interface IFactorCard extends Record<string, unknown> {
	factor: IFactor;
	activities: IActivity[];
}

export interface IFactors extends Record<string, unknown> {
	dataFactors: IFactor[];
	risk: IRisk;
}

export interface IFactorsData extends Record<string, unknown> {
	dataFactors: IFactor[];
}

export interface IActivities extends Record<string, unknown> {
	data: IActivity[];
}

export interface IActivity extends Record<string, unknown> {
	ID: number;
	Name: string;
	Summa: string;
	IsActive: boolean;
}
