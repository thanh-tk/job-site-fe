import { JobData, QueryDataResponse, QueryParam } from "interfaces";
import { BaseService } from "services/base";

export default class JobServices extends BaseService<JobData> {
  constructor() {
    super(`${process.env.REACT_APP_API_URL}/job`);
  }
  async fetchJobsList(
    query: QueryParam
  ): Promise<QueryDataResponse<JobData[]>> {
    return this.getList(`/jobs`, query)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }
  async getJobDetail(id: string): Promise<JobData> {
    return this.read(``, id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }
  async updateJob(id:string, data: JobData): Promise<JobData> {
    return this.update(``, id, data)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }
  async createJob(data: JobData): Promise<JobData> {
    return this.create(`/new`, data)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }
}
