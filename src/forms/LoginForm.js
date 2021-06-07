import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import JoblyForm from "./JoblyForm";
import UserContext from "../UserContext";

const LoginForm = ({ logInFunction }) => {
  const user = useContext(UserContext);

  if (user.username) {
    return <Redirect to="/" />;
  }

  const formFields = [
    {
      name: "username",
      label: "Username",
      inputType: "text",
      initialValue: "",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      inputType: "password",
      initialValue: "",
      required: true,
    },
  ];
  const testLoginForm = (formData) => {
    console.log(formData);
  };

  return (
    <Container className="LoginForm justify-content-center">
      <JoblyForm
        formTitle="Log in"
        fields={formFields}
        submitButtonText="Log in"
        processData={testLoginForm}
      />

      {
        // remove this
      }
      <Button variant="warning" className="mt-4" onClick={logInFunction}>
        TEMP_LOGIN
      </Button>
    </Container>
  );
};

export default LoginForm;
