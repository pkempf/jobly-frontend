import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const JobCard = ({ job, apply }) => {
  return (
    <Card className="CompanyCard mb-2">
      <Card.Body>
        <Card.Title>{job.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {job.companyName}
        </Card.Subtitle>
        <Row>
          <Col sm={9}>
            <span className="font-weight-light">Salary: {job.salary || 0}</span>
            <br />
            <span className="font-weight-light">Equity: {job.equity || 0}</span>
          </Col>
          <Col sm={3}>
            <div className="d-flex justify-content-end m-0 p-0">
              {job.applied ? (
                <Button variant="danger" disabled>
                  APPLIED
                </Button>
              ) : (
                <Button onClick={apply} variant="danger">
                  APPLY
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default JobCard;
