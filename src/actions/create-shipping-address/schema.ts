import z from "zod";

export const createShippingAddressSchema = z.object({
  email: z.email("Email inválido").min(1, "O email é obrigatório"),
  fullName: z.string().min(1, "O nome completo é obrigatório"),
  taxID: z
    .string()
    .min(9, "O NIF deve ter exatamente 9 dígitos")
    .max(9, "O NIF deve ter exatamente 9 dígitos"),
  phone: z
    .string()
    .min(9, "O número de telemóvel deve ter pelo menos 9 dígitos"),
  zipCode: z.string().min(4, "O código postal é obrigatório"),
  street: z.string().min(1, "A rua é obrigatória"),
  number: z.string().min(1, "O número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "A localidade é obrigatória"),
  city: z.string().min(1, "A cidade é obrigatória"),
  state: z.string().min(1, "O distrito é obrigatório"),
});

export type CreateShippingAddressSchema = z.infer<
  typeof createShippingAddressSchema
>;
