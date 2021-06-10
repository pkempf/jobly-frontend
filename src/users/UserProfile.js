import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserContext from "../UserContext";
import JoblyApi from "../api";

const UserProfile = () => {
  const user = useContext(UserContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    let isRendered = true;

    async function populateJobDetail() {
      try {
        if (isRendered && user.username) {
          let populatedJobs = [];
          for (let i = 0; i < user.jobs.length; i++) {
            let jobDetail = await JoblyApi.getJob(user.jobs[i]);
            populatedJobs.push(jobDetail);
          }
          populatedJobs.sort((job1, job2) => {
            return job1.company.handle < job2.company.handle
              ? -1
              : job1.company.handle > job2.company.handle
              ? 1
              : job1.id < job2.id
              ? -1
              : job2.id > job1.id
              ? 1
              : 0;
          });
          console.log(populatedJobs);
          setJobs(populatedJobs);
        }
      } catch (e) {
        console.log(e);
      }
    }

    populateJobDetail();

    return () => {
      isRendered = false;
    };
  }, [user.username, user.jobs]);

  if (!user.username) return <Redirect to="/" />;

  return (
    <Container className="UserProfile">
      <Row>
        <Col sm={8}>
          <h2>{user.username}</h2>
          <h5>
            {user.firstName} {user.lastName}
          </h5>
          <p>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </p>
        </Col>
        <Col sm={4}>
          <Container className="d-flex justify-content-end">
            <LinkContainer to="/edit-profile">
              <Button variant="primary" className="ml-auto">
                Edit Profile
              </Button>
            </LinkContainer>
          </Container>
        </Col>
      </Row>

      <h5>Active job applications:</h5>
      <ul>
        {jobs.map((j) => {
          return (
            <li key={j.id}>
              {j.company.name}: {j.title}
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default UserProfile;
