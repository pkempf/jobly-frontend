import React, { useContext } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

const Homepage = () => {
  const user = useContext(UserContext);
  return (
    <Jumbotron className="mt-3 text-center">
      <h1>
        <b>Jobly</b>
      </h1>
      <h4 className="mb-4">Let's get to work.</h4>
      {user.username ? (
        <h3>Welcome back, {user.username}!</h3>
      ) : (
        <span>
          <Link className="btn btn-primary mr-1" to="/login">
            Log in
          </Link>
          <Link className="btn btn-primary ml-1" to="/signup">
            Sign up
          </Link>
        </span>
      )}
    </Jumbotron>
  );
};

export default Homepage;
