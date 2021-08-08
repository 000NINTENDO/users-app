import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import UserCard from "./UserCard";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./UsersList.scss";
import Header from "../../components/Header";

const UsersList = () => {
	const history = useHistory();
	const [usersList, setUsersList] = useState([]);
	const [usersDataFromDb, setUsersDataFromDb] = useState([]);
	const [refetchData, setRefectchData] = useState(false);

	useEffect(() => {
		const usersResponse = JSON.parse(localStorage.getItem("users_data"));
		const { users } = usersResponse;
		const users_list = Object.values(users);
		setUsersList(users_list);
		setUsersDataFromDb(usersResponse);
	}, [refetchData]);

	const handleUserCardActions = (userId, edit) => {
		if (edit) {
			history.push(`/edit-user/${userId}`);
			return;
		}
		const tempUserData = usersDataFromDb;
		const { users } = tempUserData;
		if (users[userId]) {
			delete users[userId];
		}
		tempUserData.users = users;
		localStorage.setItem("users_data", JSON.stringify(tempUserData));
		setRefectchData(!refetchData);
	};

	return (
		<>
			<Header />
			<div className="users-list-screen">
				<form className="search-user-form">
					<Autocomplete
						id="free-solo-demo"
						freeSolo
						options={usersList.map((user) => {
							return `${user.first_name} ${user.last_name}`;
						})}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Search user"
								margin="normal"
								variant="outlined"
								onChange={(event) => {
									"";
								}}
							/>
						)}
					/>
				</form>
				{usersList.map((user) => {
					return (
						<UserCard
							userData={user}
							handleUserCardActions={handleUserCardActions}
							key={user.id}
						/>
					);
				})}
			</div>
		</>
	);
};

export default UsersList;
