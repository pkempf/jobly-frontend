import JoblyApi from "./api";

const getHelperFunctions = (user, setUser, setMessage) => {
  const logIn = ({ username, password }) => {
    console.log("PLACEHOLDER FUNCTION - IMPLEMENT LOGIN");
    console.log({ username, password });
  };

  const logOut = () => {
    if (user.username) {
      setUser({});
      JoblyApi.setToken("");
      setMessage({ text: "Logged out!", variant: "danger" });
    }
  };

  const signUp = (signUpData) => {
    console.log("PLACEHOLDER FUNCTION - IMPLEMENT SIGNUP");
    console.log(signUpData);
  };

  const editUser = (editUserData) => {
    console.log("PLACEHOLDER FUNCTION - IMPLEMENT EDIT USER");
    console.log(editUserData);
  };

  return [logIn, logOut, signUp, editUser];
};

export default getHelperFunctions;
