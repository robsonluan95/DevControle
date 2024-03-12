import Container from '@/components/container'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import CardCustomer from './components/card'
import prismaClient from "@/lib/prisma"
import ButtonRefresh from '../components/buttonrefresh'

const Customer = async () => {
    const session = await getServerSession(authOptions)
    if(!session || !session.user){
        redirect("/")
    }

    const customer = await prismaClient.customer.findMany({//findMany -> filtra todos
        where:{ //where -> onde
            userId:session.user.id //buscar todos que o id é igual da session
        }
    })

    console.log(customer)

  return (
    <Container>
        <main className=' mt-9 mb-2'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold'>Meus Clientes</h1>
                <div className='flex items-center justify-center gap-3' >
                    <ButtonRefresh/>
                    <Link href={"/dashboard/customer/new"} className='bg-blue-500 text-white rounded px-4 py-1'>
                        Novo cliente
                    </Link>
                </div>
                
            </div>
            <section className='mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                    {customer.map((customer)=>(
                        <CardCustomer key={customer.id}  customer={customer}/>
                    ))}
            </section>
            {customer.length===0 &&(
                <p>Você não tem clientes cadastrados.</p>
            )}
        </main>
    </Container>
  )
}

export default Customer