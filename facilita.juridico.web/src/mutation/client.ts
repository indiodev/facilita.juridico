import { Client } from "@/models/client";
import { CreateClient } from "@/schemas/client";
import { Service } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

async function mutate(data: CreateClient): Promise<Client> {
  const { data: client } = await Service.Client.create(data);
  return client;
}

interface Props{
  onSuccess?: () => void
  onError?: (error: Error | AxiosError) => void
}


export function useClientCreateMutation({onError, onSuccess}: Props) {
  return useMutation({
    mutationFn: (data: CreateClient) => mutate(data),
    onSuccess,
    onError
  });
}
