'use client';

import { useState } from 'react';
import { formFacade, CustomerDataInfo, FormData } from './FormFacade'; // Certifique-se de que o caminho está correto
import Input from '@/components/input';
import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { FormTicket } from './components/FormTicket';

const OpenTicket: React.FC = () => {
    const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);
    const { register, handleSubmit, setValue, setError, formState: { errors } } = formFacade.useFormMethods();
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const handleClearCustomer = () => {
        setCustomer(null);
        setValue("email", "");
    };

    const handleSearchCustomer = async (data: FormData) => {
        setIsSearching(true);
        try {
            const result = await formFacade.searchCustomer(data.email);
            if (result === null) {
                setError("email", {
                    type: "custom",
                    message: "Email não encontrado"
                });
            } else {
                setCustomer(result);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError("email", {
                    type: "custom",
                    message: error.message
                });
            } else {
                setError("email", {
                    type: "custom",
                    message: "Ocorreu um erro inesperado"
                });
            }
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className='w-full max-w-2xl mx-auto px-2'>
            <h1 className='font-bold text-3xl text-center mt-24 md:text-2xl'>Abrir chamado</h1>
            <main className='flex flex-col mt-4 mb-2'>
                {customer ? (
                    <div className='bg-slate-200 py-4 px-4 rounded border-2 flex items-center justify-between'>
                        <p className='text-lg'><strong>Cliente selecionado: </strong>{customer.name}</p>
                        <button onClick={handleClearCustomer} className='hover:scale-125 duration-300'>
                            <FiX size={24} color="#dd2929" />
                        </button>
                    </div>
                ) : (
                    <form className='bg-slate-200 py-6 px-2 rounded border-2' onSubmit={handleSubmit(handleSearchCustomer)}>
                        <div className='flex flex-col gap-3'>
                            <Input
                                name="email"
                                placeholder='Digite o email do cliente'
                                type='text'
                                error={errors.email?.message}
                                register={register}
                            />
                            <button type='submit' className='flex flex-row bg-blue-500 gap-3 px-2 h-11 items-center justify-center text-white rounded font-bold' disabled={isSearching}>
                                {isSearching ? "Buscando..." : "Procurar Clientes"}
                                <FiSearch size={24} color="#FFF" />
                            </button>
                        </div>
                    </form>
                )}
                {customer && <FormTicket customer={customer} />}
            </main>
        </div>
    );
};

export default OpenTicket;
