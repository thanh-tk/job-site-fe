import { Card, Form } from "antd";
import { JobData } from "interfaces";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobServices from "services/jobs";
import moment from "moment";
import useMessage from "hooks/messageHook";

const JobDetail = () => {
  const jobServices = new JobServices();
  const param = useParams();
  const [jobData, setJobData] = useState<JobData>();
  const { showMessage, contextHolder } = useMessage();
  
  useEffect(() => {
    if (param.id) {
      getJobDetail(param.id);
    }
  }, []);
  const getJobDetail = (id: string) => {
    jobServices.getJobDetail(id).then(
      (responseData) => {
        setJobData(responseData);
      },
      () => showMessage("Job data fetch failure", "error")
    );
  }
  return (
    <div className="container 2xl:max-w-full flex flex-col gap-4">
      {contextHolder}
      <Card title="Job Detail">
        <Form layout="vertical">
          <Form.Item label="Title">
            <p>{jobData?.title}</p>
          </Form.Item>
          <Form.Item label="Description">
            <p>{jobData?.description}</p>
          </Form.Item>
          <Form.Item label="Expiry Day">
            <p>
              {jobData?.expiryDate
                ? moment(jobData?.expiryDate).format("DD/MM/YYYY")
                : "--"}
            </p>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default JobDetail;
