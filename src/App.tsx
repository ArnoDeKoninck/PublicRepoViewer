import "./App.css";
import UserRequest from "./UserRequest/UserRequest";
import { Collapse, Fade, Grid, Grow, Typography } from "@mui/material";

import { createContext, Dispatch, SetStateAction } from "react";
import React from "react";

export enum steps {
	INITIAL = "initial",
	SEARCHING = "searching",
	FOUND = "found",
	EXPANDED = "expanded",
	DETAILS = "details",
}

export type StepContextType = {
	step: string;
	setStep: Dispatch<SetStateAction<string>>;
};

export const StepContext = createContext<StepContextType | undefined>(undefined);

function App() {
	const [step, setStep] = React.useState<string>(steps.INITIAL);
	const value: StepContextType = { step, setStep };
	return (
		<div className="App">
			<Grid container className="App-header">
				<Grid item xs={12}>
					<Typography variant="h4">View your public github repositories and their commits.</Typography>
				</Grid>
				<Grid item>
					<Grid container justifyContent={"center"} spacing={2}>
						<StepContext.Provider value={value}>
							<Grid item xs={step === steps.INITIAL ? 6 : 2}>
								<UserRequest />
							</Grid>

							<Grow in={step === steps.EXPANDED}>
								<Grid item xs={8}>
									<UserRequest />
								</Grid>
							</Grow>
						</StepContext.Provider>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default App;
