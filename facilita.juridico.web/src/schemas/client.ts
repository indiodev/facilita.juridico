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
    x: z.coerce.number().min(0).max(100),
    y: z.coerce.number().min(0).max(100),
  }),
});

export type CreateClient = z.infer<typeof CreateClientSchema>;
