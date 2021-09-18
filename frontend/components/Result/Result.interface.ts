export interface IResultForm {
	Summa: number;
}

export interface IResult extends Record<string, unknown> {
	ID: number;
	Name: string;
	Summa: string;
	CACTIVITY: number;
	StartRisk: string;
	FinalRisk: string;
	Cost: string;
	Economy: string;
}



export interface ItprocSentResponse {
	message: string;
}