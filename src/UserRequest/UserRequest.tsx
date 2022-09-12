import { Search } from "@mui/icons-material";
import { Button, Card, CardContent, CardMedia, Grid, TextField, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import React from "react";
import UserCard from "../UserCard/UserCard";
import UserContext from "../UserContext";

export interface GithubUser {
	avatar_url: string;
	html_url: string;
	public_repos: number;
	name: string;
}

//Calls Github API to fetch user profiles.
function UserRequest() {
	const [searchValue, setSearchValue] = React.useState<string>("");
	const [error, setError] = React.useState<Error | AxiosError | undefined>();
	const { user, setUser } = React.useContext(UserContext);

	async function getUserFromGithub(user: string) {
		try {
			const formattedUser = user.toLowerCase();
			const response = await axios.get(`https://api.github.com/users/${formattedUser}`, { headers: { Accept: "application/json" } });

			setUser(response.data);

			return response.data;
		} catch (e: any) {
			setError(e);
			setUser(null);
			console.log(e);
		}
	}

	const handleKeypress = (e: React.KeyboardEvent) => {
		//Makes it so pressing Enter also triggers the API call.
		if (e.code === "Enter") {
			getUserFromGithub(searchValue);
			setSearchValue("");
		}
	};

	return (
		<Grid container justifyContent="center" alignItems="center" width="50vw">
			<Grid item xs={6}>
				<Card sx={{ height: "50vh" }}>
					<CardContent>
						<Grid container justifyContent="center" alignItems="center" rowGap={1}>
							<CardMedia image="Github-Mark.svg" component="svg" width="5em" height="5em" />
							<Grid item xs={12}>
								<Typography>Uses Github REST API</Typography>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2} justifyContent="center" alignItems="center">
									<Grid item>
										<Typography>Username:</Typography>
									</Grid>
									<Grid item>
										<TextField
											placeholder="Github username"
											value={searchValue}
											onChange={(e) => {
												setError(undefined);
												setSearchValue(e.target.value.trim());
											}}
											onKeyPress={handleKeypress}
										/>
									</Grid>
									<Grid item xs={12}>
										<Button variant="contained" value="Search" type="button" endIcon={<Search />} onClick={() => getUserFromGithub(searchValue)}>
											Search
										</Button>
									</Grid>
									<Grid item>
										<>
											{!error && user && <UserCard user={user} size="small" />}
											{error && <Typography color="red">This user could not be found on Github.</Typography>}
										</>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
}

export default UserRequest;
