import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { JobData, QueryParam } from "interfaces";
import JobServices from "services/jobs";

const Job = () => {
  const [jobs, setJobs] = useState<JobData[]>([]);

  const jobService = new JobServices();
  useEffect(() => {
    // Fetch jobs from the backend
    getJobsList();
  }, []);

  const columns: ColumnsType<JobData> = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => <Link to={record.id}>{text}</Link>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];
  async function getJobsList() {
    const query: QueryParam = {
      page: {
        number: 1,
        size: 5,
      },
      sort: {
        col: "createdAt",
        dir: "desc",
      },
    };
    const jobData = await jobService.fetchJobsList(query);
    if (jobData) {
      setJobs(jobData);
      setQueryParam(query);
    }
  }

  const setQueryParam = (query: QueryParam) => {
    const urlSearchParams = new URLSearchParams();

    Object.keys(query).forEach((key) => {
      const value = query[key];

      if (typeof value === "object") {
        Object.keys(value).forEach((subKey) => {
          const subValue = value[subKey];

          urlSearchParams.set(`${key}[${subKey}]`, subValue);
        });
      } else {
        urlSearchParams.set(key, value);
      }
    });
    const currentUrl = window.location.href;

    const newUrl = `${currentUrl}?${urlSearchParams.toString()}`;

    // Push the new URL to the browser history.
    window.history.pushState({}, "", newUrl);
  };
  return (
    <div className="container">
      <h1 className="font-medium text-2xl">Jobs</h1>
      {/* <ul className="jobs-list">
        {jobs.map((job) => (
          <li key={job.id} className="job-item">
            <Link to={`/jobs/${job.id}`}>{job.title}</Link>
            <Link to={`/jobs/${job.id}/edit`} className="edit-button">
              Edit
            </Link>
            <button className="delete-button">Delete</button>
          </li>
        ))}
      </ul> */}
      <Table
        columns={columns}
        pagination={{ position: ["bottomRight"] }}
        dataSource={jobs}
        rowKey={(record) => record.id}
      />
    </div>
  );
};
export default Job;
