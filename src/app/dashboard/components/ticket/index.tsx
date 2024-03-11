"use client"
import React from 'react'
import { FiFile, FiCheckSquare } from 'react-icons/fi'
import { TicketProps } from '@/utils/ticket.type'
import { CustomerProps } from '@/utils/customer.type';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { ModalContext } from '@/providers/modal';

interface TicketItemProps{
  ticket:TicketProps;
  customer:CustomerProps|null;
}
const TicketItem = ({customer,ticket}:TicketItemProps) => {
  const router = useRouter()
  const {handleModalVisible,setDetailTicket} = useContext(ModalContext)
  async function handleChangeStatus(){
    try {
      const res = await api.patch("/api/ticket",{
        id:ticket.id,
      })
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }
  function handleOpenModal(){
    handleModalVisible();
    setDetailTicket({
      ticket:ticket,
      customer:customer
    })
  }
  return (
    
    <>
        <tr className='border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300'>
            <td className='text-left pl-1'>{customer?.name}</td>
            <td className='text-left'>{ticket.created_at?.toLocaleDateString("pt-br")}</td>
            <td className='text-left'><span className='bg-green-500 px-2 py-1 rounded-lg'>ABERTO</span></td>
            <td className='text-left'>
                <button className='mr-2' onClick={handleChangeStatus}>
                   <FiCheckSquare size={24} color="#ed6b07"/>
                </button>
                <button onClick={handleOpenModal}>
                   <FiFile size={24} color="#3b82f6"/>
                </button>
            </td>
        </tr>
    </>
  )
}

export default TicketItem