import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobsList from "./JobsList";
import LoginForm from "./forms/LoginForm";
import SignUpForm from "./forms/SignUpForm";
import EditUserForm from "./forms/EditUserForm";
import Logout from "./Logout";

const Routes = ({ logIn, logOut, signUp, editUser }) => {
  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route exact path="/companies">
        <CompanyList />
      </Route>
      <Route exact path="/companies/:handle">
        <CompanyDetail />
      </Route>
      <Route exact path="/jobs">
        <JobsList />
      </Route>
      <Route exact path="/login">
        <LoginForm logInFunction={logIn} />
      </Route>
      <Route exact path="/signup">
        <SignUpForm signUpFunction={signUp} />
      </Route>
      <Route exact path="/profile">
        <EditUserForm editUserFunction={editUser} />
      </Route>
      <Route exact path="/logout">
        <Logout logOutFunction={logOut} />
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default Routes;
