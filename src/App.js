import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import UserContext from "./UserContext";
import AlertContext from "./AlertContext";
import NavBar from "./NavBar";
import JoblyAlert from "./JoblyAlert";
import Routes from "./Routes";
import getHelperFunctions, { useLocalStorage } from "./appHelpers";
import JoblyApi from "./api";

function App() {
  const [user, setUser] = useLocalStorage("jobly-user", {});
  const [token, setToken] = useLocalStorage("jobly-token", "");

  useEffect(() => {
    JoblyApi.setToken(token);
  }, [token]);

  const [message, setMessage] = useState({
    text: "",
    variant: "",
  });

  const [logIn, logOut, signUp, editUser] = getHelperFunctions(
    user,
    setUser,
    setMessage,
    setToken
  );

  return (
    <UserContext.Provider value={user}>
      <NavBar />
      <AlertContext.Provider value={{ message, setMessage }}>
        <Container className="mt-3" fluid="lg">
          <JoblyAlert />
          <Routes
            logIn={logIn}
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
