import React from "react";
import { Icon } from "semantic-ui-react";
import "bootstrap/dist/css/bootstrap.css";
import "../index.css";
import { NavLink } from "react-router-dom";

function NavBar(props) {
  const { user, onSignOut = () => {} } = props;
  const handleSignOut = event => {
    event.preventDefault();
    onSignOut();
  };


  if (!user) {
    return <div />;
  } else if (user.is_admin) {
    return (
      <nav className="NavBar d-flex pt-2">
        <Icon name="code" color="red" className="logo mr-auto pt-2 pl-4" />
        <NavLink exact to="/quizzes">
          Quizzes
        </NavLink>
        <span>|</span>
        <NavLink exact to="/dashboard">
          Dashboard
        </NavLink>
        <span>|</span>
        <span key="1">Hello, {user.first_name}</span>,
        <a key="2" href="/sign_out" onClick={handleSignOut}>
          Sign Out
        </a>
      </nav>
    );
  } else {
    return (
      <nav className="NavBar d-flex pt-2">
        <div className="mr-auto pt-2">
          <Icon
            name="code"
            color="red"
            className="logo mr-auto pt-2 pl-4 pr-5"
          />
          <NavLink exact to="/quizzes" className="mr-auto">
            Home
          </NavLink>
          <span>|</span>
          <NavLink exact to="/leaderboard" className="mr-auto">
            Leaderboard
          </NavLink>
        </div>
        <div className="d-flex pt-2">
          <span key="1">Hello, {user.first_name}</span>
          <a key="2" href="/sign_out" onClick={handleSignOut}>
            Sign Out
          </a>
        </div>
      </nav>
    );
  }
}
export default NavBar;
