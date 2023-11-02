import { Card, Form } from 'antd';
import { JobData } from 'interfaces';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JobServices from 'services/jobs';
import moment from 'moment';
const JobDetail = () => {
  const jobServices = new JobServices();
  const param = useParams();
  const [jobData, setJobData] = useState<JobData>();
  useEffect(() => {
    if (param.id) {
      getJobDetail(param.id);
    }
  }, []);
  async function getJobDetail(id: string) {
    const responseData = await jobServices.getJobDetail(id);
    setJobData(responseData);
  }
  return (
    <div className="container 2xl:max-w-full flex flex-col gap-4">
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

        {/* <Row justify="start" className="w-full">
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <h1 className="font-semibold text-2xl">Title</h1>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            {jobData?.title}
          </Col>
        </Row>
        <Row justify="start" className="w-full">
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <h1 className="font-semibold text-2xl">Description</h1>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <p>{jobData?.description}</p>
          </Col>
        </Row>
        <Row justify="start" className="w-full">
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <h1 className="font-semibold text-2xl">Expiry Day</h1>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 24 }}>
            <p>
              {jobData?.expiryDate
                ? moment(jobData?.expiryDate).format("DD/MM/YYYY")
                : "--"}
            </p>
          </Col>
        </Row> */}
      </Card>
    </div>
  );
};
export default JobDetail;
