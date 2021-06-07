import React, { useContext } from "react";
import Alert from "react-bootstrap/Alert";
import AlertContext from "./AlertContext";

const JoblyAlert = () => {
  const { message, setMessage } = useContext(AlertContext);

  const clearMessage = () => {
    setMessage({ text: "", variant: "" });
  };

  if (message.text) {
    return (
      <Alert
        variant={message.variant ? message.variant : "primary"}
        onClose={() => clearMessage()}
        className="mt-3"
        dismissible
      >
        {message.text}
      </Alert>
    );
  } else {
    return null;
  }
};

export default JoblyAlert;
