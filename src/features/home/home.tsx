import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Job, QueryParam } from 'src/interfaces';
import JobServices from "src/services/jobs";

export const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const jobService = new JobServices();
  useEffect(() => {
    // Fetch jobs from the backend
    getJobsList();
  }, []);

  async function getJobsList() {
    const query: QueryParam = {
      page: {
        number: 1,
        size: 5,
      },
      sort: {
        col: "createdAt",
        dir: 'desc'
      },
    };
    const jobData = await jobService.fetchJobsList(query);
    if (jobData) {
      setJobs(jobData);
    }
  }

  return (
    <div className="container">
      <h1>Jobs</h1>
      <ul className="jobs-list">
        {jobs.map((job) => (
          <li key={job.id} className="job-item">
            <Link to={`/jobs/${job.id}`}>{job.title}</Link>
            <Link to={`/jobs/${job.id}/edit`} className="edit-button">
              Edit
            </Link>
            <button className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
