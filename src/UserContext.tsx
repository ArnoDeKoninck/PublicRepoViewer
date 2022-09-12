import { createContext, Dispatch, SetStateAction } from "react";
import { GithubUser } from "./UserRequest/UserRequest";

interface UserContextInterface {
	user: GithubUser | null;
	setUser: Dispatch<SetStateAction<GithubUser | null>>;
}

const UserContext = createContext<UserContextInterface>({ user: null, setUser: () => {} });

export default UserContext;
