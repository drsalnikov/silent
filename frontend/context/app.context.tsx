import { createContext, PropsWithChildren, useState } from 'react';


export interface IAppContext {
	resultTable: string;
	setResult?: (value: string) => void;
}

export const AppContext = createContext<IAppContext>({ resultTable: "" });

export const AppContextProvider = ({ resultTable, children }: PropsWithChildren<IAppContext>): JSX.Element => {

	const [resultState, setResultState] = useState<string>(resultTable);

	const setResult = (value: string) => {
		setResultState(value);
	};

	return <AppContext.Provider value={{ resultTable: resultState, setResult }}>
		{children}
	</AppContext.Provider>;
};