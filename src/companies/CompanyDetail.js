import React, { useContext, useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import UserContext from "../UserContext";
import JobCard from "../jobs/JobCard";
import JoblyApi from "../api";

// import CompanyCard from "./CompanyCard";

const CompanyDetail = () => {
  const { handle } = useParams();
  const user = useContext(UserContext);
  const [company, setCompany] = useState({});

  useEffect(() => {
    let isRendered = true;

    async function getCompany(companyHandle) {
      try {
        if (isRendered && user.username) {
          let companyRes = await JoblyApi.getCompany(companyHandle);
          let indicatedJobs = await JoblyApi.indicateAppliedJobs(
            companyRes.jobs,
            user.username
          );

          setCompany({ ...companyRes, jobs: indicatedJobs });
        }
      } catch (e) {
        console.log(e);
      }
    }
    getCompany(handle);

    return () => {
      isRendered = false;
    };
  }, [user.username, handle]);

  async function apply(job) {
    const applyRes = await JoblyApi.applyForJob(user.username, job.id);

    if (applyRes.applied && applyRes.applied === job.id) {
      let updatedJobs = [...company.jobs];
      let idx = company.jobs.findIndex((j) => j.id === job.id);

      let updatedJob = {
        ...job,
        applied: true,
      };

      updatedJobs[idx] = updatedJob;

      setCompany({ ...company, jobs: updatedJobs });
    }
  }

  if (!user.username) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="CompanyDetail">
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      {company.jobs && company.jobs.length > 0 ? (
        company.jobs.map((job) => (
          <JobCard job={job} key={job.id} apply={() => apply(job)} />
        ))
      ) : (
        <p>No matching jobs found.</p>
      )}
    </Container>
  );
};

export default CompanyDetail;
