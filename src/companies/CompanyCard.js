import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

const CompanyCard = ({ company }) => {
  return (
    <Link to={`/companies/${company.handle}`} className="CompanyCard">
      <Card className="mb-2">
        <Card.Body>
          <Card.Title>{company.name}</Card.Title>
          <Card.Text>{company.description}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default CompanyCard;
