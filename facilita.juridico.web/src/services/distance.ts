import { API } from "@/lib/api";
import { LocationPoint } from "@/models/location";
import { AxiosResponse } from "axios";
export class Distance {
  private path = "/distance";

  async show(): Promise<AxiosResponse<LocationPoint[]>> {
    return await API.get(this.path);
  }

}
