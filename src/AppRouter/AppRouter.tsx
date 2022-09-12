import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import DirectoryCommits from "../DirectoryCommits/DirectoryCommits";
import UserContext from "../UserContext";
import UserDirectories from "../UserDirectories/UserDirectories";
import { GithubUser } from "../UserRequest/UserRequest";

//Sets up the routes which are accesible and supplies urlParams
function AppRouter() {
	const [user, setUser] = React.useState<GithubUser | null>(null);
	return (
		<BrowserRouter>
			<UserContext.Provider value={{ user, setUser }}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/directories/" element={<UserDirectories />} />
					<Route path="directories/commits/:repoName" element={<DirectoryCommits />} />
				</Routes>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default AppRouter;
