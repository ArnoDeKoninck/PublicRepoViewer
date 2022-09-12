import { Avatar, Card, CardContent, Grid, Grow, TextField, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../UserContext";

interface CommitInterface {
	sha: string;
	html_url: string;
	author: {
		avatar_url: string;
		login: string;
	};
	commit: {
		message: string;
		author: {
			date: string;
		};
	};
}

//Fetches and lists up the 20 last commits of the chosen directory.
//The Textfield value filters the commits based on their title.
function DirectoryCommits() {
	const { repoName } = useParams();
	const [error, setError] = React.useState<Error | AxiosError>();
	const [commits, setCommits] = React.useState<CommitInterface[]>([]);
	const [value, setValue] = React.useState<string>("");
	const { user } = useContext(UserContext);

	useEffect(() => {
		getMoreCommits();
	}, []);

	async function getMoreCommits() {
		try {
			const formattedName = user!.name.replace(/\s/g, "");
			const formattedRepoName = repoName!.trim();

			const response = await axios.get(`https://api.github.com/repos/${formattedName}/${formattedRepoName}/commits?page=${1}&per_page=20`, {
				headers: {
					Accept: "application/json",
				},
			});

			if (response.data) {
				setCommits(response.data);
			}
		} catch (e: any) {
			setError(e);
			console.log(e);
		}
	}

	if (!commits) {
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

	return (
		<div className="App">
			<Grid container className="App-header" spacing={2} padding={2}>
				<Grid item xs={12}>
					<Typography variant={"h4"}>{`Browsing commits for ${repoName}`}</Typography>
				</Grid>
				<Grow in={true}>
					<Grid container justifyContent={"center"} padding={5} spacing={2}>
						<Grid item>
							<TextField variant="filled" sx={{ backgroundColor: "#FFF" }} placeholder="Search..." onChange={(e) => setValue(e.target.value)} />
						</Grid>
						<Grid item xs={6}>
							{commits.length > 0 && (
								<Grid container spacing={2}>
									{commits
										.filter((item) => item.commit.message.toLowerCase().includes(value.toLowerCase()))
										.map((data, index) => (
											<Grid item xs={12} key={index}>
												<Card>
													<CardContent>
														<Grid container justifyContent={"space-between"} alignContent="flex-end" spacing={2}>
															<Grid item xs={12}>
																<Typography variant={"h5"} textAlign="left">
																	{data.commit.message}
																</Typography>
															</Grid>
															<Grid item>
																<Grid container spacing={1} alignItems="center">
																	<Grid item>
																		<Typography>Author: </Typography>
																	</Grid>
																	<Grid item>
																		<Avatar src={data.author && data.author.avatar_url} />
																	</Grid>
																	<Grid item>
																		<Typography>{data.author && data.author.login}</Typography>
																	</Grid>
																</Grid>
															</Grid>
															<Grid item>
																<Grid item>
																	<Typography variant={"body2"}>{`committed on: ` + new Date(data.commit.author.date).toLocaleDateString()}</Typography>
																</Grid>
															</Grid>
														</Grid>
													</CardContent>
												</Card>
											</Grid>
										))}
								</Grid>
							)}
						</Grid>
					</Grid>
				</Grow>
			</Grid>
		</div>
	);
}

export default DirectoryCommits;
