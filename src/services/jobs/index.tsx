import { Job, QueryParam } from "src/interfaces";
import { BaseService } from "src/services/base";


export default class JobServices extends BaseService<Job> {
  constructor() {
    super(`${process.env.REACT_APP_API_URL}/job`);
  }
  async fetchJobsList(query: QueryParam): Promise<Job[]> {
    return await this.getList(`/jobs`, query);
}
}
