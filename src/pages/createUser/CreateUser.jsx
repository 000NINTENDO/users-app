import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { v4 as uuid } from "uuid";
import { useHistory, useParams } from "react-router";
import "./CreateUser.scss";
import { useEffect } from "react";
import Header from "../../components/Header";

const CreateUser = () => {
	const history = useHistory();
	const params = useParams();
	const { user_id } = params;
	const [userState, setUserState] = useState({
		first_name: "",
		last_name: "",
		email: "",
		contact: "",
		id: "",
	});

	useEffect(() => {
		if (user_id) {
			const usersDataFromDb = JSON.parse(localStorage.getItem("users_data"));
			const { users } = usersDataFromDb;
			if (users[user_id]) {
				const userData = users[user_id];
				setUserState({
					...userState,
					first_name: userData.first_name,
					last_name: userData.last_name,
					email: userData.email,
					contact: userData.contact,
					id: userData.id,
				});
			}
		}
	}, [params]);

	const handleUserInput = (event) => {
		const { name, value } = event.target;
		const updateUserState = {
			...userState,
			[name]: value,
		};
		setUserState({ ...updateUserState });
	};

	const submitUserData = (event) => {
		event.preventDefault();
		let userId;
		const userData = userState;
		if (userState.id === "") {
			const id = uuid();
			userId = id;
		} else {
			userId = userState.id;
		}
		userData.id = userId;
		const usersData = JSON.parse(localStorage.getItem("users_data"));
		const updatedUsersData = {
			...usersData,
			users: {
				...usersData.users,
				[userId]: userData,
			},
		};
		localStorage.setItem("users_data", JSON.stringify(updatedUsersData));
		const userDataFromStorage = JSON.parse(localStorage.getItem("users_data"));
		if (userDataFromStorage && Object.keys(userDataFromStorage.users).length) {
			history.push("/users-list");
		}
	};

	return (
		<div className="create-user-screen">
			<Header />
			<form className="create-user-form" onSubmit={submitUserData}>
				<h2 className="title">
					{user_id ? "Update User Details" : "Create new user"}
				</h2>
				<div className="input-container">
					<input
						id="first_name"
						className="input-field"
						type="text"
						name="first_name"
						value={userState.first_name}
						onChange={handleUserInput}
						placeholder="First Name"
					/>
				</div>
				<div className="input-container">
					<input
						id="last_name"
						className="input-field"
						name="last_name"
						value={userState.last_name}
						onChange={handleUserInput}
						placeholder="Last Name"
					/>
				</div>
				<div className="input-container">
					<input
						id="email"
						type="text"
						className="input-field"
						name="email"
						value={userState.email}
						onChange={handleUserInput}
						placeholder="Email"
					/>
				</div>
				<div className="input-container">
					<input
						id="contact"
						className="input-field"
						type="text"
						name="contact"
						value={userState.contact}
						onChange={handleUserInput}
						placeholder="Contact Number"
					/>
				</div>
				{/* <div className="">
					<input id="user_email" className="input-field" placeholder="Email" />
				</div> */}
				<Button
					variant="contained"
					color="primary"
					className="create-button"
					onClick={submitUserData}
				>
					{user_id ? "Update" : "Create"}
				</Button>
			</form>
		</div>
	);
};

export default CreateUser;
