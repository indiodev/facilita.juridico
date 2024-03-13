import { z } from "zod";

export const CreateClientSchema = z.object({
  name: z.string({
    required_error: "Nome é obrigatório",
  }),
  email: z
    .string({
      required_error: "E-mail é obrigatório",
    })
    .email({ message: "Informe e-mail válido." }),
  phone: z
    .string({ required_error: "Telefone é obrigatório" }),
  location: z.object({
    x: z.coerce.number().min(1, { message: "X é obrigatório" }).max(100, { message: "X é obrigatório" }),
    y: z.coerce.number().min(1, { message: "Y é obrigatório" }).max(100, { message: "Y é obrigatório" }),
  }),
});

export type CreateClient = z.infer<typeof CreateClientSchema>;
