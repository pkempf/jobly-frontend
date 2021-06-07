import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import UserContext from "./UserContext";
import JoblyApi from "./api";

// import CompanyCard from "./CompanyCard";

const CompanyDetail = () => {
  const { handle } = useParams();
  const user = useContext(UserContext);

  return (
    <Container className="CompanyDetail">
      <p>The company detail will go here.</p>
    </Container>
  );
};

export default CompanyDetail;
