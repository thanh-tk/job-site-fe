import { Button, Card, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import useMessage from "hooks/messageHook";
import {
  JobData,
  QueryDataResponse,
  QueryParam,
  TablePaging,
} from "interfaces";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import JobServices from "services/jobs";

const Job = () => {
  const [dataSource, setDataSource] = useState<QueryDataResponse<JobData[]>>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showMessage, contextHolder } = useMessage();
  const [tableData, setTableData] = useState<TablePaging>({
    currentPage: searchParams.get("page[number]") ?? 1,
    pageSize: searchParams.get("page[size]") ?? 10,
  });

  const jobService = new JobServices();

  useEffect(() => {
    getJobsList(tableData);
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

  const getJobsList = (tableData: TablePaging) => {
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

    jobService.fetchJobsList(query).then(
      (reps) => {
        if (reps) {
          setDataSource(reps);
          setQueryParam(query);
        }
      },
      () => showMessage("Error Geting Data", "error")
    );
  }

  const setQueryParam = (query: QueryParam) => {
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
    <>
      {contextHolder}
      <div className="container 2xl:max-w-full">
        <div className="flex justify-end my-4">
          <Button
            type="primary"
            className="bg-blue-950"
            onClick={() => {
              navigate("new");
            }}
          >
            Create Job
          </Button>
        </div>
        <Card title="Jobs List">
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
        </Card>
      </div>
    </>
  );
};
export default Job;
