import { Forward } from "@mui/icons-material";
import { Grid, Avatar, Link, Typography, Card, CardContent, IconButton } from "@mui/material";
import { useContext } from "react";
import { GithubUser } from "../UserRequest/UserRequest";
import { StepContext, StepContextType, steps } from "./../App";

interface UserCardProps {
	size: "small" | "normal";
	user: GithubUser;
}

function UserCard({ size, user }: UserCardProps) {
	const { step, setStep }: StepContextType = useContext(StepContext)!;
	return (
		<>
			<Card sx={{ backgroundColor: "WhiteSmoke" }}>
				<CardContent>
					<Grid container spacing={1} alignItems="center">
						<Grid item>
							<Avatar src={user.avatar_url}></Avatar>
						</Grid>
						<Grid item>
							<Link href={user.url} underline="none">
								{user.name}
							</Link>
						</Grid>
						<Grid item>
							<Typography variant="body1">{user.public_repos + ` public repos`}</Typography>
						</Grid>
						<Grid item>
							<IconButton onClick={() => setStep(steps.EXPANDED)}>
								<Forward />
							</IconButton>
						</Grid>
						{step}
					</Grid>
				</CardContent>
			</Card>
		</>
	);
}

export default UserCard;
