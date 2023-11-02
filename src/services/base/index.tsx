import { QueryDataResponse, QueryParam } from "interfaces";
import { queryForList } from "ultils/common";

export abstract class BaseService<T> {
  constructor(protected readonly apiUrl: string) {}

  async getList(
    endpoint: string,
    query: QueryParam
  ): Promise<QueryDataResponse<T[]>> {
    const url = queryForList(`${this.apiUrl}${endpoint}`, query);
    const response = await fetch(url);

    const responseData = await response.json();
    return responseData;
  }
  async create(endpoint: string, data: T): Promise<T> {
    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    return responseData;
  }

  async read(endpoint: string, id: string): Promise<T> {
    const response = await fetch(`${this.apiUrl}${endpoint}/${id}`);

    const responseData = await response.json();
    return responseData;
  }

  async update(endpoint: string, id: string, data: T): Promise<T> {
    const response = await fetch(`${this.apiUrl}${endpoint}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    return responseData;
  }

  async delete(endpoint: string, id: string): Promise<void> {
    const response = await fetch(`${this.apiUrl}${endpoint}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete ${endpoint}/${id}`);
    }
  }
}
