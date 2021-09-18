export interface IProc extends Record<string, unknown> {
	ID: number;
	Name: string;
	RTO: number;
	Level: string;
}

export interface IRisk extends Record<string, unknown> {
	ID: number;
	CITPROC: number;
	Name: string;
	Damage: string;
}

export interface IRisks extends Record<string, unknown> {
	process: IProc | undefined;
	dataRisks: IRisk[];
}

export interface IFactorRisks extends Record<string, unknown> {
	process: IProc | undefined;
	risk: IRisk | undefined;
	dataFactorRisks: IFactorRisk[];
}

export interface IFactorRisk extends Record<string, unknown> {
	ID: number;
	CFACTOR: number;
	CRISK: number;
	Name: string;
	Type: string;
	Set: string;
	Percent: number;
}

export interface IReduction extends Record<string, unknown> {
	ID: number;
	Name: string;
	NewPercent: number;
}

export interface IProcesses extends Record<string, unknown> {
	data: IProc[];
}

export interface IFactor extends Record<string, unknown> {
	ID: number;
	Name: string;
	Type: string;
}

export interface IFactors extends Record<string, unknown> {
	data: IFactor[];
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
