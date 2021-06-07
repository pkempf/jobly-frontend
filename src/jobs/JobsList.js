import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import UserContext from "../UserContext";
import JobCard from "./JobCard";
import SearchBar from "../SearchBar";
import JoblyApi from "../api";

const JobsList = () => {
  const user = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let isRendered = true;

    async function getJobs(filterString = "") {
      try {
        if (isRendered && user.username) {
          let jobResults = await JoblyApi.getJobs(filterString);
          let indicatedJobResults = await JoblyApi.indicateAppliedJobs(
            jobResults,
            user.username
          );
          setJobs(indicatedJobResults);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getJobs(filter);

    return () => {
      isRendered = false;
    };
  }, [filter, user.username]);

  if (!user.username) {
    return <Redirect to="/" />;
  }

  async function apply(job) {
    let applyRes = await JoblyApi.applyForJob(user.username, job.id);

    if (applyRes.applied && applyRes.applied === job.id) {
      let updatedJobs = [...jobs];
      let idx = jobs.findIndex((j) => j.id === job.id);

      let updatedJob = {
        ...job,
        applied: true,
      };

      updatedJobs[idx] = updatedJob;

      setJobs(updatedJobs);
    }
  }

  return (
    <Container className="JobList">
      <SearchBar onSubmit={setFilter} />
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <JobCard job={job} key={job.id} apply={() => apply(job)} />
        ))
      ) : (
        <p>No matching jobs found.</p>
      )}
    </Container>
  );
};

export default JobsList;
