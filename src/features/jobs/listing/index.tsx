import { Table, Pagination, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  JobData,
  TablePaging,
  QueryParam,
  QueryDataResponse,
} from "interfaces";
import JobServices from "services/jobs";

const Job = () => {
  const [dataSource, setDataSource] = useState<QueryDataResponse<JobData[]>>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [tableData, setTableData] = useState<TablePaging>({
    currentPage: searchParams.get("page[number]") ?? 1,
    pageSize: searchParams.get("page[size]") ?? 10,
  });

  const jobService = new JobServices();

  useEffect(() => {
    getJobsList(tableData);
    setQueryParam();
  }, [tableData]);

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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`${record.id}/edit`}>Edit</Link>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  async function getJobsList(tableData: TablePaging) {
    const query: QueryParam = {
      page: {
        number: tableData.currentPage,
        size: tableData.pageSize,
      },
      sort: {
        col: "createdAt",
        dir: "desc",
      },
    };
    const jobData = await jobService.fetchJobsList(query);

    if (jobData) {
      setDataSource(jobData);
    }
  }

  const setQueryParam = () => {
    const query: QueryParam = {
      page: {
        number: tableData.currentPage,
        size: tableData.pageSize,
      },
      sort: {
        col: "createdAt",
        dir: "desc",
      },
    };
    const urlSearchParams = new URLSearchParams();

    Object.keys(query).forEach((key) => {
      const value = query[key];

      if (typeof value === "object") {
        Object.keys(value).forEach((subKey) => {
          const subValue = value[subKey];

          if (!urlSearchParams.has(`${key}[${subKey}]`)) {
            urlSearchParams.set(`${key}[${subKey}]`, subValue);
          }
        });
      } else {
        if (!urlSearchParams.has(key)) {
          urlSearchParams.set(key, value);
        }
      }
    });

    const currentUrl = window.location.href.split("?")[0];
    const newUrl = `${currentUrl}?${urlSearchParams.toString()}`;
    setSearchParams(urlSearchParams);
  
    // Push the new URL to the browser history.
    window.history.pushState({}, "", newUrl);
  };

  return (
    <div className="container">
      <h1 className="font-medium text-2xl">Jobs</h1>
      <Table
        columns={columns}
        dataSource={dataSource?.dataList}
        rowKey={(record) => record.id}
        pagination={{
          showSizeChanger: true,
          total: dataSource?.totalPage,
          onChange: (page) => {
            setTableData((prevState) => {
              return {
                ...prevState,
                currentPage: page,
              };
            });
          },
          onShowSizeChange: (_, size) => {
            setTableData((prevState) => {
              return {
                ...prevState,
                pageSize: size,
              };
            });
          },
        }}
      />
    </div>
  );
};
export default Job;
