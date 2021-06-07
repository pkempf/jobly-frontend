import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import UserContext from "./UserContext";
import CompanyCard from "./CompanyCard";
import SearchBar from "./SearchBar";
import JoblyApi from "./api";

const CompanyList = () => {
  const user = useContext(UserContext);
  const [companies, setCompanies] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let isRendered = true;

    async function getCompanies(filterString = "") {
      try {
        if (isRendered) {
          let companies = await JoblyApi.getCompanies(filterString);
          setCompanies(companies);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getCompanies(filter);

    return () => {
      isRendered = false;
    };
  }, [filter]);

  if (!user.username) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="CompanyList">
      <SearchBar onSubmit={setFilter} />
      {companies.length > 0 ? (
        companies.map((company) => (
          <CompanyCard company={company} key={company.handle} />
        ))
      ) : (
        <p>No matching companies found.</p>
      )}
    </Container>
  );
};

export default CompanyList;
