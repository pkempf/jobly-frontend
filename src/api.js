import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static setToken(newToken) {
    this.token = newToken;
  }

  static _setDevTestingToken() {
    this.setToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
        "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
        "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc"
    );
  }

  // Individual API routes

  // COMPANIES -------------------------------------

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get a list of companies, optionally filtering by nameLike. */

  static async getCompanies(nameLike = "") {
    let res = await this.request(
      `companies/`,
      nameLike !== "" ? { nameLike: nameLike } : {}
    );
    return res.companies;
  }

  // USERS -----------------------------------------

  /** Get details on a user by username. */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get a list of jobs, optionally filtering by title */

  static async getJobs(title = "") {
    let res = await this.request(`jobs/`, title !== "" ? { title } : {});
    return res.jobs;
  }

  /** Get a token with username and password */

  static async doLogin(username, password) {
    try {
      let res = await this.request(
        "auth/token",
        { username, password },
        "post"
      );

      this.setToken(res.token);
      return res.token;
    } catch (e) {
      console.log(e);
    }
  }

  /** Update a user's information. */

  static async updateUser(username, firstName, lastName, email, password) {
    try {
      try {
        await this.doLogin(username, password);
      } catch (e) {
        throw e;
      }
      let updatedUser = await this.request(
        `users/${username}`,
        { firstName, lastName, password, email },
        "patch"
      );

      return updatedUser;
    } catch (e) {
      console.log(e);
    }
  }

  static async createUser(username, password, firstName, lastName, email) {
    try {
      let res = await this.request(
        "auth/register",
        { username, password, firstName, lastName, email },
        "post"
      );
      this.setToken(res.token);
      let createdUser = await this.getUser(username);
      return { user: createdUser, token: res.token };
    } catch (e) {
      console.log(e);
    }
  }

  // JOBS ------------------------------------------

  /** Given list of jobs and username, add boolean "applied" to
   *  each job to indicate whether user username has applied */

  static async indicateAppliedJobs(listOfJobs, username) {
    let user = await this.getUser(username);
    return listOfJobs.map((j) => {
      return { ...j, applied: user.jobs.includes(j.id) };
    });
  }

  /** Given username and job id, have that user apply for that job */

  static async applyForJob(username, jobId) {
    try {
      let res = await this.request(
        `users/${username}/jobs/${jobId}`,
        {},
        "post"
      );
      return res;
    } catch (e) {
      console.log("Couldn't apply for job.");
    }
  }
}

export default JoblyApi;
