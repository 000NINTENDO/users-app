import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateUser from "./pages/createUser/CreateUser";
import Header from "./components/Header";
import { sapleData } from "./sample-data";
import UsersList from "./pages/usersList/UsersList";

const data = sapleData;

localStorage.setItem("users_data", JSON.stringify(data));

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/edit-user/:user_id" component={CreateUser} />
					<Route exact path="/users-list" component={UsersList} />
					<Route exact path="/" component={CreateUser} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
