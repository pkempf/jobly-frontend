import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import UserContext from "./UserContext";
import AlertContext from "./AlertContext";
import NavBar from "./NavBar";
import JoblyAlert from "./JoblyAlert";
import Routes from "./Routes";
import JoblyApi from "./api";
import getHelperFunctions from "./appHelpers";

function App() {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState({
    text: "",
    variant: "",
  });

  const [logIn, logOut, signUp, editUser] = getHelperFunctions(
    user,
    setUser,
    setMessage
  );

  const devTempLogin = () => {
    setUser({
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      email: "testuser@email.com",
      isAdmin: false,
      jobs: [],
    });

    JoblyApi._setDevTestingToken();
    setMessage({ text: "Logged in as testuser", variant: "success" });
  };

  // TODO: implement real login method
  return (
    <UserContext.Provider value={user}>
      <NavBar />
      <AlertContext.Provider value={{ message, setMessage }}>
        <Container className="mt-3" fluid="lg">
          <JoblyAlert />
          <Routes
            logIn={devTempLogin}
            logOut={logOut}
            signUp={signUp}
            editUser={editUser}
          />
        </Container>
      </AlertContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
