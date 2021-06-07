import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import JoblyForm from "./JoblyForm";
import UserContext from "../UserContext";

const SignUpForm = ({ signUpFunction }) => {
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
    {
      name: "firstName",
      label: "First Name",
      inputType: "text",
      initialValue: "",
      required: true,
    },
    {
      name: "lastName",
      label: "Last Name",
      inputType: "text",
      initialValue: "",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      inputType: "email",
      initialValue: "",
      required: true,
    },
  ];

  return (
    <Container className="SignUpForm justify-content-center">
      <JoblyForm
        formTitle="Register for Jobly"
        fields={formFields}
        submitButtonText="Sign up"
        processData={signUpFunction}
      />
    </Container>
  );
};

export default SignUpForm;
