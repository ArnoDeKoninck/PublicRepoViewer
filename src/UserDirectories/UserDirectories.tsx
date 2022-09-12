import { GitHub, Star, StarOutline } from "@mui/icons-material";
import { Grid, Card, CardContent, Typography, Link, Grow, IconButton } from "@mui/material";
import axios, { AxiosError } from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "../UserCard/UserCard";
import UserContext from "../UserContext";
import { GithubUser } from "../UserRequest/UserRequest";

interface Directory {
	id: number;
	name: string;
	html_url: string;
	description: string;
	url: string;
	commits_url: string;
}

//Fetches an existing user's public repos from the Github API and lists them on the screen.
function UserDirectories() {
	const [error, setError] = React.useState<Error | AxiosError>();
	const [directories, setDirectories] = React.useState<Directory[]>();
	const [favouriteIds, setFavouriteIds] = React.useState<number[]>([]);
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			getUserDirectories(user);
		}
	}, [user]);

	async function getUserDirectories(user: GithubUser) {
		const formattedName = user.name.replace(/\s/g, "");

		try {
			const response = await axios.get(`https://api.github.com/users/${formattedName}/repos`, { headers: { Accept: "application/json" } });
			setDirectories(response.data);
			return directories;
		} catch (e: any) {
			setError(e);
			console.log(e);
		}
	}

	if (!directories) {
		return (
			<div className="App">
				<Grid className="App-header" container justifyContent="center" alignItems="center" sx={{ height: "100vh", width: "100vw" }}>
					<Grid item xs={1}>
						<Typography>Loading commits...</Typography>
						<div className={"loader"} />
					</Grid>
				</Grid>
			</div>
		);
	}

	//Toggles and sorts the list of repos based on if they are starred or not.
	function toggleFavourite(id: number) {
		if (favouriteIds.includes(id)) {
			const newFavouriteIds = favouriteIds.filter((favouriteId) => id !== favouriteId);
			setFavouriteIds(newFavouriteIds);
		} else setFavouriteIds([...favouriteIds, id]);
	}

	const favouriteDirs = directories.filter((dir) => favouriteIds.includes(dir.id));
	const sortedDirs = [...favouriteDirs, ...directories.filter((dir) => !favouriteIds.includes(dir.id))];

	return (
		<div className="App">
			<Grid container className="App-header" justifyContent="center" alignItems="center">
				<Grid item xs={12}>
					<Typography variant={"h4"}>Click a public repo to browse their commits</Typography>
				</Grid>

				<Grow in={true}>
					<Grid item xs={8}>
						<Grid container spacing={2}>
							<Grid item xs={4}>
								{user !== null && <UserCard user={user} size="normal" />}
							</Grid>
							<Grid item xs={8}>
								{directories && directories.length > 0 && (
									<Grid container spacing={1}>
										{sortedDirs.map((dir) => (
											<Grid item key={dir.id} xs={6}>
												<Card>
													<CardContent>
														<Typography component="span" textAlign="left">
															<Grid container>
																<Grid item xs={12}>
																	<Grid container alignContent={"center"} justifyContent="space-between">
																		<Grid item sx={{ margin: "auto 0 auto" }}>
																			<Link sx={{ "&:hover": { cursor: "pointer" } }} onClick={() => navigate(`/directories/commits/${dir.name}`)}>
																				{dir.name}
																			</Link>
																		</Grid>
																		<Grid item>
																			<IconButton size={"medium"} onClick={() => toggleFavourite(dir.id)}>
																				{favouriteIds.includes(dir.id) ? <Star color={"warning"} /> : <StarOutline />}
																			</IconButton>
																			<IconButton size={"medium"} onClick={() => window.open(dir.html_url, "_blank", "noopener")}>
																				<GitHub />
																			</IconButton>
																		</Grid>
																	</Grid>
																</Grid>
																<Grid item>
																	<Typography component={"span"}>{dir.description ?? "No description found."}</Typography>
																</Grid>
															</Grid>
														</Typography>
													</CardContent>
												</Card>
											</Grid>
										))}
									</Grid>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Grow>
			</Grid>
		</div>
	);
}

export default UserDirectories;
