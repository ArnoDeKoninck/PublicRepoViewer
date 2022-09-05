import { Search } from "@mui/icons-material";
import { Avatar, Button, Card, CardContent, CardMedia, Grid, TextField, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import React from "react";
import UserCard from "../UserCard/UserCard";

export interface GithubUser {
	avatar_url: string;
	url: string;
	public_repos: number;
	name: string;
}

function UserRequest() {
	const [searchValue, setSearchValue] = React.useState<string>("");
	const [user, setUser] = React.useState<GithubUser>();
	const [error, setError] = React.useState<Error | AxiosError>();

	async function getUserFromGithub(user: string) {
		try {
			const formattedUser = user.toLowerCase();

			const response = await axios.get(`https://api.github.com/users/${formattedUser}`, { headers: { Accept: "application/json" } });
			setUser(response.data);
			return response.data;
		} catch (e: any) {
			setError(e);
			console.log(e);
		}
	}

	const handleKeypress = (e: React.KeyboardEvent) => {
		//it triggers by pressing the enter key
		if (e.code === "Enter") {
			getUserFromGithub(searchValue);
		}
	};

	return (
		<Card>
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
								<TextField placeholder="Github username" value={searchValue} onChange={(e) => setSearchValue(e.target.value.trim())} onKeyPress={handleKeypress} />
							</Grid>
							<Grid item xs={12}>
								<Button variant="contained" value="Search" type="button" endIcon={<Search />} onClick={() => getUserFromGithub(searchValue)}>
									Search
								</Button>
							</Grid>
							<Grid item>
								{!error && user && <UserCard user={user} size="small" />}
								{error && <Typography color="red">This user could not be found on Github.</Typography>}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}

export default UserRequest;
