import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./styles/Header.scss";

const Header = (props) => {
	const history = useHistory();
	const location = useLocation();
	const [activeRoute, setActiveRoute] = useState("/");
	const pathname = location.pathname.split("/");

	useEffect(() => {
		if (pathname.includes("users-list")) {
			setActiveRoute("users-list");
		}
	}, [props]);

	return (
		<div className="app-header">
			<div
				className="app-logo"
				onClick={() => {
					history.push("/");
				}}
			>
				Users
			</div>
			<ul className="nav-bar">
				<li
					className={`nav-link ${activeRoute === "/" ? "nav-link-active" : ""}`}
					onClick={() => {
						history.push("/");
					}}
				>
					Create
				</li>
				<li
					className={`nav-link ${
						activeRoute === "users-list" ? "nav-link-active" : ""
					}`}
					onClick={() => {
						history.push("/users-list");
					}}
				>
					Users List
				</li>
				<li className="nav-link">User Posts</li>
			</ul>
			<div className="user-image">{/* < */}</div>
		</div>
	);
};

export default Header;
