import Container from '@/components/container'
import { getServerSession } from 'next-auth'//para buscar se tem alguém na sessão
import {authOptions} from "@/lib/auth"
import { redirect } from 'next/navigation'
import Link from 'next/link'
import TicketItem from './components/ticket'
import prismaClient from "@/lib/prisma"
import ButtonRefresh from './components/buttonrefresh'


const  dashboard = async () => {
  const session= await getServerSession(authOptions) //pega a session do usuário
  
  if(!session||!session.user){
    redirect("/")
  }
  const tickets = await prismaClient.ticket.findMany({
    where:{
      status:"ABERTO",
      customer:{
        userId:session.user.id
      }
    },include:{
      customer:true
    },
    orderBy:{
      created_at:"desc"
    }
  })// - findMany faz a busca de todos os registros


  
  return (
    <div>
        <Container>
            <main className='mb-9 mt-9'>
              <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold' >Chamados</h1>
                <div className=' flex items-center justify-center gap-3'>
                <ButtonRefresh/>
                <Link href={'/dashboard/new'} className='bg-blue-500 px-4 py-1 rounded text-white'>
                  Abrir chamado
                </Link>
                </div>
                
              </div>
              
              <table className='min-w-full my-2' >
                <thead>
                  <tr>
                    <th className='font-medium text-xs text-left pl-1 sm:text-lg'>CLIENTE</th>
                    <th className='font-medium text-xs text-left sm:text-lg'>DATA CADASTRO</th>
                    <th className='font-medium text-xs text-left sm:text-lg'>STATUS</th>
                    <th className='font-medium text-xs text-left sm:text-lg'>#</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map(ticket=>(
                    <TicketItem key={ticket.id} customer={ticket.customer} ticket={ticket}  />
                  ))}
                </tbody>
              </table>
              {tickets.length ===0 &&(
                <h1 className='px-2 text-gray-600' >Nenhum ticket encontrado...</h1>
              )}
            </main>
        </Container>
        
    </div>
  )
}

export default dashboard