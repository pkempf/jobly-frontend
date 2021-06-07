import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import UserContext from "./UserContext";
import JoblyApi from "./api";

// import SearchBar from "./SearchBar";
// import JobCard from "./JobCard";

const JobsList = () => {
  const user = useContext(UserContext);
  const [jobs, setJobs] = useState([]);

  return (
    <Container className="JobsList">
      <p>This is where jobs will be listed.</p>
    </Container>
  );
};

export default JobsList;
