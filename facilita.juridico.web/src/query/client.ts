import { Client } from "@/models/client";
import { Service } from "@/services";
import { useQuery } from "@tanstack/react-query";

async function FetcherList(params: { search?: string }): Promise<Client[]> {
  const { data } = await Service.Client.list(params);
  return data;
}

async function FetcherOne(id: number): Promise<Client> {
  const { data } = await Service.Client.show(id);
  return data;
}

export function useClientList(params: { search?: string }) {
  return useQuery({
    queryKey: ["CLIENT_LIST", params],
    queryFn: () => FetcherList(params),
  });
}

export function useClientShow(id: number) {
  return useQuery({
    queryKey: ["CLIENT_SHOW", id],
    queryFn: () => FetcherOne(id),
  });
}
