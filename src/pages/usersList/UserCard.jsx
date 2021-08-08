import React from "react";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const UserCard = ({ userData, handleUserCardActions }) => {
	return (
		<div className="user-card">
			<div className="user-details-section">
				<div className="user-image-container">
					<div className="user-image"></div>
				</div>
				<div className="user-details">
					<p className="user-name">
						{userData.first_name} {userData.last_name}
					</p>
					<p className="user-email">
						<EmailIcon fontSize="small" /> {userData.email}
					</p>
					<p className="user-contact">
						<PhoneIcon fontSize="small" /> {userData.contact}
					</p>
				</div>
			</div>
			<div className="card-actions-section">
				<div className="edit-contianer">
					<EditIcon onClick={() => handleUserCardActions(userData.id, true)} />
				</div>
				<div className="delete-contianer">
					<DeleteIcon onClick={() => handleUserCardActions(userData.id)} />
				</div>
			</div>
		</div>
	);
};

export default UserCard;
