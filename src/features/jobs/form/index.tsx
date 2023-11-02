import { Button, Card, DatePicker, Form } from "antd";
import Input from "antd/es/input/Input";
import useMessage from "hooks/messageHook";
import { JobData } from "interfaces";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JobServices from "services/jobs";
import { formPatchValues } from "ultils/common";

const JobForm = () => {
  const jobServices = new JobServices();
  const param = useParams();
  const navigate = useNavigate();
  const { showMessage, contextHolder } = useMessage();
  const [jobData, setJobData] = useState<JobData>();
  const [form] = Form.useForm();

  useEffect(() => {
    if (param.id) {
      getJobDetail(param.id);
    }
  }, []);

  const getJobDetail = (id: string) => {
    jobServices.getJobDetail(id).then(
      (responseData) => {
        setJobData(responseData);
        const formData = formPatchValues(responseData);
        form.setFieldsValue(formData);
      },
      () => showMessage("Job data fetch failure", "error")
    );
  };

  const handleSubmit = (values: JobData) => {
    const data = values;
    handleJobData(data).then(
      () => {
        showMessage(`Job ${param.id ? "update" : "create"} success`, "success");
        setTimeout(() => {
          navigate("/jobs", {
            replace: true,
          });
        }, 1000);
      },
      () =>
        showMessage(`Job ${param.id ? "update" : "create"} failure`, "error")
    );
  };

  const handleJobData = (data: JobData) => {
    if (param.id) {
      return jobServices.updateJob(param.id, data);
    } else {
      return jobServices.createJob(data);
    }
  };
  return (
    <div className="container 2xl:max-w-full flex flex-col gap-4">
      {contextHolder}
      <Card title="Job Detail">
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>
          <Form.Item label="Expiry Day" name="expiryDate">
            <DatePicker format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item>
            <Button type="default" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default JobForm;
