import { JobData, QueryParam } from "src/interfaces";
import { BaseService } from "src/services/base";


export default class JobServices extends BaseService<JobData> {
  constructor() {
    super(`${process.env.REACT_APP_API_URL}/job`);
  }
  async fetchJobsList(query: QueryParam): Promise<JobData[]> {
    return await this.getList(`/jobs`, query);
  }
}
