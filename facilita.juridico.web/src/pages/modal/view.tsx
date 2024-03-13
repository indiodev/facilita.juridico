import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useClientShow } from "@/query/client";
import { CreateClient, CreateClientSchema } from "@/schemas/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";

interface Props {
  id: number;
}
export function View({ id }: Props) {
  const form = useForm<CreateClient>({
    resolver: zodResolver(CreateClientSchema),
  });

  const { data: client, status } = useClientShow(id);

  return (
    <Form {...form}>
      {status === "success" && (
        <form className="space-y-6 w-full text-slate-200">
          <div className="w-full flex flex-col space-y-4">
            <Label className="text-slate-200 font-bold">Dados</Label>
            <div className="flex w-full flex-col space-y-4">
              <FormField
                control={form.control}
                name="name"
                defaultValue={client.name}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nome</FormLabel>
                    <FormControl className="w-full flex-1">
                      <Input
                        disabled
                        placeholder="Seu nome"
                        {...field}
                        className="w-full flex-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                defaultValue={client.email}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>E-mail</FormLabel>
                    <FormControl className="w-full flex-1">
                      <Input
                        disabled
                        type="email"
                        placeholder="example@mail.com"
                        {...field}
                        className="w-full flex-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                defaultValue={client.phone}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Telefone</FormLabel>
                    <FormControl className="w-full flex-1">
                      <Input
                        disabled
                        type="number"
                        placeholder="000000000"
                        {...field}
                        className="w-full flex-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full flex flex-col space-y-4">
            <Label className="text-slate-200 font-bold">Localização</Label>
            <div className="flex w-full space-x-6">
              <FormField
                control={form.control}
                name="location.x"
                defaultValue={client?.location?.x}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Coordenada X</FormLabel>
                    <FormControl className="w-full flex-1">
                      <Input
                        disabled
                        type="number"
                        min={1}
                        max={100}
                        placeholder="000"
                        {...field}
                        className="w-full flex-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location.y"
                defaultValue={client?.location?.y}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Coordenada Y</FormLabel>
                    <FormControl className="w-full flex-1">
                      <Input
                        disabled
                        type="number"
                        min={1}
                        max={100}
                        placeholder="000000000"
                        {...field}
                        className="w-full flex-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      )}
    </Form>
  );
}
