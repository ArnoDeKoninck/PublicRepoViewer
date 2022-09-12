import { Forward } from "@mui/icons-material";
import { Grid, Avatar, Link, Typography, Card, CardContent, IconButton, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GithubUser } from "../UserRequest/UserRequest";

interface UserCardProps {
	size: "small" | "normal";
	user: GithubUser | undefined;
}

//The small and large version of the user profile cards based on the size property.
function UserCard({ size, user }: UserCardProps) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/directories");
	};

	return (
		<Grid container>
			{size === "small" ? (
				<Card sx={{ backgroundColor: "WhiteSmoke" }}>
					<CardContent>
						{user && (
							<Grid container spacing={1} alignItems="center">
								<Grid item>
									<Avatar src={user.avatar_url}></Avatar>
								</Grid>
								<Grid item>
									<Link href={user.html_url} underline="none" target="_blank" rel="noopener">
										<Typography>{user.name}</Typography>
									</Link>
								</Grid>
								<Grid item>
									<Typography variant="body1">{user.public_repos + ` public repos`}</Typography>
								</Grid>
								<Grid item>
									<IconButton onClick={handleClick}>
										<Forward />
									</IconButton>
								</Grid>
							</Grid>
						)}
					</CardContent>
				</Card>
			) : (
				<Card>
					<CardContent>
						{user && (
							<Grid container spacing={1} justifyContent="center" alignItems="center">
								<Grid item xs={12}>
									<CardMedia image={user.avatar_url} component="img" sx={{ height: "5em", width: "5em", margin: "auto" }} />
								</Grid>
								<Grid item xs={12}>
									<Link href={user.html_url} underline="none" target="_blank" rel="noopener">
										{user.name}
									</Link>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="body1">{user.public_repos + ` public repos`}</Typography>
								</Grid>
							</Grid>
						)}
					</CardContent>
				</Card>
			)}
		</Grid>
	);
}

export default UserCard;
