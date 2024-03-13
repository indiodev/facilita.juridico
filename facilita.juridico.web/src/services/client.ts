import { API } from "@/lib/api";
import { Client as Model } from "@/models/client";
import { CreateClient } from "@/schemas/client";
import { AxiosResponse } from "axios";
export class Client {
  private path = "/client";
  async create(data: CreateClient): Promise<AxiosResponse<Model>> {
    return await API.post(this.path, data);
  }

  async show(id: number): Promise<AxiosResponse<Model>> {
    return await API.get(`${this.path}/${id}`);
  }

  async list(params: { search?: string }): Promise<AxiosResponse<Model[]>> {
    return await API.get<Model[]>(this.path, { params });
  }
}
