import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export async function DELETE(request:Request){

    const session = await getServerSession(authOptions)

    if (!session||!session.user){
        return NextResponse.json({error:"Usuário não autorizado! faça login para continuar."},{status:401})
    }

    const {searchParams} = new URL (request.url)
    const userId = searchParams.get("id")

    if (!userId){
        return NextResponse.json({error:"Erro ao apagar cliente!"},{status:400})
    }

    const findTickets = await prismaClient.ticket.findFirst({
        where:{
            customerId:userId
        }
    })

    if(findTickets){
        return NextResponse.json({error:` O usuário ${findTickets.name} possui um ou mais tickets cadastrados`},{status:400} )
    
    }

    try {
        await prismaClient.customer.delete({
            where:{
                id:userId as string
            }
        })
        return NextResponse.json({message:"Deletado com sucesso!"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Erro ao apagar cliente!"},{status:400})
    }

}



export async function POST(request:Request){
    const session = await getServerSession(authOptions)

    if (!session||!session.user){
        return NextResponse.json({error:"Usuário não autorizado! faça login para continuar."},{status:401})
    }
    const {name,email,phone,address,userId}=await request.json();

    try {
        await prismaClient.customer.create({
            data:{
                name, 
                email,
                phone,
                address:address?address:"",
                userId
            }
        })
        return NextResponse.json({message:"Cliente Cadastrado com sucesso!"})
        
    } catch (error) {
        return NextResponse.json({error:"Falha ao criar novo usuário! "},{status:400})
    }    
}