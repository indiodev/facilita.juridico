import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClientShow } from "@/query/client";
import { Fragment } from "react/jsx-runtime";

interface Props {
  // onClose: () => void;
  id: number;
}
export function View({ id }: Props) {
  const { data: client, status } = useClientShow(id);
  return (
    <form className="space-y-6 w-full text-slate-200">
      {status === "success" && (
        <Fragment>
          <div className="w-full space-y-2">
            <Label>Nome</Label>
            <div className="w-full flex-1">
              <Input
                placeholder="Seu nome"
                className="w-full flex-1"
                defaultValue={client?.name || ""}
                disabled
              />
            </div>
          </div>
          <div className="w-full space-y-2">
            <Label>E-mail</Label>
            <div className="w-full flex-1">
              <Input
                type="email"
                placeholder="example@mail.com"
                className="w-full flex-1"
                defaultValue={client?.email || ""}
                disabled
              />
            </div>
          </div>
          <div className="w-full space-y-2">
            <Label>Telefone</Label>
            <div className="w-full flex-1">
              <Input
                type="number"
                placeholder="000000000"
                className="w-full flex-1"
                defaultValue={client?.phone || ""}
                disabled
              />
            </div>
          </div>
        </Fragment>
      )}
    </form>
  );
}
