import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { api } from '@/lib/api';
console.log("teste")
// Definição do esquema usando zod
const schema = z.object({
    email: z.string().email("Digite um email para localizar").min(1, "O campo email é obrigatório")
});

// Tipo FormData derivado do esquema
export type FormData = z.infer<typeof schema>;

// Interface para os dados do cliente
export interface CustomerDataInfo {
    id: string;
    name: string;
}

export class FormFacade {
    private static instance: FormFacade;
    private schema = schema;

    private constructor() {
        // Impede a criação direta de instâncias
    }

    public static getInstance(): FormFacade {
        if (!FormFacade.instance) {
            FormFacade.instance = new FormFacade();
        }
        return FormFacade.instance;
    }

    public useFormMethods(): UseFormReturn<FormData> {
        return useForm<FormData>({
            resolver: zodResolver(this.schema)
        });
    }

    public async searchCustomer(email: string): Promise<CustomerDataInfo | null> {
        try {
            const response = await api.get("/api/customer", {
                params: { email }
            });

            if (response.data === null) {
                return null;
            }

            return {
                id: response.data.id,
                name: response.data.name
            };
        } catch (error: unknown) {
            throw new Error("Failed to fetch customer data");
        }
    }
    
}

// Exporta a instância única
export const formFacade = FormFacade.getInstance();
