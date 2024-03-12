import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prismaClient from "@/lib/prisma"
import { authOptions } from "@/lib/auth";


//verbo patch é usado para atualizar um recurso parcialmente, ou seja, somente os campos que forem passados no corpo
export async function PATCH(request:Request){
    const session = await getServerSession(authOptions)

    if (!session||!session.user){
        return NextResponse.json({error:"Não autorizado!"},{status:401})
    }

    const {id}= await request.json();

    const findTicket = await prismaClient.ticket.findFirst({
        where:{
            id:id as string 
        }
    })
    if (!findTicket){
        return NextResponse.json({error:"Falha ao tentar update ticket"},{status:400})
    }

    try {
        await prismaClient.ticket.update({
            where:{
                id:id as string

            },data:{
                status:"FECHADO"
            }
        })
        return NextResponse.json({message:"Chamado atualizado com sucesso!"})
    } catch (error) {
        console.log(error)
    }
   
}


export async function POST(request:Request){
    const {customerId,name,description} = await request.json();
    if (!customerId|| !name ||!description){
        return NextResponse.json({error:"Falha ao criar o ticket!"},{status:400})
    }
    try {
        await prismaClient.ticket.create({
            data:{
                name:name,
                description:description,
                status:"ABERTO",
                customerId:customerId
            }
        })
        return NextResponse.json({message:"Chamado registrado com sucesso!"})
    } catch (error) {
        return NextResponse.json({error:"Falha ao criar o ticket!"},{status:400})
    }
    

    return NextResponse.json({message:"Cadastrado com sucesso!"})
}