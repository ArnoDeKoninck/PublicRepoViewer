import "./App.css";
import UserRequest from "./UserRequest/UserRequest";
import { Grid, Typography } from "@mui/material";

//Home page
function App() {
	return (
		<Grid container className="App-header" justifyContent={"center"} alignItems="center" spacing={2}>
			<Grid item>
				<Typography sx={{ marginBottom: "1rem" }} variant="h4">
					View your public github repositories and their commits.
				</Typography>
				<UserRequest />
			</Grid>
		</Grid>
	);
}

export default App;
