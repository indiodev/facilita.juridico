/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useClientList } from "@/query/client";
import { Dialog } from "@radix-ui/react-dialog";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { Create } from "./form/create";
import { View } from "./form/view";

export function Home() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const modalButtonRef = useRef<HTMLButtonElement>(null);
  const [search, setSearch] = useState<string | undefined>(undefined);

  const { data: client_list, status: client_list_status } = useClientList({
    search,
  });

  return (
    <div className="h-screen w-screen bg-foreground flex items-center justify-center">
      <section className="container w-full max-w-5xl flex-1 space-y-12">
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Pesquisar por nome, e-mail ou telefone"
            className="text-slate-200 focus:border-secondary"
            ref={searchInputRef}
            onChange={(e) => {
              if (e.target.value === "" && searchInputRef.current) {
                setSearch(undefined);
                searchInputRef.current.value = "";
                return;
              }
            }}
          />
          <Button
            type="button"
            className="bg-slate-200 text-slate-950 hover:bg-primary-foreground"
            onClick={() => setSearch(searchInputRef.current?.value)}
          >
            Buscar
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" ref={modalButtonRef}>
                Novo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-foreground">
              <Create onClose={() => modalButtonRef.current?.click()} />
            </DialogContent>
          </Dialog>
        </div>

        {client_list_status === "success" && !(client_list.length > 0) && (
          <div className="text-slate-200 w-full py-12 flex items-center justify-center">
            <p className="text-lg">Nenhum registro encontrado.</p>
          </div>
        )}

        {client_list_status === "success" && client_list.length > 0 && (
          <div className="overflow-y-auto max-h-96">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead className="w-[100px]">Telefone</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {client_list.map((client) => {
                  return (
                    <TableRow
                      key={client.id}
                      className="text-slate-200 hover:bg-transparent"
                    >
                      <TableCell className="font-medium">
                        {client.name}
                      </TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild className="cursor-pointer">
                            <EyeOpenIcon className="text-slate-200 h-5 w-5" />
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px] bg-foreground">
                            <View id={client.id} />
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </section>
    </div>
  );
}
