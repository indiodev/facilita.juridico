import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Tanstack } from "@/lib/tanstack";
import { useClientCreateMutation } from "@/mutation/client";
import { CreateClient, CreateClientSchema } from "@/schemas/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";

interface Props {
  onClose: () => void;
}
export function Create({ onClose }: Props) {
  const { toast } = useToast();
  const form = useForm<CreateClient>({
    resolver: zodResolver(CreateClientSchema),
  });

  const { mutateAsync: createClient } = useClientCreateMutation({
    onError(error) {
      console.log(error);
      toast({
        title: "Error ao criar",
        description:
          "Ocorreu um erro ao tentar criar o cliente, tente novamente.",
        variant: "destructive",
      });
    },
    onSuccess() {
      Tanstack.refetchQueries({
        queryKey: ["CLIENT_LIST"],
      });
      onClose();
      toast({
        title: "Sucesso ao criar",
        description: "Cliente adicionado com sucesso!",
      });
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    createClient(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6 w-full text-slate-200">
        <div className="w-full flex flex-col space-y-4">
          <Label className="text-slate-200 font-bold">Dados</Label>
          <div className="flex w-full flex-col space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome</FormLabel>
                  <FormControl className="w-full flex-1">
                    <Input
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
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl className="w-full flex-1">
                    <Input
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
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Telefone</FormLabel>
                  <FormControl className="w-full flex-1">
                    <Input
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
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Coordenada X</FormLabel>
                  <FormControl className="w-full flex-1">
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      maxLength={3}
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
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Coordenada Y</FormLabel>
                  <FormControl className="w-full flex-1">
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      maxLength={3}
                      placeholder="000"
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
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
