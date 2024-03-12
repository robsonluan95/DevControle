'use client'    

import {useState} from 'react'
import Container from '@/components/container'
import Input from '@/components/input'
import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import {useForm}from  "react-hook-form";
import { FiSearch, FiX } from 'react-icons/fi'
import { FormTicket } from './components/FormTicket'
import { api } from '@/lib/api'
import ButtonRefresh from '../dashboard/components/buttonrefresh'


const schema = z.object({
    email:z.string().email("Digite um email para localizar").min(1,"O campo email é obrigatório")
})

type FormData= z.infer<typeof schema>

export interface CustomerDataInfo{
    id:string;
    name: string,
}

const OpenTicket = () => {
    const [customer , setCustomer]= useState<CustomerDataInfo|null>(null)  
    const {register,handleSubmit,setValue,setError,formState:{errors}}=useForm<FormData>({
        resolver:zodResolver(schema)
    })

    function handleClearCustomer(){
        setCustomer(null)
        setValue("email", "")
    }

    async function handleSearchCustomer(data:FormData) {
        const response = await api.get("/api/customer",{
            params:{
                email:data.email
            }
        })

        if (response.data===null){
           setError("email",{
            type:"custom",
            message:"Email não encontrado"
           })
           return
        }
        setCustomer({
            id:response.data.id,
            name:response.data.name
        })
    }
  return (
    
        <div className='w-full max-w-2xl mx-auto px-2'>
            <h1 className='font-bold text-3xl text-center mt-24 md:text-2xl'>Abrir chamado</h1>
            <main className='flex flex-col mt-4 mb-2'>
                {customer?(
                    <div className='bg-slate-200 py-4 px-4 rounded border-2 flex items-center justify-between'>
                        <p className='text-lg'><strong>Cliente selecionado: </strong>{customer.name}</p>
                        <button onClick={handleClearCustomer} className='hover:scale-125 duration-300'>
                            <FiX size={24} color="#dd2929"/>
                        </button>
                    </div>
                ):(
                    <form className='bg-slate-200 py-6 px-2 rounded border-2 ' 
                    onSubmit={handleSubmit(handleSearchCustomer)}>
                    <div className='flex flex-col gap-3'>
                        <Input 
                            name="email"
                            placeholder='Digite o email do cliente'
                            type='text'
                            error={errors.email?.message}
                            register={register}
                        />
                        <button type='submit' className='flex flex-row bg-blue-500 gap-3 px-2 h-11 items-center justify-center text-white rounded font-bold' >
                            Procurar Clientes
                            <FiSearch size={24} color="#FFF"/>
                        </button>
                    </div>
                </form>
                )}
                {customer !== null && <FormTicket  customer={customer}/>}
                
            </main>
        </div>
   
  )
}

export default OpenTicket