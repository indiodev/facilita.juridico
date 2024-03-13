import { LocationPoint } from "@/models/location";
import { Service } from "@/services";
import { useQuery } from "@tanstack/react-query";


async function FetcherOne(): Promise<LocationPoint[]> {
  const { data } = await Service.Distance.show();
  return data;
}



export function useDistanceShow() {
  return useQuery({
    queryKey: ["DISTANCE_SHOW"],
    queryFn: () => FetcherOne(),
  });
}
