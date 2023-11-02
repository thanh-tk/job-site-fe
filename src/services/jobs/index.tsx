import { JobData, QueryDataResponse, QueryParam } from "interfaces";
import { BaseService } from "services/base";


export default class JobServices extends BaseService<JobData> {
  constructor() {
    super(`${process.env.REACT_APP_API_URL}/job`);
  }
  async fetchJobsList(query: QueryParam): Promise<QueryDataResponse<JobData[]>> {
    return await this.getList(`/jobs`, query);
  }
}
