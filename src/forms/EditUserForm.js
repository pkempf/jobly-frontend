import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import JoblyForm from "./JoblyForm";
import UserContext from "../UserContext";

const EditUserForm = ({ editUserFunction }) => {
  const user = useContext(UserContext);

  if (!user.username) {
    return <Redirect to="/" />;
  }

  const formFields = [
    {
      name: "username",
      label: "Username",
      inputType: "text",
      initialValue: user.username,
      required: true,
      readOnly: true,
      styleOverride: {
        backgroundColor: "#eeeeee",
        borderRadius: "5px",
        paddingLeft: "10px",
      },
    },
    {
      name: "firstName",
      label: "First Name",
      inputType: "text",
      initialValue: user.firstName,
      required: true,
    },
    {
      name: "lastName",
      label: "Last Name",
      inputType: "text",
      initialValue: user.lastName,
      required: true,
    },
    {
      name: "email",
      label: "Email",
      inputType: "email",
      initialValue: user.email,
      required: true,
    },
    {
      name: "password",
      label: "Confirm password to make changes",
      inputType: "password",
      placeholder: "Password",
      initialValue: "",
      required: true,
    },
  ];

  return (
    <Container className="SignUpForm justify-content-center">
      <JoblyForm
        formTitle={`Edit ${user.username}'s Profile`}
        fields={formFields}
        submitButtonText="Save Changes"
        processData={editUserFunction}
      />
    </Container>
  );
};

export default EditUserForm;
